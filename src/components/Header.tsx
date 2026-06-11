import { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminView: boolean;
}

export default function Header({ onAdminToggle, isAdminView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Our Story', id: 'story' },
    { label: 'Events', id: 'events' },
    { label: 'RSVP Now', id: 'rsvp' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-rose-light/95 backdrop-blur-md py-4 shadow-sm border-b border-primary/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="font-serif text-3xl md:text-4xl text-primary tracking-tighter hover:opacity-85 transition-opacity cursor-pointer font-bold"
        >
          J & M
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-sans text-xs uppercase tracking-widest text-wine-grey hover:text-primary transition-colors cursor-pointer font-semibold relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          
          <button
            onClick={onAdminToggle}
            className={`font-sans text-xs uppercase tracking-widest px-3 py-1 rounded transition-all cursor-pointer font-semibold border ${
              isAdminView 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-wine-grey/25 text-wine-grey hover:border-primary hover:text-primary'
            }`}
          >
            {isAdminView ? 'View Invitation' : 'Attendee List'}
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://maps.google.com/?q=Madhukar+Patil+Hall+Satara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-white hover:bg-primary/95 text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-md hover:shadow-lg active:scale-95 transition-all"
          >
            <MapPin size={14} className="text-gold" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onAdminToggle}
            className={`text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded font-semibold border ${
              isAdminView 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-wine-grey/25 text-wine-grey'
            }`}
          >
            {isAdminView ? 'Invite' : 'Guest List'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:opacity-80 p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-gold-cream/98 border-b border-primary/10 shadow-xl py-6 px-8 z-40 transition-all duration-300">
          <div className="flex flex-col space-y-5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left font-serif text-lg text-primary hover:text-primary/75 py-1"
              >
                {item.label}
              </button>
            ))}
            
            <hr className="border-primary/10 my-1" />
            
            <a
              href="https://maps.google.com/?q=Madhukar+Patil+Hall+Satara"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold uppercase tracking-widest py-3.5 px-6 rounded-md"
            >
              <MapPin size={14} className="text-gold" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
