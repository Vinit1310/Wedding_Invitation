import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Celebration from './components/Celebration';
import RsvpForm from './components/RsvpForm';
import WishesList from './components/WishesList';
import RsvpAdminDashboard from './components/RsvpAdminDashboard';
import Footer from './components/Footer';
import FloralBackground from './components/FloralBackground';
import WelcomeSplash from './components/WelcomeSplash';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const handleAdminToggle = () => {
    setIsAdminView(!isAdminView);
    // Scroll to top of the screen when switching views
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-gold-cream text-wine-grey font-sans overflow-x-hidden selection:bg-gold/30 selection:text-primary">
      
      {/* Welcome splash screen */}
      {!splashDone && <WelcomeSplash onComplete={() => setSplashDone(true)} />}
      {/* Dynamic Sparkles & Rose Petals background simulation layer */}
      <FloralBackground />

      {/* Navigation Layer */}
      <Header onAdminToggle={handleAdminToggle} isAdminView={isAdminView} />

      {/* Main Container with smooth fade transitions */}
      <motion.main
        className="relative min-h-[85vh] z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        <AnimatePresence mode="wait">
          {isAdminView ? (
            <motion.div
              key="admin-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <RsvpAdminDashboard />
            </motion.div>
          ) : (
            <motion.div
              key="invitation-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Hero />
              
              {/* Divider element mimicking heavy card deck */}
              <div className="w-16 h-px bg-primary/15 mx-auto opacity-60" />
              
              <Story />
              
              <div className="w-16 h-px bg-primary/15 mx-auto opacity-60" />
              
              <Celebration />
              
              <div className="w-16 h-px bg-primary/15 mx-auto opacity-60" />
              
              <RsvpForm />
              
              <WishesList />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Structural layout Footer component */}
      <Footer />
      
    </div>
  );
}
