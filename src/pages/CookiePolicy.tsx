import { motion } from 'motion/react';

export default function CookiePolicy() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>Last updated: March 06, 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. What Are Cookies</h2>
              <p>Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. How We Use Cookies</h2>
              <p>When you use and access our website, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To enable certain functions of the website.</li>
                <li>To provide analytics.</li>
                <li>To store your preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Types of Cookies We Use</h2>
              <p>We use both session and persistent cookies on the website and we use different types of cookies to run the website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential cookies:</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
                <li><strong>Analytics cookies:</strong> We may use analytics cookies to track information how the website is used so that we can make improvements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Your Choices Regarding Cookies</h2>
              <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. More Information</h2>
              <p>You can learn more about cookies at <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">allaboutcookies.org</a>.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
