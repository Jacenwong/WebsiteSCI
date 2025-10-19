import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Zap, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { MeasurementOverlay } from "./MeasurementOverlay";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // WIP 3D Project - Scroll functionality commented out for later work
  // const [isSticky, setIsSticky] = useState(true);
  // const [heroTransform, setHeroTransform] = useState(0);
  // const [stickyProgress, setStickyProgress] = useState(0);
  // const [textOpacity, setTextOpacity] = useState(1);
  
  // WIP 3D Project - Scroll effect for sticky hero
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const stickyDuration = windowHeight * 20; // Hero stays sticky for 20 viewport heights (much longer scroll)
      
  //     // Debug logging
  //     if (scrollY % 100 === 0) { // Log every 100px of scroll
  //       console.log('Scroll Y:', scrollY, 'Sticky Duration:', stickyDuration, 'Progress:', (scrollY / stickyDuration * 100).toFixed(1) + '%');
  //     }
      
  //     if (scrollY < stickyDuration) {
  //       // Hero is sticky - don't move
  //       setIsSticky(true);
  //       setHeroTransform(0);
  //       // Calculate progress through sticky phase (0 to 1)
  //       const progress = scrollY / stickyDuration;
  //       setStickyProgress(progress);
        
  //       // All text fades out together at 10% progress with faster transition
  //       if (progress > 0.1) {
  //         const fadeProgress = Math.min((progress - 0.1) / 0.1, 1); // Fade from 10% to 20% (faster transition)
  //         const newOpacity = 1 - fadeProgress;
  //         setTextOpacity(newOpacity);
  //         console.log('Text fade progress:', progress, 'fadeProgress:', fadeProgress, 'textOpacity:', newOpacity);
  //       } else {
  //         setTextOpacity(1);
  //       }
  //     } else {
  //       // Hero starts scrolling away
  //       setIsSticky(false);
  //       setStickyProgress(1); // Full progress when scrolling away
  //       setTextOpacity(0); // Text is completely hidden when scrolling away
        
  //       // Smooth fade out when scroll progress hits 100%
  //       const scrollProgress = (scrollY - stickyDuration) / windowHeight;
  //       const fadeOutProgress = Math.min(scrollProgress, 1);
  //       const heroOpacity = 1 - fadeOutProgress;
  //       setHeroTransform(-scrollProgress * windowHeight);
        
  //       // Apply fade out to the entire hero section
  //       const heroElement = document.querySelector('#hero');
  //       if (heroElement) {
  //         (heroElement as HTMLElement).style.opacity = heroOpacity.toString();
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmailToClipboard = async () => {
    const email = "info@secchance.com";
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  // True 360-degree infinite carousel - Always running
  useEffect(() => {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    let animationId: number;
    let startTime: number;
    const duration = 20000; // 20 seconds for full cycle (slower, more elegant)
    // Responsive width calculation - will be updated dynamically
    const getSingleSetWidth = () => {
      if (window.innerWidth < 640) return 3 * 300; // Mobile: 3 × 300px = 900px
      if (window.innerWidth < 768) return 3 * 400; // Small: 3 × 400px = 1200px
      return 3 * 576; // Desktop: 3 × 576px = 1728px
    };
    const singleSetWidth = getSingleSetWidth();

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      // Calculate progress through the cycle (0 to 1)
      const progress = (elapsed % duration) / duration;
      
      // True infinite scroll - resets every cycle for seamless loop
      const translateX = -progress * singleSetWidth;
      
      if (carousel) {
        carousel.style.transform = `translateX(${translateX}px)`;
      }
      
      // Always continue animation - never stops
      animationId = requestAnimationFrame(animate);
    };

    // Start animation immediately
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-background isolate overflow-x-hidden transition-all duration-1000 ease-in-out"
      // WIP 3D Project - Scroll styling commented out for later work
      // style={{
      //   transform: `translateY(${heroTransform}px)`,
      //   transition: isSticky ? 'none' : 'transform 0.2s ease-out, opacity 0.6s ease-out'
      // }}
    >
             {/* Background Layers - Back layer */}
             <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-[-2]" />
             <div className="absolute inset-0 bg-sky-200/30 dark:bg-black/30 bg-sky-100/40 dark:bg-primary/10 z-[-2]" />
             <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 to-transparent dark:from-primary/20 dark:to-transparent z-[-2]" />
             
             {/* Transition gradient to next section */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-[-1]" />
      
      {/* WIP 3D Project - 3D Model - COMMENTED OUT FOR LATER WORK */}
      {/* ScrollRotate3D component moved to unused folder */}
      
      
      <div className="absolute inset-0 opacity-10 z-[-2]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      />
      <div className="absolute inset-0 z-[-2] opacity-5"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
             mixBlendMode: 'overlay'
           }}
      />
      
      
             {/* Main Content */}
             <div 
               className="relative z-[150] isolate text-center px-6 max-w-4xl flex flex-col justify-start items-center h-full pt-5 sm:pt-5 md:pt-8 lg:pt-13 xl:pt-27 pb-8"
               // WIP 3D Project - Text opacity styling commented out for later work
               // style={{ opacity: textOpacity, transition: 'opacity 0.3s ease-out' }}
             >

               {/* Headline */}
               <motion.h1
                 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight relative z-[200] flex flex-col sm:flex-row items-center justify-center py-12 mb-0 mt-16"
                 style={{ fontFamily: 'Hammersmith One, sans-serif' }}
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.4 }}
               >
                 <span style={{ color: '#006d8f' }}>Reimagining</span> 
                 <motion.span 
                   className="mt-1 sm:mt-0 sm:ml-4"
                   style={{ 
                     color: '#006d8f', 
                   }}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ 
                     opacity: 1, 
                     scale: 1
                   }}
                   transition={{ 
                     duration: 1.2, 
                     delay: 1.2,
                     ease: "easeOut"
                   }}
                 >
                   Stroke Care
                 </motion.span>
               </motion.h1>

               {/* Subtitle */}
               <motion.p
                 className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto relative z-[100] px-4 -mt-4"
                 style={{ fontFamily: 'Banshrift, sans-serif', fontWeight: 300 }}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.6 }}
               >
                 Empowering stroke survivors to reclaim their independence, one movement at a time
               </motion.p>


               {/* CTA */}
               <motion.div
                 className="flex flex-col sm:flex-row gap-4 justify-center relative z-[100] mt-6"
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.8 }}
               >
                 <Button 
                   size="lg" 
                   className="bg-gradient-primary hover:opacity-90 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 transition-all duration-300 w-full sm:w-auto"
                   onClick={() => {
                     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                   }}
                 >
                   Contact Us
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Button>
               </motion.div>
             </div>

            {/* SCIModel Continuous Revolving Carousel */}
            <motion.div
              className="w-screen -mx-6 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 relative z-40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
            >
              <div className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden">
                <div 
                  className="flex" 
                  id="carousel"
                >
                   {/* True 360-degree infinite carousel - multiple sets for seamless scrolling */}
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel1.png`}
                      alt="SCI Model 1" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel2.png`}
                      alt="SCI Model 2" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel3.png`}
                      alt="SCI Model 3" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                   {/* Second set */}
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel1.png`}
                      alt="SCI Model 1" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel2.png`}
                      alt="SCI Model 2" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel3.png`}
                      alt="SCI Model 3" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                   {/* Third set */}
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel1.png`}
                      alt="SCI Model 1" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel2.png`}
                      alt="SCI Model 2" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel3.png`}
                      alt="SCI Model 3" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                   {/* Fourth set for extra smoothness */}
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel1.png`}
                      alt="SCI Model 1" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel2.png`}
                      alt="SCI Model 2" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[576px] md:h-[576px]">
                    <img 
                      src={`${import.meta.env.BASE_URL}SCIModel3.png`}
                      alt="SCI Model 3" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                 </div>
               </div>
             </motion.div>
      
      {/* WIP 3D Project - Measurement Overlay - COMMENTED OUT FOR LATER WORK */}
      {/* <MeasurementOverlay 
        isVisible={showMeasurements} 
        onToggle={() => setShowMeasurements(!showMeasurements)} 
      /> */}
      
      {/* WIP 3D Project - Toggle Measurements Button - COMMENTED OUT FOR LATER WORK */}
      {/* <button
        onClick={() => {
          console.log('Toggle measurements clicked, current state:', showMeasurements);
          setShowMeasurements(!showMeasurements);
        }}
        className="fixed top-20 left-4 z-50 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 border-2 border-white"
        style={{ 
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        {showMeasurements ? 'Hide Grid' : 'Show Grid'}
      </button> */}

      {/* WIP 3D Project - Progress Bar - COMMENTED OUT FOR LATER WORK */}
      {/* <div className="fixed top-20 left-80 z-50 bg-black/80 text-white px-4 py-3 rounded-lg shadow-xl border-2 border-white">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Scroll Progress:</div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-100 ease-out"
              style={{ width: `${stickyProgress * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-300">
            {Math.round(stickyProgress * 100)}%
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {isSticky ? 'Hero Fixed' : 'Hero Scrolling'}
        </div>
      </div> */}
      
    </section>
  );
};
