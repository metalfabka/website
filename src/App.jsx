import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, ArrowRight, ShieldCheck, 
  Hammer, Clock, CheckCircle2, XCircle, 
  MapPin, Phone, Menu, X, LayoutGrid
} from 'lucide-react';

// --- DATA CONSTANTS ---
const WHATSAPP_NUMBER = "916238308605"; 
const MAP_LINK = "https://maps.google.com/?q=Metal+Fab+Devi+Circle+Vidyaranyapura+Bangalore";

// TEMP: every item points at the one real photo we have (gate.jpg) until the client sends more.
// Swap each "/gate.jpg" for the real photo filename as soon as it's available.
const CATALOGUE_ITEMS = [
  { id: 1, title: "Heavy-Duty Security Gate", category: "Doors", price: "From ₹3,500/sq.ft", img: "/gate.jpg" },
  { id: 2, title: "Minimalist French Windows", category: "Windows", price: "Custom Quote", img: "/gate.jpg" },
  { id: 3, title: "Industrial Staircase Railing", category: "Fabrication", price: "From ₹2,200/sq.ft", img: "/gate.jpg" },
  { id: 4, title: "Modern Main Door Frame", category: "Doors", price: "From ₹4,500/sq.ft", img: "/gate.jpg" },
  { id: 5, title: "Soundproof Steel Casement", category: "Windows", price: "Custom Quote", img: "/gate.jpg" },
  { id: 6, title: "Custom Mezzanine Structure", category: "Fabrication", price: "Site Visit Required", img: "/gate.jpg" },
];

// --- MARQUEE ---
const MARQUEE_ITEMS = [
  "10-Year Structural Warranty",
  "100% Rust-Proof",
  "Termite & Pest Resistant",
  "Laser-Measured Precision",
];

// Fisher-Yates shuffle — runs once per page load so the order isn't identical every visit,
// while staying perfectly smooth for the whole session (see note below on why it can't
// reshuffle every loop and stay smooth at the same time).
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- HAZARD STRIPE ACCENT ---
// Subtle diagonal industrial stripe band, used as a divider / border accent.
const HazardStripe = ({ className = "" }) => (
  <div
    className={`h-2 w-full ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(135deg, #ff5a1f 0px, #ff5a1f 14px, #0a0f16 14px, #0a0f16 28px)",
      opacity: 0.5,
    }}
  />
);

// --- NOISE TEXTURE OVERLAY ---
// Very low-opacity grain layer over the whole page so large flat dark sections
// don't look like a flat digital fill. Non-interactive.
const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

const FEATURES = [
  { icon: ShieldCheck, title: "Unmatched Security", text: "Reinforced steel joints that provide exponentially higher security than standard wood frames." },
  { icon: Clock, title: "Lifetime Longevity", text: "Treated for anti-rust and corrosion. Install it once and never worry about it again." },
  { icon: LayoutGrid, title: "Precision Customization", text: "Every door, window, and structure is laser-measured and fabricated to your exact site dimensions." },
];

// --- BEST PARTICLE EFFECT (Rounded with Perfect Glow) ---
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
          x: Math.random() * 100 - 50 
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
  const marqueeOrder = useMemo(() => shuffle(MARQUEE_ITEMS), []);

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
    // DEEP PREMIUM BLACK BACKGROUND (#0a0f16)
    <div className="min-h-screen bg-[#0a0f16] text-steel-100 font-sans selection:bg-industrial selection:text-white pb-20 lg:pb-0">
      <NoiseOverlay />
      
      {/* --- NAVIGATION --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0a0f16]/90 backdrop-blur-md border-steel-800/50 py-4 shadow-lg' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollTo('hero')} className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wider relative z-10 group">
            Metal<span className="text-industrial">Fab</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-industrial group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
          </button>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest uppercase relative z-10">
            <button onClick={() => scrollTo('features')} className="text-steel-400 hover:text-white transition-colors">Why Steel</button>
            <button onClick={() => scrollTo('catalogue')} className="text-steel-400 hover:text-white transition-colors">Catalogue</button>
            <button onClick={() => scrollTo('compare')} className="text-steel-400 hover:text-white transition-colors">Wood vs Steel</button>
            
            {/* BEST BUTTON 1: Mask Slide Up */}
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-industrial text-white px-6 py-2.5 font-bold overflow-hidden rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle size={16} /> Get a Quote
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-industrial translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <MessageCircle size={16} /> Get a Quote
              </span>
            </a>
          </nav>

          <button
            className="md:hidden text-white relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- MOBILE MENU PANEL --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-[#0a0f16]/95 backdrop-blur-md border-t border-steel-800/50"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6 font-medium text-sm tracking-widest uppercase">
                <button onClick={() => scrollTo('features')} className="text-left text-steel-400 hover:text-white transition-colors">Why Steel</button>
                <button onClick={() => scrollTo('catalogue')} className="text-left text-steel-400 hover:text-white transition-colors">Catalogue</button>
                <button onClick={() => scrollTo('compare')} className="text-left text-steel-400 hover:text-white transition-colors">Wood vs Steel</button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-industrial text-white px-6 py-3 font-bold rounded-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> Get a Quote
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden border-b border-steel-800/50">
        <WeldingSparks />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-[#0a0f16]/50 to-[#0a0f16] z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            
            {/* Architectural Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 border border-steel-700/50 bg-[#0a0f16]/60 backdrop-blur-md px-4 py-1.5 rounded-sm text-xs font-bold tracking-[0.2em] uppercase text-steel-400 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-industrial shadow-[0_0_8px_2px_#ff5a1f] animate-pulse"></span>
              [ SITE-MEASURED FABRICATION ]
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
              className="flex flex-col sm:flex-row gap-6"
            >
              {/* BEST BUTTON 2: Premium Fill Sweep */}
              <button 
                onClick={() => scrollTo('catalogue')}
                className="group relative bg-white text-steel-900 px-8 py-4 font-bold uppercase tracking-wider overflow-hidden rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Our Work 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-steel-200 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
              </button>

              {/* BEST BUTTON 3: Brutalist Hard Shadow */}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="group relative inline-flex justify-center items-center gap-2 border border-steel-700 bg-[#0a0f16] px-8 py-4 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-industrial hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#FF5A1F] rounded-sm"
              >
                Request Custom Quote
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <div className="bg-industrial py-4 overflow-hidden flex whitespace-nowrap w-full border-b-4 border-[#0a0f16]">
        <motion.div
          className="flex space-x-12 shrink-0 font-display font-bold text-xl md:text-2xl uppercase tracking-widest text-black"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {[...Array(3)].map((_, i) => (
             <div key={i} className="flex space-x-12 shrink-0 items-center">
               {marqueeOrder.map((text) => (
                 <React.Fragment key={text}>
                   <span>✦</span> <span>{text}</span>
                 </React.Fragment>
               ))}
             </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-[#0a0f16]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-12"
          >
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="group flex flex-col gap-4 border-l-2 border-steel-800 hover:border-industrial pl-6 py-2 transition-colors duration-500">
                <feat.icon size={36} className="text-steel-600 group-hover:text-industrial transition-colors duration-500" />
                <h3 className="text-2xl font-display font-bold uppercase text-white">{feat.title}</h3>
                <p className="text-steel-400 leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- THE CATALOGUE (With Real Image Logic & Brackets) --- */}
      <section id="catalogue" className="py-24 bg-[#070b10] border-t border-steel-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-display font-black uppercase text-white mb-4">Project Gallery</h2>
              <p className="text-steel-400 max-w-xl">Every project is custom-measured and fabricated to order. Browse our recent styles below.</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto max-w-full hide-scrollbar pb-2">
              {["All", "Doors", "Windows", "Fabrication"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm ${
                    activeTab === tab ? 'text-white' : 'text-steel-500 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-industrial shadow-[0_0_8px_#ff5a1f]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={item.id}
                  className="group bg-[#0a0f16] border border-steel-800 hover:border-industrial transition-all duration-500 overflow-hidden flex flex-col cursor-pointer rounded-sm"
                >
                  <div className="aspect-[4/3] bg-[#070b10] relative flex items-center justify-center overflow-hidden">
                    
                    {/* Real Image Rendering Logic */}
                    {item.img ? (
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 z-0"
                      />
                    ) : (
                      <LayoutGrid size={48} className="text-steel-700 group-hover:scale-110 group-hover:text-steel-600 transition-all duration-700 z-0" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16]/90 via-[#0a0f16]/20 to-transparent z-10" />
                    
                    {/* BEST HOVER: Architectural Hover Brackets */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-industrial opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500 z-20"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-industrial opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:translate-y-2 transition-all duration-500 z-20"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-industrial opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 z-20"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-industrial opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500 z-20"></div>
                    
                    <span className="absolute bottom-4 left-6 z-20 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-[#0a0f16]/80 backdrop-blur-sm px-2 py-1 border border-steel-700/50 rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between gap-4 relative z-20">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-industrial transition-colors">{item.title}</h3>
                      <p className="text-steel-400 text-sm mt-2 font-mono tracking-tight">{item.price}</p>
                    </div>
                    
                    {/* BEST LINK: Premium Animated Link Arrow */}
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in the ${item.title}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white mt-4 w-fit overflow-hidden"
                    >
                      Enquire Now
                      <div className="relative w-4 h-4 overflow-hidden">
                        <ArrowRight size={16} className="absolute inset-0 text-industrial transition-transform duration-300 group-hover/link:translate-x-[150%] group-hover/link:-translate-y-[150%]" />
                        <ArrowRight size={16} className="absolute inset-0 text-industrial translate-x-[-150%] translate-y-[150%] transition-transform duration-300 group-hover/link:translate-x-0 group-hover/link:translate-y-0" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <HazardStripe />

      {/* --- STEEL VS WOOD COMPARISON --- */}
      <section id="compare" className="py-24 bg-[#0a0f16]">
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
              className="bg-[#070b10] border border-steel-800 p-8 flex flex-col gap-6 rounded-sm"
            >
              <h3 className="text-3xl font-display font-bold text-steel-500 uppercase border-b border-steel-800 pb-4">Traditional Wood</h3>
              <ul className="space-y-4">
                {["Warps and swells during monsoon season", "Vulnerable to termite and pest damage", "Requires expensive polishing every few years", "Weaker security at hinges and locks"].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-steel-400">
                    <XCircle size={20} className="text-red-500/70 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0f16] border-2 border-industrial p-8 flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF5A1F] transition-all duration-300 rounded-sm"
            >
              <div className="absolute -right-10 -top-10 text-industrial opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                <Hammer size={200} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white uppercase border-b border-steel-800 pb-4 relative z-10">MetalFab Steel</h3>
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
      <HazardStripe className="h-3" />
      <footer className="bg-[#05080c] pt-24 pb-12">
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
          
          <div className="bg-[#0a0f16] border border-steel-800 p-8 flex flex-col justify-center text-center hover:border-steel-700 transition-colors rounded-sm">
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-4">Fast Quote Turnaround</h3>
            <p className="text-steel-400 mb-8">Send us your rough measurements or site photos on WhatsApp, and we'll provide a baseline estimate within hours.</p>
            
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="group relative bg-industrial text-white py-4 font-bold text-lg overflow-hidden flex items-center justify-center gap-3 w-full rounded-sm"
            >
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-industrial transition-colors duration-300">
                <MessageCircle size={24} /> Message on WhatsApp
              </span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-steel-900 text-center text-steel-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} MetalFab.</p>
          <p>Built for Resilience.</p>
        </div>
      </footer>

      {/* --- FLOATING MOBILE WHATSAPP --- */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message MetalFab on WhatsApp"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center transition-all"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}