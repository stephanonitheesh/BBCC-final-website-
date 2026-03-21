import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Matches from './components/Matches';
import Players from './components/Players';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import PlayerProfile from './pages/PlayerProfile';
import { motion } from 'motion/react';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Matches />
      <Players />
      <Gallery />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-secondary focus:text-primary focus:px-6 focus:py-3 focus:rounded-full focus:font-bold focus:shadow-2xl"
      >
        Skip to content
      </a>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white selection:bg-secondary selection:text-primary"
      >
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </Router>
  );
}
