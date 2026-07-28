import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, ArrowRight, ShieldCheck, 
  Hammer, Clock, CheckCircle2, XCircle, 
  MapPin, Phone, Menu, X, Settings, 
  LayoutGrid, Ruler, ArrowUpRight
} from 'lucide-react';

// --- DATA CONSTANTS ---
const WHATSAPP_NUMBER = "919999999999"; 
const MAP_LINK = "https://maps.google.com/?q=Metal+Fab+Devi+Circle+Vidyaranyapura+Bangalore";

const CATALOGUE_ITEMS = [
  { id: 1, title: "Heavy-Duty Security Gate", category: "Doors", price: "From ₹3,500/sq.ft", img: "gate" },
  { id: 2, title: "Minimalist French Windows", category: "Windows", price: "Custom Quote", img: "window" },
  { id: 3, title: "Industrial Staircase Railing", category: "Fabrication", price: "From ₹2,200/sq.ft", img: "rail" },
  { id: 4, title: "Modern Main Door Frame", category: "Doors", price: "From ₹4,500/sq.ft", img: "door" },
  { id: 5, title: "Soundproof Steel Casement", category: "Windows", price: "Custom Quote", img: "window2" },
  { id: 6, title: "Custom Mezzanine Structure", category: "Fabrication", price: "Site Visit Required", img: "structure" },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Unmatched Security", text: "Reinforced steel joints that provide exponentially higher security than standard wood frames." },
  { icon: Clock, title: "Lifetime Longevity", text: "Treated for anti-rust and corrosion. Install it once and never worry about it again." },
  { icon: Ruler, title: "Precision Customization", text: "Every door, window, and structure is laser-measured and fabricated to your exact site dimensions." },
];

// --- ANIMATED HERO BACKGROUND (WELDING SPARKS) ---
const WeldingSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-industrial rounded-full shadow-[0_0_10px_2px_#ff5a1f]"
        style={{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          left: Math.random() * 100 + '%',
        }}
        initial={{ top: '110%', opacity: 0 }}
        animate={{
          top: '-10%',
          opacity: [0, 1, 1, 0],
          x: Math.random() * 100 - 50 // Slight horizontal drift
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = activeTab === "All" 
    ? CATALOGUE_ITEMS 
    : CATALOGUE_ITEMS.filter(item => item.category === activeTab);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({ top: (elementRect - bodyRect) - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-steel-900 text-steel-100 font-sans selection:bg-industrial selection:text-white pb-20 lg:pb-0">
      
      {/* --- NAVIGATION --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-steel-900/90 backdrop-blur-md border-steel-800 py-4 shadow-lg' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollTo('hero')} className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wider relative z-10">
            Metal<span className="text-industrial">Fab</span>
          </button>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide relative z-10">
            <button onClick={() => scrollTo('features')} className="text-steel-400 hover:text-white transition-colors">Why Steel</button>
            <button onClick={() => scrollTo('catalogue')} className="text-steel-400 hover:text-white transition-colors">Catalogue</button>
            <button onClick={() => scrollTo('compare')} className="text-steel-400 hover:text-white transition-colors">Wood vs Steel</button>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="bg-industrial hover:bg-industrial-hover text-white px-5 py-2.5 rounded-sm transition-colors flex items-center gap-2 font-bold"
            >
              <MessageCircle size={18} /> Get a Quote
            </a>
          </nav>

          <button className="md:hidden text-white relative z-10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden border-b border-steel-800">
        <WeldingSparks />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-steel-800/40 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-steel-700 bg-steel-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-steel-400 mb-8"
            >
              <Settings size={14} className="text-industrial animate-spin-slow" />
              Custom Steel Fabrication in Bangalore
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-display font-black text-white leading-[0.85] uppercase mb-8"
            >
              Wood rots.<br />
              <span className="text-steel-500">Steel</span> <span className="text-industrial">lasts.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-lg md:text-2xl text-steel-300 mb-10 max-w-2xl leading-relaxed"
            >
              Replace outdated, warping woodwork with premium steel doors and window frames. Built tough for permanent longevity and an industrial aesthetic.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => scrollTo('catalogue')}
                className="inline-flex justify-center items-center gap-2 bg-white text-steel-900 hover:bg-steel-100 px-8 py-4 rounded-sm font-bold transition-all hover:scale-[1.02]"
              >
                View Our Work
                <ArrowRight size={20} />
              </button>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="inline-flex justify-center items-center gap-2 border border-steel-700 hover:border-industrial hover:text-industrial bg-steel-900/50 backdrop-blur-sm px-8 py-4 rounded-sm font-bold transition-all"
              >
                Request a Custom Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE (NEW) --- */}
      <div className="bg-industrial py-4 overflow-hidden flex whitespace-nowrap w-full border-b-4 border-steel-900">
        <motion.div
          className="flex space-x-12 shrink-0 font-display font-bold text-xl md:text-2xl uppercase tracking-widest text-black"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex space-x-12 shrink-0 items-center">
               <span>✦</span> <span>10-Year Structural Warranty</span>
               <span>✦</span> <span>100% Rust-Proof</span>
               <span>✦</span> <span>Termite & Pest Resistant</span>
               <span>✦</span> <span>Laser-Measured Precision</span>
             </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-steel-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-12"
          >
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="flex flex-col gap-4 border-l-2 border-industrial pl-6 py-2">
                <feat.icon size={36} className="text-industrial" />
                <h3 className="text-2xl font-display font-bold uppercase">{feat.title}</h3>
                <p className="text-steel-400 leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- THE CATALOGUE (FILTER BUG FIXED) --- */}
      <section id="catalogue" className="py-24 bg-steel-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-display font-black uppercase text-white mb-4">Project Gallery</h2>
              <p className="text-steel-400 max-w-xl">Every project is custom-measured and fabricated to order. Browse our recent styles below.</p>
            </div>
            
            <div className="flex bg-steel-900 p-1 rounded-sm border border-steel-700 overflow-x-auto max-w-full hide-scrollbar">
              {["All", "Doors", "Windows", "Fabrication"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-sm font-bold rounded-sm whitespace-nowrap transition-all ${
                    activeTab === tab ? 'bg-industrial text-white' : 'text-steel-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* mode="popLayout" fixes the grid jumping bug instantly */}
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={item.id}
                  className="group bg-steel-900 border border-steel-700 hover:border-industrial transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] bg-steel-800 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 to-transparent z-10" />
                    {/* Placeholder for future images. We've added a scale effect on hover. */}
                    <LayoutGrid size={48} className="text-steel-700 group-hover:scale-125 group-hover:text-steel-500 transition-all duration-500" />
                    <span className="absolute bottom-4 left-4 z-20 text-xs font-bold tracking-widest text-steel-400 uppercase bg-steel-900/80 px-2 py-1">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-industrial transition-colors">{item.title}</h3>
                      <p className="text-steel-400 text-sm mt-2">{item.price}</p>
                    </div>
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in the ${item.title}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-industrial transition-colors mt-4 w-fit"
                    >
                      Enquire Now <ArrowUpRight size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- STEEL VS WOOD COMPARISON --- */}
      <section id="compare" className="py-24 bg-steel-900 border-t border-steel-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-black uppercase text-white mb-4">The Brutal Truth</h2>
            <p className="text-steel-400 max-w-xl mx-auto">Why builders and smart homeowners are ditching traditional wood framing.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-steel-800/30 border border-steel-700 p-8 flex flex-col gap-6"
            >
              <h3 className="text-3xl font-display font-bold text-steel-400 uppercase border-b border-steel-700 pb-4">Traditional Wood</h3>
              <ul className="space-y-4">
                {["Warps and swells during monsoon season", "Vulnerable to termite and pest damage", "Requires expensive polishing every few years", "Weaker security at hinges and locks"].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-steel-400">
                    <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-steel-800 border-2 border-industrial p-8 flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 text-industrial opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                <Hammer size={200} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white uppercase border-b border-steel-700 pb-4 relative z-10">MetalFab Steel</h3>
              <ul className="space-y-4 relative z-10">
                {["100% weatherproof, zero seasonal warping", "Completely termite and pest proof", "Zero maintenance powder-coated finish", "Heavy-duty structural integrity for maximum security"].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <CheckCircle2 size={20} className="text-industrial shrink-0 mt-0.5" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <footer className="bg-black pt-24 pb-12 border-t-4 border-industrial">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl font-display font-black text-white uppercase mb-8">Ready to upgrade?</h2>
            <div className="space-y-6 text-steel-400">
              <div className="flex items-start gap-4 hover:text-white transition-colors cursor-default">
                <MapPin className="text-industrial shrink-0" size={24} />
                <p>No. 1, Near Devi Circle, Yelahanka Main Road,<br/>Vidyaranyapura, Bangalore-560097, Karnataka.</p>
              </div>
              <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                <Clock className="text-industrial shrink-0" size={24} />
                <p>Monday – Saturday | 9:00 AM – 8:00 PM</p>
              </div>
              <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                <Phone className="text-industrial shrink-0" size={24} />
                <p>+91 {WHATSAPP_NUMBER.slice(2)}</p>
              </div>
            </div>
            
            <a 
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-white border border-steel-700 hover:border-white px-6 py-3 rounded-sm transition-colors text-sm font-bold uppercase tracking-wider"
            >
              Get Directions <MapPin size={16} />
            </a>
          </div>
          
          <div className="bg-steel-900 border border-steel-800 p-8 flex flex-col justify-center text-center hover:border-steel-700 transition-colors">
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-4">Fast Quote Turnaround</h3>
            <p className="text-steel-400 mb-8">Send us your rough measurements or site photos on WhatsApp, and we'll provide a baseline estimate within hours.</p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="bg-industrial hover:bg-industrial-hover text-white py-4 rounded-sm font-bold text-lg transition-colors flex items-center justify-center gap-3 w-full shadow-lg shadow-industrial/20"
            >
              <MessageCircle size={24} /> Message on WhatsApp
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-steel-900 text-center text-steel-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} MetalFab. All rights reserved.</p>
          <p>Built for resilience.</p>
        </div>
      </footer>

      {/* --- FLOATING MOBILE WHATSAPP --- */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}