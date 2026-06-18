import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                Sincera<span className="text-primary">Tech</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering businesses in Malawi with smart, scalable technology solutions. From infrastructure to branding, we are your growth partner.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/sinceraTechMW" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com/sinceratechmw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Pricing Packages</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-6">Our Services</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/services" className="hover:text-primary transition-colors flex items-center gap-1 group">Digital Systems <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors flex items-center gap-1 group">Networking <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors flex items-center gap-1 group">Security & CCTV <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors flex items-center gap-1 group">IT Consulting <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Lilongwe Area 49, Malawi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+265899816745" className="hover:text-primary">+265 899 816 745</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:sincerahtech@gmail.com" className="hover:text-primary">sincerahtech@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Sincera Tech Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
