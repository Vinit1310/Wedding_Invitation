import { motion } from 'motion/react';
import coupleImg from '../../assets/images/125.webp';

export default function Story() {
  const couplePhoto = coupleImg;

  return (
    <section id="story" className="py-12 md:py-16 px-6 md:px-12 relative z-20 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column - Framed Couple Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative group order-2 lg:order-1 max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full"
        >
          {/* Framed Offset Border */}
          <div className="absolute -inset-4 border border-gold translate-x-6 translate-y-6 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700 pointer-events-none rounded-none" />
          
          {/* Elegant Photo container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-rose-light shadow-2xl border border-primary/5 rounded-[1px]">
            <img 
              src={couplePhoto} 
              alt="Jyoti and Mayuresh Portrait" 
              className="w-full h-full object-cover object-center grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000"
            />
            {/* Soft decorative visual layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4c0011]/15 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Column - Our Story Text Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 lg:order-2 flex flex-col space-y-6 md:space-y-8 bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[2px] border border-gold/15 shadow-xl paper-texture text-left"
        >
          <div className="space-y-3">
            <h2 className="font-serif text-[#4c0011] text-3xl md:text-[45px] font-bold tracking-tight leading-none">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-[#e9c349]" />
          </div>

          <p className="font-sans text-sm md:text-[15px] text-wine-grey leading-relaxed font-medium">
            With the blessings of our families and the grace of the Almighty, two families come together to celebrate the union of two hearts. Jyoti and Mayuresh are about to begin a beautiful journey of love, trust, companionship, and lifelong togetherness.
          </p>

          <p className="font-sans text-sm md:text-[15px] text-wine-grey leading-relaxed font-medium">
            As they embark on this new chapter, we warmly invite you to join us, share in our happiness, and bless the couple with your love and good wishes. Your presence will make this joyous occasion even more memorable as we celebrate the beginning of their forever.
          </p>

          {/* Stats Counters removed */}

        </motion.div>

      </div>
    </section>
  );
}
