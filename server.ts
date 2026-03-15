import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import { Resend } from "resend";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

console.log("Starting server...");

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Static serving for uploads
app.use("/uploads", express.static(uploadsDir));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
  fileFilter: (req, file, cb) => {
    console.log("Filtering file:", file.originalname, "Mimetype:", file.mimetype);
    const allowedTypes = /jpeg|jpg|png|gif|mp4|webm|quicktime/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      console.log("File accepted");
      return cb(null, true);
    }
    console.error("File rejected:", file.originalname, "Ext:", path.extname(file.originalname), "Mime:", file.mimetype);
    cb(new Error("Only images and videos (mp4, webm) are allowed!"));
  },
});

// Initial gallery items - Scan uploads directory on startup
let galleryItems: any[] = [];
const playersFilePath = path.join(__dirname, "players.json");

const syncGalleryWithDisk = () => {
  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      const itemsWithStats = files
        .filter(filename => !filename.startsWith('.'))
        .map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        const isVideo = /\.(mp4|webm|mov|quicktime)$/i.test(filename);
        return {
          type: isVideo ? 'video' : 'image',
          url: `/uploads/${filename}`,
          size: 'small',
          title: `Uploaded ${isVideo ? 'Video' : 'Image'}`,
          mtime: stats.mtime
        };
      });

      // Sort by modification time, newest first
      galleryItems = itemsWithStats
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
        .map(({ mtime, ...item }) => item);

      console.log(`Synced gallery with disk: ${galleryItems.length} items found.`);
    }
  } catch (err) {
    console.error("Error syncing gallery with disk:", err);
  }
};

syncGalleryWithDisk();

// API Routes
app.get("/api/gallery", (req, res) => {
  res.json(galleryItems);
});

app.get("/api/players", (req, res) => {
  try {
    if (fs.existsSync(playersFilePath)) {
      const playersData = fs.readFileSync(playersFilePath, "utf-8");
      res.json(JSON.parse(playersData));
    } else {
      res.status(404).json({ error: "Players data not found" });
    }
  } catch (err) {
    console.error("Error reading players.json:", err);
    res.status(500).json({ error: "Failed to read players data" });
  }
});

app.post("/api/players/update", (req, res) => {
  try {
    const updatedPlayers = req.body;
    if (!Array.isArray(updatedPlayers)) {
      return res.status(400).json({ error: "Invalid data format. Expected an array." });
    }
    fs.writeFileSync(playersFilePath, JSON.stringify(updatedPlayers, null, 2));
    res.json({ message: "Players updated successfully", players: updatedPlayers });
  } catch (err) {
    console.error("Error updating players.json:", err);
    res.status(500).json({ error: "Failed to update players data" });
  }
});

function generateMembershipPDF(formData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      // Content
      doc.fontSize(20).text("Membership Application Form", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text("Section 1: Personal Details", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Full Name: ${formData.fullName}`);
      doc.text(`Date of Birth: ${formData.dob}`);
      doc.text(`Home Address: ${formData.address}`);
      doc.text(`Postcode: ${formData.postcode}`);
      doc.text(`Email Address: ${formData.email}`);
      doc.text(`Mobile No.: ${formData.mobile}`);
      doc.text(`Occupation: ${formData.occupation}`);
      doc.moveDown();

      doc.fontSize(14).text("Section 2: Cricket Experience", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Played Before: ${formData.playedBefore}`);
      doc.text(`Club: ${formData.club}`);
      doc.text(`County: ${formData.county}`);
      doc.text(`Other Experience: ${formData.otherExperience}`);
      doc.text(`Primary Role: ${formData.cricketRole}`);
      doc.text(`Qualifications: ${formData.qualifications}`);
      doc.moveDown();

      doc.fontSize(14).text("Section 3: Emergency Contact", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Contact Name: ${formData.emergencyContactName}`);
      doc.text(`Relationship: ${formData.emergencyRelationship}`);
      doc.text(`Phone Number: ${formData.emergencyPhone}`);
      doc.text(`Alt Phone: ${formData.emergencyAltPhone}`);
      doc.moveDown();

      doc.fontSize(14).text("Section 4: Medical Info", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Medical Info: ${formData.medicalInfo}`);
      doc.moveDown();

      doc.fontSize(14).text("Section 5, 6 & 7: Consents", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Photography Consent: ${formData.photoConsent}`);
      doc.text(`Social Media Consent: ${formData.socialConsent}`);
      doc.moveDown();

      doc.fontSize(14).text("Section 8: Declaration", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(`Electronic Signature: ${formData.signature}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

function generateContactPDF(formData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      // Content
      doc.fontSize(20).text("Contact Message", { align: "center" });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`From: ${formData.fullName}`);
      doc.text(`Email: ${formData.email}`);
      doc.text(`Subject: ${formData.subject}`);
      doc.moveDown();
      
      doc.fontSize(14).text("Message:", { underline: true });
      doc.fontSize(12).moveDown(0.5);
      doc.text(formData.message);
      doc.moveDown();

      doc.text(`Date: ${new Date().toLocaleString()}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

app.post("/api/membership/submit", async (req, res) => {
  const formData = req.body;
  console.log("New Membership Application Received:", formData);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER || "bbccswindon@gmail.com",
    to: "bbccswindon@gmail.com",
    subject: `New Membership Application: ${formData.fullName}`,
    text: `
      New Membership Application Received
      
      Section 1: Personal Details
      ---------------------------
      Full Name: ${formData.fullName}
      Date of Birth: ${formData.dob}
      Home Address: ${formData.address}
      Postcode: ${formData.postcode}
      Email Address: ${formData.email}
      Mobile No.: ${formData.mobile}
      Occupation: ${formData.occupation}
      
      Section 2: Cricket Experience
      -----------------------------
      Played Before: ${formData.playedBefore}
      Club: ${formData.club}
      County: ${formData.county}
      Other Experience: ${formData.otherExperience}
      Primary Role: ${formData.cricketRole}
      Qualifications: ${formData.qualifications}
      
      Section 3: Emergency Contact
      ----------------------------
      Contact Name: ${formData.emergencyContactName}
      Relationship: ${formData.emergencyRelationship}
      Phone Number: ${formData.emergencyPhone}
      Alt Phone: ${formData.emergencyAltPhone}
      
      Section 4: Medical Info
      -----------------------
      Medical Info: ${formData.medicalInfo}
      
      Section 5, 6 & 7: Consents
      --------------------------
      Photography Consent: ${formData.photoConsent}
      Social Media Consent: ${formData.socialConsent}
      
      Section 8: Declaration
      ----------------------
      Electronic Signature: ${formData.signature}
      Date: ${new Date().toLocaleDateString()}
    `,
    attachments: [],
  };

  try {
    const pdfBuffer = await generateMembershipPDF(formData);
    console.log(`Successfully generated Membership PDF for ${formData.fullName}. Buffer size: ${pdfBuffer.length} bytes.`);
    mailOptions.attachments.push({
      filename: `${formData.fullName ? formData.fullName.replace(/\s+/g, '_') : 'Applicant'}_Membership_Application.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    });
  } catch (pdfError) {
    console.error("Error generating PDF attachmment:", pdfError);
  }

  try {
    if (resend) {
      // Use Resend
      const { data, error } = await resend.emails.send({
        from: 'BBCC Website <onboarding@resend.dev>', // You can change this once you verify your domain
        to: ['bbccswindon@gmail.com'],
        subject: `New Membership Application: ${formData.fullName}`,
        text: mailOptions.text,
        attachments: mailOptions.attachments.map(att => ({
          filename: att.filename,
          content: att.content
        }))
      });

      if (error) {
        console.error("Resend error (membership):", error);
        throw error;
      }
      console.log("Email sent successfully via Resend");
    } else if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Fallback to Nodemailer
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully via SMTP");
    } else {
      console.warn("No email service configured (Resend or SMTP).");
    }
    res.status(200).json({ message: "Application received successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(200).json({ message: "Application received, but email notification failed." });
  }
});

app.post("/api/contact/submit", async (req, res) => {
  const formData = req.body;
  console.log("New Contact Message Received:", formData);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER || "bbccswindon@gmail.com",
    to: "bbccswindon@gmail.com",
    subject: `New Contact Message: ${formData.subject}`,
    text: `
      New Contact Message Received
      
      From: ${formData.fullName} (${formData.email})
      Subject: ${formData.subject}
      
      Message:
      ${formData.message}
      
      Date: ${new Date().toLocaleString()}
    `,
    attachments: [],
  };

  try {
    const pdfBuffer = await generateContactPDF(formData);
    console.log(`Successfully generated Contact PDF from ${formData.fullName}. Buffer size: ${pdfBuffer.length} bytes.`);
    mailOptions.attachments.push({
      filename: `Contact_${formData.fullName ? formData.fullName.replace(/\s+/g, '_') : 'Message'}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    });
  } catch (pdfError) {
    console.error("Error generating contact PDF attachment:", pdfError);
  }

  try {
    if (resend) {
      // Use Resend
      const { data, error } = await resend.emails.send({
        from: 'BBCC Website <onboarding@resend.dev>',
        to: ['bbccswindon@gmail.com'],
        subject: `New Contact Message: ${formData.subject}`,
        text: mailOptions.text,
        attachments: mailOptions.attachments.map(att => ({
          filename: att.filename,
          content: att.content
        }))
      });

      if (error) {
        console.error("Resend error (contact):", error);
        throw error;
      }
      console.log("Contact email sent successfully via Resend");
    } else if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Fallback to Nodemailer
      await transporter.sendMail(mailOptions);
      console.log("Contact email sent successfully via SMTP");
    } else {
      console.warn("No email service configured (Resend or SMTP).");
    }
    res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(200).json({ message: "Message received, but email notification failed." });
  }
});

app.post("/api/upload", (req, res) => {
  console.log("Upload request received");
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Multer error during upload:", err);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(500).json({ error: err.message || "Unknown upload error" });
    }

    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded successfully:", req.file.filename, "Size:", req.file.size);
    const fileUrl = `/uploads/${req.file.filename}`;
    const isVideo = req.file.mimetype.startsWith('video/');
    
    const newItem = {
      type: isVideo ? 'video' : 'image',
      url: fileUrl,
      size: 'small',
      title: req.body.title || `User Uploaded ${isVideo ? 'Video' : 'Image'}`
    };

    galleryItems.unshift(newItem); // Add to the beginning of the array
    res.status(201).json(newItem);
  });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Increase timeout for large uploads
  server.timeout = 300000; // 5 minutes
}

startServer();
