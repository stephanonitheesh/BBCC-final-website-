import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLUB_NAME } from '../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    // Intersection Observer for active section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper part of the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'matches', 'players', 'gallery'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Matches', href: '/#matches' },
    { name: 'Squad', href: '/#players' },
    { name: 'Gallery', href: '/#gallery', icon: <Instagram className="w-3.5 h-3.5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !activeSection;
    if (path.startsWith('/#')) {
      const sectionId = path.split('#')[1];
      return location.pathname === '/' && activeSection === sectionId;
    }
    return location.pathname === path;
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/95 backdrop-blur-md py-3 shadow-xl border-b border-white/10'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3 group"
            aria-label={`${CLUB_NAME} Home`}
          >
            <img src="/bbcc-logo-official.jpg" alt={`${CLUB_NAME} Logo`} className="h-10 w-auto object-contain rounded-full border-2 border-white/20" />
            <span className="text-white font-display font-bold text-lg sm:text-xl tracking-tight group-hover:text-secondary transition-colors hidden sm:block">
              BONDED BROTHERS <span className="text-secondary group-hover:text-white transition-colors">CC</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center gap-2 ${active
                      ? 'text-secondary bg-white/10'
                      : 'text-gray-300 hover:text-secondary hover:bg-white/5'
                      }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={link.href === '/' ? handleHomeClick : undefined}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center gap-2 ${active
                      ? 'text-secondary bg-white/10'
                      : 'text-gray-300 hover:text-secondary hover:bg-white/5'
                      }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                );
              })}
              <div className="pl-4">
                <Link
                  to="/contact"
                  className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              className="text-gray-300 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/5"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-primary/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${active
                      ? 'text-secondary bg-white/10'
                      : 'text-gray-300 hover:text-secondary hover:bg-white/5'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={link.href === '/' ? handleHomeClick : () => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${active
                      ? 'text-secondary bg-white/10'
                      : 'text-gray-300 hover:text-secondary hover:bg-white/5'
                      }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-secondary text-primary px-6 py-4 rounded-xl font-bold text-base block text-center shadow-lg shadow-secondary/10 active:scale-[0.98] transition-transform"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
