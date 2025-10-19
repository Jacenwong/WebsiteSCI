import { Card } from "@/components/ui/card";
import { Users, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

export const StatsSection = () => {
  return (
    <section 
      id="stats" 
      className="min-h-screen flex items-center justify-center bg-background relative transition-all duration-1000 ease-in-out py-16"
    >
      {/* Transition gradient from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-[-1]" />
      
      {/* Subtle grid pattern - matching other sections */}
      <div className="absolute inset-0 opacity-4 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The <span style={{ color: '#afc8a0' }}>Challenge</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stroke affects millions of lives, creating significant challenges for survivors 
            and their families. Understanding the scope helps us build better solutions.
          </p>
        </motion.div>
        
        {/* Key Statistics */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-4 sm:p-5 md:p-6 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col justify-center"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(21, 128, 61, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(21, 128, 61, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-700 dark:text-green-300 mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-2 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-200">11.6M</div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Hemiparesis Patients in US</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 transition-colors duration-300 group-hover:text-foreground/80">(2025 projection)</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-4 sm:p-5 md:p-6 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col justify-center"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(21, 128, 61, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(21, 128, 61, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-700 dark:text-green-300 mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-2 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-200">71%</div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Experience Depression</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 transition-colors duration-300 group-hover:text-foreground/80">Post-treatment</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-4 sm:p-5 md:p-6 lg:p-8 text-center bg-card border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm cursor-pointer group min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col justify-center"
              style={{
                transition: 'all 0.3s ease',
                transform: 'scale(1) translateY(0)',
                backgroundColor: 'rgba(34, 197, 94, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(21, 128, 61, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(21, 128, 61, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(21, 128, 61, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
              }}
            >
              <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-700 dark:text-green-300 mx-auto mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 dark:text-green-300 mb-2 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-200">#1</div>
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground transition-colors duration-300 group-hover:text-foreground">Leading Cause</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 transition-colors duration-300 group-hover:text-foreground/80">Of disability in US</div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};
