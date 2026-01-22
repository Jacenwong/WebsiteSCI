import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModelViewer } from './ModelViewer';
import { Brain, Shield, Zap, Settings, Heart, Wrench } from 'lucide-react';

export const ProductShowcase = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Touch event handlers for swipe detection
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    // If swiping left and a feature is selected, close the modal
    if (isLeftSwipe && selectedFeature !== null) {
      setSelectedFeature(null);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "Machine learning algorithms that learn your unique movement patterns and adapt assistance accordingly.",
      position: { top: '20%', left: '5%' }
    },
    {
      icon: Zap,
      title: "Enhanced Strength", 
      description: "Provides 10-15 lbs of additional lift capacity with intelligent power assistance.",
      position: { top: '20%', right: '5%' }
    },
    {
      icon: Heart,
      title: "Rehabilitation Monitoring",
      description: "Continuously monitors your rehabilitation journey, tracking progress and celebrating milestones for better recovery outcomes.",
      position: { top: '40%', left: '5%' }
    },
    {
      icon: Wrench,
      title: "Customizable Settings",
      description: "Adjustable assistance levels and personalized configurations to match your specific needs.",
      position: { top: '40%', right: '5%' }
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Advanced safety systems with emergency stop and overload protection for secure daily use.",
      position: { top: '60%', left: '5%' }
    },
    {
      icon: Settings,
      title: "Easy Setup",
      description: "Quick calibration process that gets you started in minutes, not hours.",
      position: { top: '60%', right: '5%' }
    }
  ];

  return (
    <section 
      id="product" 
      className="min-h-screen w-full bg-background relative transition-all duration-1000 ease-in-out py-16"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col">
        {/* Title and Description */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            The <span className="bg-gradient-primary bg-clip-text text-transparent">Second-Arm</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A revolutionary assistive device that adapts to you, enhances your strength,
            and provides safe, stable support for daily activities.
          </p>
        </motion.div>

        {/* Hero Shot Image */}
        <div className="w-full mb-8 sm:mb-10 md:mb-12 relative z-10" style={{ minHeight: '300px' }}>
          <div className="flex justify-center items-center w-full">
            <img 
              src={`${import.meta.env.BASE_URL}SCIHeroShot.png`}
              alt="Second-Arm SCI Hero Shot" 
              className="w-1/2 md:w-full max-w-4xl object-contain"
              style={{ 
                display: 'block',
                maxWidth: '100%',
                height: 'auto'
              }}
              onError={(e) => {
                console.error('❌ Failed to load SCIHeroShot.png');
                console.error('Path attempted:', `${import.meta.env.BASE_URL}SCIHeroShot.png`);
                console.error('BASE_URL:', import.meta.env.BASE_URL);
                // Show a placeholder if image fails
                e.currentTarget.style.border = '2px solid red';
                e.currentTarget.style.backgroundColor = '#ffcccc';
              }}
              onLoad={() => {
                console.log('✅ SCIHeroShot.png loaded successfully');
              }}
            />
          </div>
        </div>

        {/* WIP 3D Project - 3D Model - COMMENTED OUT FOR LATER WORK */}
        {/* <div className="relative w-full h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95 z-[-2]" />
          <div className="absolute inset-0 bg-sky-200/15 dark:bg-black/15 bg-sky-100/20 dark:bg-primary/5 z-[-2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 to-transparent dark:from-primary/10 dark:to-transparent z-[-2]" />
          
          <motion.div 
            className="absolute inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full flex items-center justify-center" style={{ transform: 'translateY(-5%)' }}>
              <div className="w-full max-w-none">
                <ModelViewer />
              </div>
            </div>
          </motion.div>
        </div> */}

        {/* Coming Soon Section */}
        <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] flex items-center justify-center px-2 sm:px-4">
          {/* Background blur layers matching HeroSection */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95 z-[-2]" />
          <div className="absolute inset-0 bg-sky-200/15 dark:bg-black/15 bg-sky-100/20 dark:bg-primary/5 z-[-2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 to-transparent dark:from-primary/10 dark:to-transparent z-[-2]" />
          
          {/* Coming Soon Content */}
          <motion.div 
            className="text-center z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* 2D Design Image */}
            <motion.div 
              className="mb-8 flex justify-center items-center w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[665px] sm:max-w-[430px] md:max-w-[717px] lg:max-w-[1003px] xl:max-w-[1432px]">
                <img 
                  src={`${import.meta.env.BASE_URL}2D Model.png`}
                  alt="Second-Arm 2D Model" 
                  className="w-full h-auto object-contain"
                  style={{ 
                    background: 'transparent',
                    display: 'block'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('2D Model image loaded successfully');
                  }}
                />
              </div>
            </motion.div>
            
          </motion.div>

          {/* Interactive Feature Buttons - Below device on mobile, positioned around on desktop */}
          <div className="mt-8 md:mt-0">
            {/* Mobile: Grid layout below device */}
            <div className="grid grid-cols-2 gap-4 md:hidden px-4">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  className="z-20 w-full h-20 bg-primary/90 hover:bg-primary text-white rounded-xl transition-all duration-300 flex flex-col items-center justify-center group hover:brightness-110"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <feature.icon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-medium">{feature.title}</span>
                  
                  {/* Pulse animation for active state */}
                  {selectedFeature === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-white"
                      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop: Positioned around device */}
            {features.map((feature, index) => (
              <motion.button
                key={`desktop-${index}`}
                className="hidden md:flex absolute z-20 w-14 h-14 lg:w-16 lg:h-16 bg-primary/90 hover:bg-primary text-white rounded-full transition-all duration-300 items-center justify-center group hover:brightness-110"
                style={feature.position}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                
                {/* Pulse animation for active state */}
                {selectedFeature === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Notecard Modal */}
          <AnimatePresence>
            {selectedFeature !== null && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFeature(null)}
              >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                
                {/* Notecard */}
                <motion.div
                  className="relative bg-background border rounded-lg shadow-2xl p-6 max-w-md mx-4"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 w-6 h-6 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setSelectedFeature(null)}
                  >
                    ×
                  </button>
                  
                  {/* Content */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {React.createElement(features[selectedFeature].icon, { className: "w-6 h-6 text-primary" })}
                    </div>
                    <h3 className="text-xl font-bold">{features[selectedFeature].title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {features[selectedFeature].description}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};