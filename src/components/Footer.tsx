import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { CLUB_NAME } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-primary pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img src="/bbcc-logo-official.jpg" alt={`${CLUB_NAME} Logo`} className="h-16 w-auto object-contain rounded-full border-2 border-white/20 shadow-lg" />
              <div className="flex flex-col">
                <span className="text-white font-display font-bold text-2xl tracking-tight leading-none">
                  BONDED BROTHERS <span className="text-secondary">CC</span>
                </span>
                <span className="text-gray-400 text-sm tracking-widest uppercase mt-1">Swindon</span>
              </div>
            </div>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              Join the premier cricket community where passion meets performance.
              We are more than just a club; we are a family dedicated to the spirit of the game.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/61573504687785"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/bbcc_swindon?igsh=NXk4cjd2aTMwcmoz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@bbccmedia?_r=1&_t=ZN-94S1BQjzX6s"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.32h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@bbccmediaswindon?si=sthBB7p3vBaIJ194"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-xl mb-8">QUICK LINKS</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/#about' },
                { name: 'Latest Matches', href: '/#matches' },
                { name: 'Gallery', href: '/#gallery' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="text-gray-400 hover:text-secondary flex items-center gap-2 group transition-colors">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0" />
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-gray-400 hover:text-secondary flex items-center gap-2 group transition-colors">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} BONDED BROTHERS CRICKET CLUB. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms-of-service" className="hover:text-secondary transition-colors">TERMS OF SERVICE</Link>
            <Link to="/cookie-policy" className="hover:text-secondary transition-colors">COOKIE POLICY</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
