import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeSplashProps {
  onComplete: () => void;
}

// Particle spark positions (decorative gold sparks)
const sparks = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}));

// Floating rose petals
const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 5,
  size: Math.random() * 14 + 10,
  drift: (Math.random() - 0.5) * 120,
  rotate: Math.random() * 720 - 360,
}));

export default function WelcomeSplash({ onComplete }: WelcomeSplashProps) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Phase 0 → initial (logo + rings appear)     0ms
    // Phase 1 → tagline appears                  1200ms
    // Phase 2 → names bloom                      2400ms
    // Phase 3 → date + location                  3800ms
    // Phase 4 → outro curtain pull               5800ms
    // Phase 5 → done                             7200ms

    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 3800),
      setTimeout(() => setPhase(4), 5800),
      setTimeout(() => { setVisible(false); onComplete(); }, 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#0a0005' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          {/* ── Deep background radial glow ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120,20,40,0.55) 0%, rgba(60,5,20,0.35) 40%, transparent 75%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(180,130,30,0.12) 0%, transparent 60%)',
            }}
          />

          {/* ── Ambient edge vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* ── Star/spark particles ── */}
          {sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                background: s.id % 3 === 0 ? '#e9c349' : s.id % 3 === 1 ? '#fff8e7' : '#c0855a',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0, 1, 0.6, 1, 0] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* ── Falling petals ── */}
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none select-none"
              style={{ left: `${p.startX}%`, top: -40, fontSize: p.size }}
              initial={{ y: -60, opacity: 0, rotate: 0, x: 0 }}
              animate={{
                y: '110vh',
                opacity: [0, 0.6, 0.6, 0],
                rotate: p.rotate,
                x: p.drift,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              🌹
            </motion.div>
          ))}

          {/* ── Curtain reveal (phase 4 outro) ── */}
          <AnimatePresence>
            {phase >= 4 && (
              <>
                <motion.div
                  key="curtain-left"
                  className="absolute inset-y-0 left-0 w-1/2 z-50 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #0a0005, #1a0010)' }}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                  key="curtain-right"
                  className="absolute inset-y-0 right-0 w-1/2 z-50 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, #0a0005, #1a0010)' }}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 gap-5 select-none">

            {/* Decorative top arc line */}
            <motion.svg
              width="260" height="30" viewBox="0 0 260 30"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            >
              <path
                d="M10 25 Q130 0 250 25"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="1"
              />
              <circle cx="10" cy="25" r="2.5" fill="#e9c349" opacity="0.7" />
              <circle cx="250" cy="25" r="2.5" fill="#e9c349" opacity="0.7" />
              <circle cx="130" cy="5" r="3" fill="#e9c349" />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="#e9c349" />
                  <stop offset="70%" stopColor="#c8972a" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                letterSpacing: phase >= 1 ? '0.35em' : '0.6em',
              }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="font-sans text-[10px] uppercase text-[#e9c349]/70 font-semibold"
            >
              Together Forever
            </motion.p>

            {/* Monogram rings */}
            <div className="relative flex items-center justify-center my-2">
              {/* Outer glow ring */}
              <motion.div
                className="absolute rounded-full border border-[#e9c349]/15"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 200, height: 200, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute rounded-full border border-[#e9c349]/25"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 160, height: 160, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
              />

              {/* Names */}
              <motion.div
                className="relative flex items-center gap-3 z-10"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.3, delay: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
              >
                <span
                  className="font-serif font-black text-white leading-none"
                  style={{ fontSize: 'clamp(52px, 10vw, 88px)' }}
                >
                  J
                </span>
                <motion.span
                  className="font-serif italic text-[#e9c349] font-light leading-none"
                  style={{ fontSize: 'clamp(30px, 6vw, 52px)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.1 }}
                >
                  &
                </motion.span>
                <span
                  className="font-serif font-black text-white leading-none"
                  style={{ fontSize: 'clamp(52px, 10vw, 88px)' }}
                >
                  M
                </span>
              </motion.div>
            </div>

            {/* Full names */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: phase >= 2 ? 1 : 0,
                y: phase >= 2 ? 0 : 20,
                filter: phase >= 2 ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col items-center gap-1"
            >
              <h1
                className="font-serif font-bold text-white tracking-wide"
                style={{ fontSize: 'clamp(22px, 5vw, 36px)' }}
              >
                Jyoti{' '}
                <span className="text-[#e9c349] italic font-light">&amp;</span>{' '}
                Mayuresh
              </h1>
            </motion.div>

            {/* Ornament divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: phase >= 2 ? 1 : 0,
                scaleX: phase >= 2 ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#e9c349]/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
              <div className="w-2 h-2 rounded-full border border-[#e9c349]/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#e9c349]/60" />
            </motion.div>

            {/* Date & venue */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                y: phase >= 3 ? 0 : 14,
              }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex flex-col items-center gap-1.5"
            >
              <p className="font-sans text-white/80 font-semibold tracking-[0.25em] uppercase text-xs">
                June 23, 2026
              </p>
              <p className="font-sans text-[#e9c349]/60 text-[10px] uppercase tracking-[0.2em]">
                Madhukar Patil Hall · Satara, Maharashtra
              </p>
            </motion.div>

            {/* Bottom arc line */}
            <motion.svg
              width="260" height="30" viewBox="0 0 260 30"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              style={{ transform: 'scaleY(-1)' }}
            >
              <path d="M10 25 Q130 0 250 25" fill="none" stroke="url(#goldGrad2)" strokeWidth="1" />
              <circle cx="10" cy="25" r="2.5" fill="#e9c349" opacity="0.7" />
              <circle cx="250" cy="25" r="2.5" fill="#e9c349" opacity="0.7" />
              <circle cx="130" cy="5" r="3" fill="#e9c349" />
              <defs>
                <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="#e9c349" />
                  <stop offset="70%" stopColor="#c8972a" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Progress bar */}
            <motion.div className="w-40 h-[2px] bg-white/5 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(to right, #e9c349, #c8972a, #e9c349)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.5, ease: 'linear' }}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
