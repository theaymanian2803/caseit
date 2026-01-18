import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/AuroraBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <AuroraBackground />
      <motion.div 
        className="relative z-10 text-center glass-card p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-7xl font-heading font-bold text-gradient-orange">404</h1>
        <p className="mb-6 text-xl text-muted-foreground font-body">Oops! Page not found</p>
        <motion.a 
          href="/" 
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-heading font-bold tracking-wider rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RETURN HOME
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
