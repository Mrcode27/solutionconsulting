
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Briefcase, Users, PieChart, 
  Target, ShieldCheck, Globe, Mail, Phone, MapPin,
  TrendingUp, Sparkles, Scale, Layout, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Methodology from './pages/Methodology';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Méthodologie', path: '/methodology' },
    { name: 'Pourquoi Nous', path: '/why-us' },
    // "Contact" link removed as requested to reduce crowding and redundancy with "Consultation" button
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center group">
            {/* Logo updated: Star replaced with 'S', rotation reduced to 22deg, enhanced glow on hover */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-none flex items-center justify-center mr-4 gold-glow transition-all duration-500 group-hover:rotate-[22deg] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.8)]">
              <span className="text-black text-2xl font-serif font-black select-none">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-widest text-white">
                SOLUTIONS <span className="text-[#D4AF37]">CONSULTING</span>
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-bold -mt-1">Excellence Panafricaine</span>
            </div>
          </Link>

          {/* Desktop Links - Spacing adjusted for a cleaner look */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:text-[#D4AF37] relative group ${
                  location.pathname === link.path ? 'text-[#D4AF37]' : 'text-gray-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#D4AF37] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/contact" className="px-8 py-3 rounded-none bg-transparent border border-[#D4AF37] text-[#D4AF37] text-xs font-black tracking-widest uppercase transition-all hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#D4AF37] p-2"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-0 h-screen w-full bg-black z-50 flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-[#D4AF37]">
              <X className="w-10 h-10" />
            </button>
            <div className="space-y-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-serif font-bold text-white hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-4xl font-serif font-bold text-[#D4AF37] hover:text-white transition-colors"
              >
                Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="flex items-center mb-8">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-none flex items-center justify-center mr-3">
                <span className="text-black font-serif font-black text-sm">S</span>
              </div>
              <span className="text-xl font-serif font-bold tracking-widest">SOLUTIONS <span className="text-[#D4AF37]">CONSULTING</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
              L'excellence stratégique au service des leaders. Cabinet conseil de référence en Afrique Francophone pour les enjeux juridiques, commerciaux et marketing de haut niveau.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-10">Expertises</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors cursor-default">Ingénierie Juridique Luxe</li>
              <li className="hover:text-white transition-colors cursor-default">Levée de Fonds Souveraine</li>
              <li className="hover:text-white transition-colors cursor-default">Force de Vente Haute-Performance</li>
              <li className="hover:text-white transition-colors cursor-default">Branding de Prestige</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-10">Maison</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">Notre Héritage</Link></li>
              <li><Link to="/methodology" className="hover:text-white transition-colors">La Méthode</Link></li>
              <li><Link to="/why-us" className="hover:text-white transition-colors">Pourquoi l'Elite</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Conciergerie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase mb-10">Contact</h4>
            <ul className="space-y-5 text-sm text-gray-400 font-light">
              <li className="flex items-center"><Phone className="w-4 h-4 mr-4 text-[#D4AF37]" /> +237 6XX XXX XXX</li>
              <li className="flex items-center"><Mail className="w-4 h-4 mr-4 text-[#D4AF37]" /> elite@solutions-consulting.cm</li>
              <li className="flex items-center"><MapPin className="w-4 h-4 mr-4 text-[#D4AF37]" /> Bonamoussadi, Douala</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-bold">
            © {new Date().getFullYear()} Solutions Consulting Sarl. Excellence et Discrétion Assurées.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            <a href="#" className="hover:text-[#D4AF37]">Mentions Légales</a>
            <a href="#" className="hover:text-[#D4AF37]">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#D4AF37] selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
