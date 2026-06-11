import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import cardLeft from '../../assets/images/123.webp';
import cardRight from '../../assets/images/124.webp';

export default function Hero() {
  const cardUrlLeft = cardLeft;
  const cardUrlRight = cardRight;

  const handleScroll = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="hero" className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-hidden">
      
      {/* Floating Rotating Cards on Left & Right */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 hidden lg:block">
        {/* Left rotated invitation card */}
        <motion.div 
          initial={{ opacity: 0, x: -150, y: 50, rotate: -25 }}
          animate={{ opacity: 0.95, x: 20, y: 140, rotate: -12 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute left-8 xl:left-16 w-64 xl:w-72 shadow-2xl rounded-lg overflow-hidden border border-gold/20"
        >
          <img 
            src={cardUrlLeft} 
            alt="Wedding Invitation Left" 
            className="w-full h-auto brightness-[0.98] contrast-[1.02]"
          />
        </motion.div>

        {/* Right rotated invitation card */}
        <motion.div 
          initial={{ opacity: 0, x: 150, y: 50, rotate: 20 }}
          animate={{ opacity: 0.95, x: -20, y: 140, rotate: 16 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
          className="absolute right-8 xl:right-16 w-64 xl:w-72 shadow-2xl rounded-lg overflow-hidden border border-gold/20"
        >
          <img 
            src={cardUrlRight} 
            alt="Wedding Invitation Right" 
            className="w-full h-auto brightness-[0.98] contrast-[1.02]"
          />
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtitle announcement with staggered fade-in */}
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[10px] md:text-[13px] uppercase tracking-[0.25em] text-primary font-bold mb-8 md:mb-10 text-center leading-relaxed"
        >
          Please join us to celebrate the wedding of:
        </motion.p>

        {/* Centered Golden Frame with Names */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative mb-14 md:mb-16"
        >
          {/* Inner square box */}
          <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[460px] md:h-[460px] border-2 md:border-4 border-gold rounded-none flex flex-col items-center justify-center p-6 md:p-12 background bg-white shadow-xl relative">
            
            {/* Corner Ornamental Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40 hover:scale-110 transition-transform"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/40"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/40"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40"></div>
            
            {/* Couple names and ampersand */}
            <h1 className="font-serif text-[#4c0011] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[1.15] mt-2 mb-2 select-none">
              Jyoti
            </h1>
            <div className="font-serif italic text-gold text-3xl sm:text-4xl md:text-5xl font-light py-1 relative">
              &
            </div>
            <h1 className="font-serif text-[#4c0011] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[1.15] mb-2 select-none">
              Mayuresh
            </h1>
          </div>


        </motion.div>

        {/* Floating/Mobile rotating cards layout below frame for smaller screens */}
        <div className="flex gap-4 mb-8 lg:hidden max-w-full justify-center overflow-x-auto px-4 z-10 py-2">
          <div className="w-[120px] shadow-md rounded overflow-hidden border border-gold/15 rotate-[-4deg] shrink-0">
            <img src={cardUrlLeft} alt="Wedding Invitation" className="w-full h-auto" />
          </div>
          <div className="w-[120px] shadow-md rounded overflow-hidden border border-gold/15 rotate-[4deg] shrink-0">
            <img src={cardUrlRight} alt="Wedding Invitation" className="w-full h-auto" />
          </div>
        </div>

        {/* Bottom Caret Indicator */}
        <motion.button 
          onClick={handleScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-2 group cursor-pointer hover:opacity-85"
        >
          <div className="w-9 h-9 rounded-full border border-primary/25 flex items-center justify-center animate-bounce group-hover:border-primary">
            <ChevronDown size={18} className="text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary/75 font-semibold">
            Scroll to explore
          </span>
        </motion.button>

      </div>
    </header>
  );
}
