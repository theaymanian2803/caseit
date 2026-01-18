import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-heading font-bold tracking-wide">
            CASE<span className="text-gradient-orange">FORGE</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Products", "Features", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-body text-muted-foreground hover:text-safety-orange transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Cart Button */}
          <motion.button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-foreground hover:text-safety-orange transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence mode="wait">
              <motion.span 
                key={totalItems}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {totalItems}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
