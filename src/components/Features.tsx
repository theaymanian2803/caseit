import { motion } from "framer-motion";
import { Shield, Zap, Droplets, Fingerprint } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "MIL-STD-810G",
    description: "Military-grade drop protection tested to survive 10ft drops onto concrete.",
  },
  {
    icon: Zap,
    title: "HEAT DISSIPATION",
    description: "Engineered ventilation keeps your device cool during intensive use.",
  },
  {
    icon: Droplets,
    title: "SPLASH RESISTANT",
    description: "Sealed button covers and raised edges protect against spills.",
  },
  {
    icon: Fingerprint,
    title: "PRECISION GRIP",
    description: "Micro-textured surfaces provide non-slip handling in any condition.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            className="inline-block text-sm font-body font-medium tracking-widest text-safety-orange"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ENGINEERED EXCELLENCE
          </motion.span>
          
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            BUILT FOR <span className="text-gradient-orange">EXTREMES</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group glass-card p-8 text-center hover:border-safety-orange/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-safety-orange/10 text-safety-orange group-hover:bg-safety-orange group-hover:text-primary-foreground transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-safety-orange transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
