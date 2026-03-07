import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>Last updated: March 06, 2026</p>
            
            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Introduction</h2>
              <p>Welcome to Bonded Brothers Cricket Club ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Information We Collect</h2>
              <p>We may collect several types of information from and about users of our website, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and address when you fill out membership or contact forms.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and location.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your membership applications.</li>
                <li>Respond to your inquiries and provide support.</li>
                <li>Send you updates about club activities, matches, and events.</li>
                <li>Improve our website and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Data Security</h2>
              <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Your Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@bondedbrotherscc.com" className="text-secondary hover:underline">info@bondedbrotherscc.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
