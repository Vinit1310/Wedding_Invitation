import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Heart, User, MessageSquare } from 'lucide-react';
import { saveRSVP } from '../db';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    
    // Simulate slight network duration for realistic form submission
    setTimeout(() => {
      saveRSVP({
        name: name.trim(),
        guestsCount: 1,
        foodPreference: 'none',
        wish: wish.trim(),
        status: 'attending'
      });
      setIsSubmitted(true);
      setLoading(false);
    }, 850);
  };

  return (
    <section id="rsvp" className="py-12 md:py-16 px-6 md:px-12 relative z-20">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="rsvp-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-wine-dark text-white p-8 md:p-16 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden text-left"
            >
              {/* Blurred abstract gradient circles for luxurious visual style */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 text-center max-w-xl mx-auto mb-10">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Will You Join Us?
                </h2>
                <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                  We would be honored to have you celebrate this special day with us. Please let us know your presence by June 1st.
                </p>
              </div>

              {/* Form element */}
              <form onSubmit={handleSubmit} className="relative z-10 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-white/50 font-bold flex items-center gap-1.5">
                    <User size={12} className="text-gold" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aditi Deshmukh"
                    className="bg-transparent border-0 border-b-2 border-white/20 focus:ring-0 focus:border-gold text-lg md:text-xl font-serif text-white py-2 placeholder:text-white/20 transition-all focus:outline-none"
                  />
                </div>

                {/* Congratulatory Wish */}
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-white/50 font-bold flex items-center gap-1.5">
                    <MessageSquare size={12} className="text-gold" />
                    <span>Congratulatory Message / Wish</span>
                  </label>
                  <textarea
                    rows={2}
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="Write a sweet message wishing Jyoti & Mayuresh a blessed life together..."
                    className="bg-transparent border-0 border-b-2 border-white/20 focus:ring-0 focus:border-gold text-sm md:text-base font-sans text-white py-2 placeholder:text-white/20 transition-all resize-none focus:outline-none"
                  />
                </div>

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="md:col-span-2 bg-gold hover:bg-gold/90 text-wine-dark font-sans text-xs uppercase tracking-[0.25em] font-black py-4.5 px-8 rounded-full shadow-2xl mt-4 select-none hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-wine-dark border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Send Good Wishes</span>
                  )}
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-wine-dark text-white p-12 md:p-16 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[350px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mb-6 relative">
                <Heart className="text-gold fill-gold w-8 h-8 animate-pulse" />
                <div className="absolute inset-0 border border-gold rounded-full pulse-circle" />
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 tracking-wide">
                Thank You!
              </h2>
              <div className="w-12 h-px bg-gold/50 mb-4" />
              <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed max-w-sm mb-8 font-light">
                Your wedding response has been successfully registered. Jyoti and Mayuresh are overjoyed that you will share in their happiness!
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setWish('');
                }}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-gold/50 hover:text-gold text-white text-xs uppercase tracking-widest font-sans font-bold px-6 py-3.5 rounded-full transition-all active:scale-95 cursor-pointer"
              >
                <Check size={14} />
                <span>Submit another RSVP</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
