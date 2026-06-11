import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquareQuote, Quote } from 'lucide-react';
import { getRSVPs } from '../db';
import { RSVP } from '../types';

export default function WishesList() {
  const [wishes, setWishes] = useState<RSVP[]>([]);

  const loadWishes = () => {
    const list = getRSVPs();
    // Filter items that actually left a wish message
    const withWishes = list.filter(item => item.wish && item.wish.trim().length > 0);
    setWishes(withWishes);
  };

  useEffect(() => {
    loadWishes();
    window.addEventListener('rsvps-updated', loadWishes);
    return () => window.removeEventListener('rsvps-updated', loadWishes);
  }, []);

  if (wishes.length === 0) return null;

  return (
    <section className="py-10 md:py-14 px-6 md:px-12 relative z-20 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title with floating count indicator */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold inline-flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full mb-3">
            <Heart size={12} className="text-primary fill-primary" />
            <span>{wishes.length} Wishes Left</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#4c0011] font-bold tracking-tight mb-2">
            Wishes for the Couple
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {wishes.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 hover:bg-white backdrop-blur-md p-8 shadow-xl border border-gold/10 hover:border-gold/30 hover:-translate-y-1 transition-all rounded-[1px] relative flex flex-col justify-between text-left items-start select-none paper-texture"
              >
                {/* Elegant Quote Graphic */}
                <Quote size={28} className="text-primary/10 absolute top-6 right-6" />

                <div className="space-y-4">
                  {/* Message */}
                  <em className="block font-serif text-wine-grey text-base leading-relaxed tracking-wide font-medium italic">
                    "{item.wish}"
                  </em>
                </div>

                <div className="mt-8 pt-4 border-t border-rose-light w-full flex items-center justify-between">
                  <div>
                    {/* Guest Name */}
                    <h4 className="font-serif text-[#4c0011] text-md font-bold leading-none mb-1">
                      {item.name}
                    </h4>
                    {/* Timestamp relative or readable formatted */}
                    <span className="text-[10px] uppercase font-sans tracking-widest text-wine-grey font-bold leading-none">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {/* Attending Status indicator pill */}
                  <div className="p-1.5 bg-primary/5 rounded-full">
                    <Heart size={12} className="text-primary fill-primary/40" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
