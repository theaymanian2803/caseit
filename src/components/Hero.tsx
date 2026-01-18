import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 text-sm font-body font-medium tracking-widest text-safety-orange border border-safety-orange/30 rounded-full bg-safety-orange/5">
            ENGINEERED FOR THE BOLD
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="text-foreground">INDUSTRIAL</span>
          <br />
          <span className="text-gradient-orange">PROTECTION</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground font-body leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Premium iPhone cases forged from aerospace-grade materials. 
          Maximum protection meets uncompromising style.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.a
            href="#products"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wider rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">EXPLORE COLLECTION</span>
            <motion.div
              className="absolute inset-0 bg-safety-orange-glow"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="#features"
            className="px-8 py-4 text-foreground font-heading font-semibold text-lg tracking-wider border border-slate-light rounded-lg hover:border-safety-orange/50 hover:text-safety-orange transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            LEARN MORE
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-body tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-safety-orange/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-safety-orange/30 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </section>
  );
};

export default Hero;
