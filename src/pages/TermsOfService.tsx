import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>Last updated: March 06, 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the Bonded Brothers Cricket Club website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Bonded Brothers Cricket Club's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Disclaimer</h2>
              <p>The materials on Bonded Brothers Cricket Club's website are provided on an 'as is' basis. Bonded Brothers Cricket Club makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Limitations</h2>
              <p>In no event shall Bonded Brothers Cricket Club or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bonded Brothers Cricket Club's website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Modifications</h2>
              <p>Bonded Brothers Cricket Club may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
