import { Heart } from 'lucide-react';

export default function Footer() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2f1d1f] text-white/80 w-full py-20 flex flex-col items-center justify-center space-y-8 px-6 border-t border-white/5 relative z-20">
      
      {/* Centered ornamental monogram style logo */}
      <div className="flex flex-col items-center space-y-1">
        <button 
          onClick={() => handleNavClick('hero')} 
          className="font-serif text-4xl font-extrabold text-[#e9c349] hover:opacity-85 transition-opacity cursor-pointer mb-2"
        >
          J & M
        </button>
        <div className="w-12 h-px bg-gold/50" />
      </div>

      {/* Footer Navigation items */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-14">
        {[
          { label: 'RSVP Now', id: 'rsvp' },
          { label: 'Save The Date', id: 'hero' },
          { label: 'Location Details', id: 'events' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="font-sans text-xs uppercase tracking-widest text-white/60 hover:text-gold transition-colors font-bold cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Elegant structural divide */}
      <div className="w-32 h-px bg-white/10" />

      {/* Personal closing signoff */}
      <p className="font-serif text-sm opacity-80 text-center font-medium italic flex items-center gap-2 select-none">
        With love, Jyoti & Mayuresh 2026
        <Heart size={12} className="text-gold fill-gold animate-pulse" />
      </p>
      
    </footer>
  );
}
