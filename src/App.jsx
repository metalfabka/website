import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, ArrowRight, ArrowUpRight, ShieldCheck,
  Hammer, Clock, CheckCircle2, XCircle,
  MapPin, Phone, Menu, X, LayoutGrid, Search
} from 'lucide-react';

// --- DATA CONSTANTS ---
const WHATSAPP_NUMBER = "916238308605";
const MAP_LINK = "https://maps.google.com/?q=Metal+Fab+Devi+Circle+Vidyaranyapura+Bangalore";

const NAV_LINKS = [
  { id: "features", label: "Why Steel" },
  { id: "catalogue", label: "Catalogue" },
  { id: "compare", label: "Wood vs Steel" },
];

// TEMP: items marked "// TODO: real photo" still point at gate.jpg until you send the actual file.
const CATALOGUE_ITEMS = [
  // ---------------- DOORS ----------------
  { id: 1, title: "Safety Door (210×90 with Frame)", category: "Doors", img: "/catalogue/doors/door-safety.png" },
  { id: 2, title: "Safety Grill Door with Mosquito Mesh", category: "Doors", img: "/catalogue/doors/image (16).png" }, // TODO: real photo
  { id: 3, title: "Safety Grill Door", category: "Doors", img: "/gate.jpg" }, // TODO: real photo
  { id: 4, title: "French Design Door for Balcony", category: "Doors", img: "/catalogue/doors/door-french-modern.png" },
  { id: 5, title: "4 Fold French Door", category: "Doors", img: "/catalogue/doors/door-four-fold.png" },
  { id: 6, title: "Balcony French Door", category: "Doors", img: "/catalogue/doors/image (14).png" },
  { id: 7, title: "Balcony French Design Door", category: "Doors", img: "/gate.jpg" }, // TODO: real photo
  { id: 8, title: "Balcony Door", category: "Doors", img: "/gate.jpg" }, // TODO: real photo
  { id: 9, title: "French Door with SS Grill", category: "Doors", img: "/catalogue/doors/image (13).png" },
  { id: 10, title: "Double Door (Painted)", category: "Doors", img: "/catalogue/doors/image (7).png" },
  { id: 11, title: "Grill Door", category: "Doors", img: "/gate.jpg" }, // TODO: real photo
  { id: 12, title: "Door and Glass Model (Pooja Room Door)", category: "Doors", img: "/catalogue/doors/door-glass-panels.png" },

  // ---------------- WINDOWS ----------------
  { id: 13, title: "Round Window", category: "Windows", img: "/catalogue/windows/window-round.png" },
  { id: 14, title: "Bay Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 15, title: "Corner Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 16, title: "Long Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 17, title: "Kitchen Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 18, title: "Bathroom Ventilator", category: "Windows", img: "/catalogue/windows/window-bathroom-ventilation.png" },
  { id: 19, title: "Two Panel Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 20, title: "Three Panel Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 21, title: "Four Panel Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 22, title: "Five Panel Window", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 23, title: "Design Window with SS Tubes", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 24, title: "French Window with Mosquito Mesh", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 25, title: "Window with SS Grill", category: "Windows", img: "/gate.jpg" }, // TODO: real photo
  { id: 26, title: "GI Window with Design", category: "Windows", img: "/gate.jpg" }, // TODO: real photo

  // ---------------- FRAMES ----------------
  { id: 27, title: "Door Frame (3×7, No Bottom Frame)", category: "Frames", img: "/gate.jpg" }, // TODO: real photo
  { id: 28, title: "Door Frame (9×6)", category: "Frames", img: "/gate.jpg" }, // TODO: real photo
  { id: 29, title: "Arch Door Frame with Windows", category: "Frames", img: "/gate.jpg" }, // TODO: real photo

  // ---------------- ACCESSORIES ----------------
  { id: 30, title: "Window Latch", category: "Accessories", img: "/gate.jpg" }, // TODO: real photo
  { id: 31, title: "Automatic Window Latch", category: "Accessories", img: "/gate.jpg" }, // TODO: real photo

  // ---------------- SPECIAL DESIGNS ----------------
  { id: 32, title: "Door Cum Window", category: "Special Designs", img: "/gate.jpg" }, // TODO: real photo
  { id: 33, title: "Door Cum Window with Mosquito Mesh", category: "Special Designs", img: "/gate.jpg" }, // TODO: real photo
  { id: 34, title: "French Door Cum Window", category: "Special Designs", img: "/gate.jpg" }, // TODO: real photo
  { id: 35, title: "Door with Attached Window", category: "Special Designs", img: "/catalogue/special/door-with-window-attached.png" },
];

const MARQUEE_ITEMS = [
  "10-Year Structural Warranty",
  "100% Rust-Proof",
  "Termite & Pest Resistant",
  "Laser-Measured Precision",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HazardStripe = ({ className = "h-1.5" }) => (
  <div
    className={`w-full ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(135deg, #ff5a1f 0px, #ff5a1f 8px, #0a0f16 8px, #0a0f16 16px)",
      opacity: 0.5,
    }}
  />
);

const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

// Global helper styles: hide-scrollbar actually needs real CSS (Tailwind has
// no built-in utility for this) — without it the browser's native scrollbar
// still renders regardless of the class name being present.
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    .font-poppins { font-family: 'Poppins', ui-sans-serif, sans-serif; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

    /* Page scrollbar, restyled to match the steel/industrial theme instead
       of the browser's default grey bar. Firefox uses scrollbar-color;
       Chrome/Edge/Safari use the ::-webkit-scrollbar pseudo-elements. */
    html {
      scrollbar-color: #ff5a1f #0a0f16;
      scrollbar-width: thin;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0f16;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ff5a1f;
      border-radius: 9999px;
      border: 2px solid #0a0f16;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #ff7a45;
    }
  `}</style>
);

// --- BUTTON ---
function Button({ href, children, variant = "primary", external = true, block = false, size = "md", onClick, as = "a", className = "" }) {
  const isButton = as === "button";
  const Comp = isButton ? "button" : "a";

  const sizeCls =
    size === "lg"
      ? "px-7 py-3.5 text-sm md:text-base"
      : size === "sm"
        ? "px-3 py-2 text-[11px] sm:px-4 sm:py-2.5 sm:text-xs"
        : "px-5 py-2.5 text-xs md:text-sm";

  const variantCls =
    variant === "primary"
      ? "bg-industrial text-black hover:bg-[#ff7a45]"
      : "bg-transparent text-white border border-steel-700 hover:border-steel-500 hover:bg-white/5";

  const linkProps = isButton ? {} : { href, target: external ? "_blank" : undefined, rel: external ? "noreferrer" : undefined };

  return (
    <Comp
      {...linkProps}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-1.5 sm:gap-2 font-bold uppercase tracking-wider rounded-sm transition-colors duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-industrial ${sizeCls} ${variantCls} ${block ? "w-full" : ""} ${className}`}
    >
      {children}
      {!isButton && external && (
        <ArrowUpRight
          size={size === "sm" ? 12 : 15}
          className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Comp>
  );
}

// --- FOOTER ACTION ROW ---
function FooterActionRow({ icon: Icon, label, sublabel, href, variant = "outline" }) {
  const filled = variant === "filled";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center justify-between gap-4 px-4 py-3 rounded-sm transition-colors duration-200 ${filled
        ? "bg-industrial hover:bg-[#ff7a45]"
        : "bg-[#0a0f16] border border-steel-700 hover:border-steel-500"
        }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon size={16} className={`shrink-0 ${filled ? "text-black" : "text-industrial"}`} />
        <div className="text-left min-w-0">
          <p className={`font-poppins text-sm font-medium truncate ${filled ? "text-black" : "text-white"}`}>
            {label}
          </p>
          {sublabel && (
            <p className={`font-poppins text-[11px] mt-0.5 truncate ${filled ? "text-black/70" : "text-steel-500"}`}>{sublabel}</p>
          )}
        </div>
      </div>
      <ArrowUpRight
        size={15}
        className={`shrink-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${filled ? "text-black" : "text-steel-500 group-hover:text-white"
          }`}
      />
    </a>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TESTIMONIALS = [
  { name: "Ravi Kumar", handle: "Vidyaranyapura", body: "Got a security gate made for our compound. Solid work, finished on time and looks exactly like what we discussed." },
  { name: "Anitha Reddy", handle: "RT Nagar", body: "Switched from a wooden main door to steel after termites ruined the old one. No regrets, feels much sturdier." },
  { name: "Suresh Babu", handle: "Yelahanka", body: "Needed a custom staircase railing on short notice. They came for measurements the same week and delivered clean work." },
  { name: "Priya Nair", handle: "Hebbal", body: "Windows were fabricated to fit an odd-sized opening perfectly. Good finish, no rattling even after a year." },
  { name: "Manoj Gowda", handle: "Devi Circle", body: "Been getting our factory shed fabrication done here for years. Consistent quality, fair pricing." },
  { name: "Divya S", handle: "Jalahalli", body: "Quoted on WhatsApp within the hour and the gate was installed within the week. Straightforward process." },
];
const testimonialsRow1 = TESTIMONIALS.slice(0, 3);
const testimonialsRow2 = TESTIMONIALS.slice(3);

function Marquee({ children, reverse = false, duration = 32, pauseOnHover = false, className = "" }) {
  return (
    <div className={`group relative flex w-full overflow-hidden gap-6 ${className}`}>
      <style>{`
        @keyframes metalfab-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? "true" : undefined}
          className={cn("flex shrink-0 gap-6", pauseOnHover && "group-hover:[animation-play-state:paused]")}
          style={{
            animation: `metalfab-marquee ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ name, handle, body }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <figure className="w-72 shrink-0 border border-steel-800 bg-[#070b10] p-5 hover:border-industrial/60 transition-colors duration-150 rounded-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-steel-800 flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-industrial text-xs">{initials}</span>
        </div>
        <div className="min-w-0">
          <figcaption className="text-sm font-bold text-white truncate">{name}</figcaption>
          <p className="text-xs text-steel-500 truncate">{handle}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-steel-400 leading-relaxed">{body}</blockquote>
    </figure>
  );
}

// --- CUTOUT CORNER (signature notch motif — echoes a fabricated steel corner) ---
const CUTOUT_CORNER_PATH = "M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z";

const CutoutCorner = ({ className = "", size = 32 }) => (
  <svg aria-hidden="true" className={className} height={size} width={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d={CUTOUT_CORNER_PATH} fill="currentColor" />
  </svg>
);

// --- CATALOGUE CARD ---
function CatalogueCard({ item }) {
  const whatsappMessage = encodeURIComponent(
    `Hi MetalFab,

I'm interested in the "${item.title}" shown on your website.

Could you please share:

• Estimated pricing
• Available sizes
• Colour options
• Delivery & Installation details

Thank you.`
  );

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
    >
      {/* Outer wrapper: transform + shadow ONLY, and crucially NOT clipped
          (no overflow-hidden here). The earlier flicker was caused by
          animating box-shadow on the same element that clips its content
          with rounded overflow-hidden — Chrome has to recompute the clip
          mask and the shadow together each frame, and for one frame the
          rounded edge briefly shows unclipped. Keeping the shadow on this
          unclipped wrapper and the clipping on the inner wrapper (border
          color only, never shadow) removes that recompute entirely. */}
      <div className="group transform-gpu rounded-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(255,90,31,.12)]">
        {/* Inner wrapper: border + radius + clip ONLY. Never animates
            box-shadow, never transforms. */}
        <div className="bg-[#070b10] border border-steel-800 rounded-sm overflow-hidden transition-colors duration-300 group-hover:border-industrial">

          {/* IMAGE */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b10]/25 via-transparent to-transparent" />
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-industrial text-black text-[8px] sm:text-[9px] uppercase font-bold tracking-wider rounded-sm">
                Made to Order
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-3 sm:p-4">
            <p className="text-industrial uppercase tracking-[2px] text-[9px] sm:text-[10px] font-semibold mb-1">
              {item.category}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-2 sm:mb-3 line-clamp-1">
              {item.title}
            </h3>
            <Button
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              variant="primary"
              size="sm"
              block
            >
              <MessageCircle size={13} className="shrink-0" />
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- FEATURES ---
const FEATURES = [
  { icon: ShieldCheck, title: "Unmatched Security", text: "Reinforced steel joints provide exponentially higher security than standard wood frames." },
  { icon: Clock, title: "Lifetime Longevity", text: "Treated for anti-rust and corrosion - install it once and never worry about it again." },
  { icon: LayoutGrid, title: "Precision Customization", text: "Every door, window, and structure is laser-measured and fabricated to your exact site dimensions." },
];

const WeldingSparks = () => {
  const sparks = useMemo(
    () =>
      [...Array(25)].map(() => ({
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        drift: Math.random() * 100 - 50,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-industrial rounded-full shadow-[0_0_10px_2px_#ff5a1f]"
          style={{ width: `${s.size}px`, height: `${s.size}px`, left: `${s.left}%` }}
          initial={{ top: '110%', opacity: 0 }}
          animate={{ top: '-10%', opacity: [0, 1, 1, 0], x: s.drift }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "linear", delay: s.delay }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const marqueeOrder = useMemo(() => shuffle(MARQUEE_ITEMS), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const section = document.getElementById("catalogue");
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, [activeTab]);

  const filteredItems = CATALOGUE_ITEMS.filter((item) => {
    const matchesCategory =
      activeTab === "All" || item.category === activeTab;

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const displayedItems = showAllProducts
    ? filteredItems
    : filteredItems.slice(0, 18);

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
    <div className="min-h-screen bg-[#0a0f16] text-steel-100 font-sans selection:bg-industrial selection:text-white pb-6 lg:pb-0">
      <NoiseOverlay />
      <GlobalStyles />

      {/* --- NAVIGATION --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0a0f16]/90 backdrop-blur-md border-steel-800/50 py-4 shadow-lg' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollTo('hero')} className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wider relative z-10 group">
            Metal<span className="text-industrial">Fab</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-industrial group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
          </button>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest uppercase relative z-10">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-steel-400 hover:text-white transition-colors">
                {link.label}
              </button>
            ))}
            <Button href={`https://wa.me/${WHATSAPP_NUMBER}`}>
              <MessageCircle size={16} /> Get a Quote
            </Button>
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
                {NAV_LINKS.map((link) => (
                  <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-steel-400 hover:text-white transition-colors">
                    {link.label}
                  </button>
                ))}
                <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} onClick={() => setMobileMenuOpen(false)} block>
                  <MessageCircle size={16} /> Get a Quote
                </Button>
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
              <Button as="button" onClick={() => scrollTo('catalogue')} variant="secondary" size="lg" external={false}>
                View Our Work <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="primary" size="lg">
                Request Custom Quote
              </Button>
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
            <div key={i} aria-hidden={i > 0 ? "true" : undefined} className="flex space-x-12 shrink-0 items-center">
              {marqueeOrder.map((text) => (
                <React.Fragment key={text}>
                  <span>✦</span> <span>{text}</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES SECTION ---
          Rethought from scratch: instead of restating the same three
          sentences as three parallel visual units (icon columns, then
          numbered rows), this treats them as annotations on an actual
          cross-section of a fabricated steel corner joint — the weld,
          the coating, the cut edge — the way a fabricator's own shop
          drawing would call them out. The three facts still exist (they're
          real, user-provided, not invented), but the reader meets them as
          labels on a drawing over a blueprint grid, then as a legend below
          it — not as three identical boxes. */}
      <section id="features" className="py-14 md:py-28 bg-[#0a0f16] border-y border-steel-800/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 md:mb-16 max-w-xl">
            <span className="block w-10 h-1 bg-industrial mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white leading-[0.95] mb-5">
              Built Different
            </h2>
            <p className="text-steel-400 text-sm md:text-base leading-relaxed">
              What actually happens at the joint, the surface, and the cut — not just why it's better.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Shop-drawing illustration: an L-shaped steel corner bracket
                over a faint blueprint grid, with three leader lines calling
                out the weld, the coating, and the cut edge. Everything —
                shapes, grid, leader lines, labels — lives inside one SVG
                viewBox, so it stays perfectly registered at every width
                instead of drifting like HTML-overlay callouts would on
                resize. */}
            <div className="relative">
              <svg viewBox="0 0 520 380" className="w-full h-auto" role="img" aria-label="Cross-section diagram of a steel corner bracket showing the weld seam, powder-coat surface, and laser-cut edge">
                <defs>
                  <pattern id="blueprintGrid" width="26" height="26" patternUnits="userSpaceOnUse">
                    <path d="M26 0H0V26" fill="none" className="text-steel-800" stroke="currentColor" strokeWidth="1" opacity="0.35" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="520" height="380" fill="url(#blueprintGrid)" />

                {/* Corner bracket body */}
                <g className="text-steel-700" stroke="currentColor" strokeWidth="2">
                  <rect x="70" y="60" width="300" height="70" fill="#0d131b" />
                  <rect x="70" y="60" width="70" height="260" fill="#0d131b" />
                </g>

                {/* Laser-cut edge: kerf tick marks along the outer left edge */}
                <g className="text-steel-500" stroke="currentColor" strokeWidth="1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={i} x1="58" x2="70" y1={150 + i * 24} y2={150 + i * 24} />
                  ))}
                </g>

                {/* Powder-coat surface: highlighted band along the top face */}
                <line x1="70" y1="58" x2="370" y2="58" className="text-industrial" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

                {/* Weld seam: jagged bead along the internal miter joint */}
                <polyline
                  points="70,130 88,112 106,130 124,112 140,130"
                  className="text-industrial"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Leader lines + labels */}
                <g className="text-steel-500" stroke="currentColor" strokeWidth="1">
                  <line x1="106" y1="121" x2="330" y2="70" />
                  <circle cx="106" cy="121" r="3.5" fill="currentColor" stroke="none" />
                  <line x1="220" y1="58" x2="330" y2="170" />
                  <circle cx="220" cy="58" r="3.5" fill="currentColor" stroke="none" />
                  <line x1="64" y1="245" x2="330" y2="270" />
                  <circle cx="64" cy="245" r="3.5" fill="currentColor" stroke="none" />
                </g>
                <g className="text-white font-mono text-[13px] uppercase tracking-wider" fill="currentColor">
                  <text x="335" y="74">Weld seam</text>
                  <text x="335" y="174">Powder coat</text>
                  <text x="335" y="274">Laser-cut edge</text>
                </g>
              </svg>
            </div>

            {/* Legend: same three real facts, read as callout definitions
                rather than boxed cards. */}
            <dl className="space-y-6 sm:space-y-7">
              <div className="border-t border-steel-800 pt-5">
                <dt className="font-mono text-industrial text-xs uppercase tracking-wider mb-2">Weld seam</dt>
                <dd className="text-steel-400 text-sm sm:text-base leading-relaxed">{FEATURES[0].text}</dd>
              </div>
              <div className="border-t border-steel-800 pt-5">
                <dt className="font-mono text-industrial text-xs uppercase tracking-wider mb-2">Powder coat</dt>
                <dd className="text-steel-400 text-sm sm:text-base leading-relaxed">{FEATURES[1].text}</dd>
              </div>
              <div className="border-t border-b border-steel-800 py-5">
                <dt className="font-mono text-industrial text-xs uppercase tracking-wider mb-2">Laser-cut edge</dt>
                <dd className="text-steel-400 text-sm sm:text-base leading-relaxed">{FEATURES[2].text}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* --- THE CATALOGUE --- */}
      <section id="catalogue" className="pt-12 pb-32 md:py-32 bg-[#070b10] border-t border-steel-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-12">
            <h2 className="text-5xl font-display font-black uppercase text-white mb-4">Steel Doors, Windows & Custom Fabrication</h2>
            <p className="text-steel-400 max-w-xl">Browse our collection of premium steel doors, windows,
              frames and custom fabricated products.

              Every product is manufactured according to your
              required dimensions, finish and design.</p>
          </div>

          {/* Desktop has room for all six tabs, so it never scrolls — they
              wrap left-to-right onto a second line if the viewport is
              narrow, same as a normal line of text (not right-justified,
              which stranded the last tab alone on the far right).
              Below md, where they don't all fit on one line, it becomes a
              swipeable strip: native scrollbar hidden via .hide-scrollbar,
              snap points so a swipe lands cleanly on a tab, and a soft edge
              fade (not a scrollbar) hinting there's more to the side. */}
          <div className="relative w-full mb-16">
            <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none scroll-smooth pb-2">
              {[
                "All",
                "Doors",
                "Windows",
                "Frames",
                "Accessories",
                "Special Designs",
              ].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    snap-start
                    px-5 py-2.5
                    rounded-full
                    text-sm
                    font-semibold
                    whitespace-nowrap
                    transition-all
                    duration-300
                    border
                    ${activeTab === tab
                      ? "bg-industrial text-black border-industrial"
                      : "border-steel-800 text-steel-400 hover:border-industrial hover:text-white"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="md:hidden pointer-events-none absolute top-0 bottom-2 left-0 w-6 bg-gradient-to-r from-[#070b10] to-transparent" />
            <div className="md:hidden pointer-events-none absolute top-0 bottom-2 right-0 w-8 bg-gradient-to-l from-[#070b10] to-transparent" />
          </div>

          <div className="mb-10">
            <div className="relative max-w-md w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-500"
              />
              <input
                type="text"
                placeholder="Search doors, windows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-full bg-[#0a0f16] border border-steel-800 text-white placeholder:text-steel-500 outline-none focus:border-industrial transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item) => (
                <CatalogueCard key={item.id} item={item} />
              ))}
              {displayedItems.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl text-white mb-3">
                    No matching products
                  </h3>
                  <p className="text-steel-500">
                    Try searching with another keyword.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {filteredItems.length > 18 && (
          <div className="flex justify-center mt-14">
            <Button
              as="button"
              variant="secondary"
              onClick={() => setShowAllProducts(!showAllProducts)}
            >
              {showAllProducts ? "Show Less" : "View All Products"}
            </Button>
          </div>
        )}
      </section>

      <HazardStripe className="h-1" />

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
              className="bg-[#0a0f16] border-2 border-industrial p-8 flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 rounded-sm"
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

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 bg-[#0a0f16] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-5xl font-display font-black uppercase text-white mb-4">What Clients Say</h2>
          <p className="text-steel-400 max-w-xl mx-auto">Real jobs, straight from the neighbourhoods we've worked in.</p>
        </div>

        <div className="relative flex flex-col gap-6">
          <Marquee pauseOnHover duration={32}>
            {testimonialsRow1.map((t) => (
              <ReviewCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover duration={32}>
            {testimonialsRow2.map((t) => (
              <ReviewCard key={t.name} {...t} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#0a0f16] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#0a0f16] to-transparent" />
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <HazardStripe className="h-1.5" />
      <footer className="bg-[#05080c] pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl font-display font-black text-white uppercase mb-8">Ready to upgrade?</h2>
            <div className="space-y-6 text-steel-400 mb-8">
              <div className="flex items-start gap-4 hover:text-white transition-colors cursor-default">
                <MapPin className="text-industrial shrink-0" size={24} />
                <p>No. 1, Near Devi Circle, Yelahanka Main Road,<br />Vidyaranyapura, Bangalore-560097, Karnataka.</p>
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

            <FooterActionRow icon={MapPin} label="Get directions" sublabel="Devi Circle, Vidyaranyapura" href={MAP_LINK} />
          </div>

          <div className="bg-[#0a0f16] border border-steel-800 p-8 flex flex-col justify-center rounded-sm">
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-4">Fast Quote Turnaround</h3>
            <p className="text-steel-400 mb-8">Send us your rough measurements or site photos on WhatsApp, and we'll provide a baseline estimate within hours.</p>

            <FooterActionRow
              icon={MessageCircle}
              label="Message on WhatsApp"
              sublabel="Usually replies within the hour"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="filled"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-steel-900 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center text-steel-500 text-sm uppercase tracking-widest font-bold">
            <p>© {new Date().getFullYear()} MetalFab.</p>
            <p>Built for Resilience.</p>
          </div>

          <a
            href="https://iedcmesce.org/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-steel-600 hover:text-steel-400 text-[10px] uppercase tracking-widest transition-colors"
          >
            <span>Powered by</span>
            <img src="/iedc-logo.png" alt="IEDC MESCE" className="w-4 h-4 rounded-sm bg-steel-800 border border-steel-700 object-contain p-0.5" />
            <span className="font-semibold text-steel-500">IEDC MESCE</span>
          </a>
        </div>
      </footer>

      {/* --- FLOATING MOBILE WHATSAPP --- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message MetalFab on WhatsApp"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-industrial text-black p-4 rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}