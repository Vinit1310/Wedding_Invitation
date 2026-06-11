import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

export default function Celebration() {
  // Target Wedding Date: June 23, 2026 at 17:01 (5:01 PM)
  const targetDate = new Date('2026-06-23T17:01:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="events" className="py-12 md:py-16 px-6 md:px-12 relative z-20 bg-transparent text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Rounded Ticket Title Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 px-10 py-3.5 bg-[#fbf9f5] backdrop-blur-md rounded-full shadow-md border border-gold/20 inline-flex items-center gap-2.5"
        >
          <Calendar size={18} className="text-[#4c0011]" />
          <span className="font-serif text-[#4c0011] text-base md:text-xl font-bold tracking-wide">
            The Celebration
          </span>
        </motion.div>

        {/* Central Invitation Stationery Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-full border-2 md:border-4 border-gold p-8 md:p-16 relative paper-texture shadow-2xl bg-white/80 rounded-[4px]"
        >
          {/* Overhanging Icon Badge */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#4c0011] p-4.5 rounded-full shadow-xl z-20">
            <Calendar className="text-white w-6 h-6" />
          </div>

          {/* Date Grid Columns */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-10 md:space-y-0 pt-6">
            
            {/* Tuesday JUNE 2026 Column */}
            <div className="flex-1 text-center md:text-right md:pr-10">
              <h3 className="font-serif text-[#e9c349] text-3xl md:text-4xl font-bold tracking-tight mb-1">
                Tuesday
              </h3>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#4c0011] font-bold">
                JUNE 2026
              </p>
            </div>

            {/* Giant Calendar Day Column */}
            <div className="relative px-12 py-4 border-y md:border-y-0 md:border-x border-primary/10 select-none">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[#4c0011] font-sans text-xs uppercase tracking-[0.3em] font-extrabold bg-transparent px-2">
                JUNE
              </div>
              <div className="text-7xl md:text-[100px] leading-none font-serif font-black text-[#4c0011] tracking-tighter filter drop-shadow-md">
                23
              </div>
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[#4c0011] font-sans text-xs uppercase tracking-[0.3em] font-extrabold bg-transparent px-2">
                2026
              </div>
            </div>

            {/* Arrival details column */}
            <div className="flex-1 text-center md:text-left md:pl-10">
              <h3 className="font-serif text-[#e9c349] text-3xl md:text-4xl font-bold tracking-tight mb-1">
                At 05:01 PM
              </h3>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#4c0011] font-bold">
                ARRIVAL & CEREMONY
              </p>
            </div>

          </div>

          {/* Location & Map Details */}
          <div className="mt-10 pt-10 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
            
            {/* Left: Venue Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#4c0011]" size={20} />
                <h4 className="font-serif text-xl md:text-2xl font-bold text-[#4c0011]">
                  Madhukar Patil Hall
                </h4>
              </div>
              
              <p className="text-wine-grey text-sm md:text-base font-medium leading-relaxed">
                HG4F+X3C, Satara, Katar Khatav, Maharashtra 415507
              </p>

              <a
                href="https://maps.google.com/?q=Madhukar+Patil+Hall+Satara"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#4c0011] text-white hover:bg-opacity-95 font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:shadow-2xl transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>

            {/* Right: Embedded Map */}
            <div className="w-full h-56 md:h-64 rounded-lg overflow-hidden border border-primary/10 shadow-md">
              <iframe
                title="Madhukar Patil Hall Location"
                src="https://maps.google.com/maps?q=Madhukar+Patil+Hall,+Satara,+Maharashtra+415507&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </motion.div>

        {/* Live Countdown Clock Widget */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 w-full max-w-xl bg-white/40 backdrop-blur-sm px-6 py-4 border border-gold/15 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-primary">
            <Clock size={16} />
            <span className="font-sans text-xs uppercase tracking-widest font-bold">
              {timeLeft.isOver ? 'The Big Day Has Arrived!' : 'Wedding Countdown:'}
            </span>
          </div>

          {!timeLeft.isOver ? (
            <div className="flex gap-4 md:gap-6 select-none">
              <div className="text-center">
                <span className="font-serif text-[#4c0011] text-xl md:text-2xl font-black block">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-wine-grey">Days</span>
              </div>
              <div className="text-primary font-bold mt-1 text-xs">:</div>
              <div className="text-center">
                <span className="font-serif text-[#4c0011] text-xl md:text-2xl font-black block">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-wine-grey">Hours</span>
              </div>
              <div className="text-primary font-bold mt-1 text-xs">:</div>
              <div className="text-center">
                <span className="font-serif text-[#4c0011] text-xl md:text-2xl font-black block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-wine-grey">Mins</span>
              </div>
              <div className="text-primary font-bold mt-1 text-xs">:</div>
              <div className="text-center">
                <span className="font-serif text-[#4c0011] text-xl md:text-2xl font-black block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-wine-grey">Secs</span>
              </div>
            </div>
          ) : (
            <span className="font-serif text-[#4c0011] text-sm font-black italic">
              Happy Married Life Jyoti & Mayuresh! ✨
            </span>
          )}
        </motion.div>

      </div>
    </section>
  );
}
