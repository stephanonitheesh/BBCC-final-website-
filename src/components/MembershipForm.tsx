import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Trophy, 
  HeartPulse, 
  ShieldCheck, 
  Camera,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function MembershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    address: '',
    postcode: '',
    email: '',
    mobile: '',
    occupation: '',
    playedBefore: '',
    club: '',
    county: '',
    otherExperience: '',
    cricketRole: '',
    qualifications: '',
    emergencyContactName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyAltPhone: '',
    medicalInfo: '',
    photoConsent: '',
    socialConsent: '',
    signature: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/membership/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert('There was an error submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            BECOME A MEMBER
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white leading-tight"
          >
            PLAYER <span className="text-secondary italic">MEMBERSHIP</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
          >
            Join Bonded Brothers Cricket Club. Please complete the form below with your details to apply for membership.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Section 1: Personal Details */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <User className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Section 1: Personal Details</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Date of Birth</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                          required 
                          type="date" 
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors [color-scheme:dark]" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Home Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                      <textarea 
                        required 
                        rows={3} 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors resize-none" 
                        placeholder="Enter your full home address" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Postcode</label>
                      <input 
                        required 
                        type="text" 
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="e.g. SN1 1AA" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                          placeholder="email@example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Mobile No.</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input 
                          required 
                          type="tel" 
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                          placeholder="07123 456789" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Occupation</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="text" 
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Your current occupation" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Cricket Experience */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <Trophy className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Section 2: Cricket Experience</h3>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300 ml-1">Have you played cricket before?</label>
                    <div className="flex gap-8">
                      {['Yes', 'No'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="playedBefore" 
                            value={option} 
                            checked={formData.playedBefore === option}
                            onChange={handleChange}
                            className="w-5 h-5 border-2 border-white/20 bg-transparent checked:bg-secondary checked:border-secondary transition-all cursor-pointer" 
                          />
                          <span className="text-white group-hover:text-secondary transition-colors">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300 ml-1">If yes, please provide details of where you have played:</label>
                    <div className="grid gap-4">
                      <input 
                        type="text" 
                        name="club"
                        value={formData.club}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Club (please specify)" 
                      />
                      <input 
                        type="text" 
                        name="county"
                        value={formData.county}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="County (please specify)" 
                      />
                      <input 
                        type="text" 
                        name="otherExperience"
                        value={formData.otherExperience}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Other (please specify)" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300 ml-1">Please indicate your primary cricket role:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Batsman', 'Bowler', 'Wicketkeeper', 'All-rounder'].map((role) => (
                        <label key={role} className="flex items-center gap-3 cursor-pointer group bg-white/5 p-4 rounded-xl border border-white/10 hover:border-secondary/50 transition-all">
                          <input 
                            type="radio" 
                            name="cricketRole" 
                            value={role} 
                            checked={formData.cricketRole === role}
                            onChange={handleChange}
                            className="w-4 h-4 accent-secondary" 
                          />
                          <span className="text-sm text-white group-hover:text-secondary transition-colors">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Cricket Qualifications (e.g. coaching, umpiring)</label>
                    <textarea 
                      rows={2} 
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors resize-none" 
                      placeholder="List any relevant qualifications..." 
                    />
                  </div>
                </div>

                {/* Section 3 & 4: Emergency & Medical */}
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <AlertCircle className="w-6 h-6 text-secondary" />
                      <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Section 3: Emergency Contact</h3>
                    </div>
                    <div className="space-y-4">
                      <input 
                        required 
                        type="text" 
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Contact Name" 
                      />
                      <input 
                        required 
                        type="text" 
                        name="emergencyRelationship"
                        value={formData.emergencyRelationship}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Relationship to you" 
                      />
                      <input 
                        required 
                        type="tel" 
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Phone Number" 
                      />
                      <input 
                        type="tel" 
                        name="emergencyAltPhone"
                        value={formData.emergencyAltPhone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors" 
                        placeholder="Alternative Phone Number" 
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <HeartPulse className="w-6 h-6 text-secondary" />
                      <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Section 4: Medical Info</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 mb-4">Please detail any important medical information coaches should be aware of (e.g. allergies, asthma, diabetes).</p>
                      <textarea 
                        rows={6} 
                        name="medicalInfo"
                        value={formData.medicalInfo}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors resize-none" 
                        placeholder="Enter medical details here..." 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5, 6 & 7: Consents */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <ShieldCheck className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Consents & Policies</h3>
                  </div>

                  <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="flex items-start gap-4">
                      <input required type="checkbox" className="mt-1 w-5 h-5 accent-secondary" id="privacy" />
                      <label htmlFor="privacy" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                        I confirm that I have read and understood the <span className="text-secondary font-bold">Privacy Notice</span> and agree to the Club using my personal data as described.
                      </label>
                    </div>
                    <div className="flex items-start gap-4">
                      <input required type="checkbox" className="mt-1 w-5 h-5 accent-secondary" id="conduct" />
                      <label htmlFor="conduct" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                        I confirm that I will participate in the spirit of fair play, respect club officials, teammates, and opponents, and pay any fees promptly as per the <span className="text-secondary font-bold">Club Policies & Code of Conduct</span>.
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-secondary" />
                        <label className="text-sm font-medium text-white">Photography & Video Consent</label>
                      </div>
                      <p className="text-xs text-gray-400">I consent to the Club photographing/videoing my involvement in cricket.</p>
                      <div className="flex gap-6">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="photoConsent" 
                              value={opt} 
                              checked={formData.photoConsent === opt}
                              onChange={handleChange}
                              className="accent-secondary" 
                            />
                            <span className="text-sm text-gray-300">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-secondary" />
                        <label className="text-sm font-medium text-white">Social Media Consent</label>
                      </div>
                      <p className="text-xs text-gray-400">I consent to photos/videos being used on club social media channels.</p>
                      <div className="flex gap-6">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="socialConsent" 
                              value={opt} 
                              checked={formData.socialConsent === opt}
                              onChange={handleChange}
                              className="accent-secondary" 
                            />
                            <span className="text-sm text-gray-300">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 8: Declaration */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <FileText className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Section 8: Declaration</h3>
                  </div>
                  <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
                    <p className="text-sm text-gray-300 italic mb-6">
                      "By submitting this form, I confirm that the information I have provided is accurate and I agree to the terms outlined in this membership form."
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">Electronic Signature (Type Full Name)</label>
                        <input 
                          required 
                          type="text" 
                          name="signature"
                          value={formData.signature}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-secondary transition-colors font-serif italic" 
                          placeholder="Your full name as signature" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">Date</label>
                        <input type="text" readOnly value={new Date().toLocaleDateString()} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-gray-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-secondary text-primary py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-secondary/20"
                  >
                    {isLoading ? (
                      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        SUBMIT MEMBERSHIP APPLICATION <Send className="w-6 h-6" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-gray-500 text-xs mt-6">
                    All data is processed in accordance with UK Data Protection legislation.
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-24 rounded-[3rem] shadow-2xl text-center"
            >
              <div className="w-32 h-32 rounded-full bg-secondary/20 flex items-center justify-center mb-10 mx-auto">
                <CheckCircle2 className="w-16 h-16 text-secondary" />
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Application Received!</h3>
              <p className="text-gray-300 text-xl max-w-lg mx-auto leading-relaxed mb-12">
                Thank you for applying to Bonded Brothers CC. Our membership secretary will review your details and contact you within 3-5 working days regarding your membership status.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-secondary font-bold text-lg hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                Submit another application
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
