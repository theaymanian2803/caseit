import { motion } from "framer-motion";

const AuroraBackground = () => {
  return (
    <div className="aurora-bg">
      <motion.div
        className="aurora-blob aurora-blob-1"
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -30, 0],
          scale: [1, 1.15, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="aurora-blob aurora-blob-2"
        animate={{
          x: [0, -60, 50, -40, 0],
          y: [0, 50, -40, 60, 0],
          scale: [1, 0.95, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="aurora-blob aurora-blob-3"
        animate={{
          x: [0, 40, -60, 30, 0],
          y: [0, -40, 30, -50, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
};

export default AuroraBackground;
