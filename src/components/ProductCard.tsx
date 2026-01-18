import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  variant: "orange" | "grey-perforated" | "grey-accent";
}

const ProductCard = ({ id, image, name, price, description, variant }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const glowClass = variant === "orange" ? "glow-orange" : "glow-grey-orange";
  const patternClass = variant === "grey-perforated" ? "pattern-dots" : "pattern-mesh";

  // Extract number from price string
  const priceNumber = parseInt(price.replace(/[^0-9]/g, ""), 10);

  const handleAddToCart = () => {
    addToCart({ id, image, name, price, priceNumber });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleViewCart = () => {
    setIsCartOpen(true);
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card Container */}
      <motion.div
        className={`relative glass-card overflow-hidden transition-all duration-500 ${isHovered ? glowClass : ""}`}
        whileHover={{ 
          scale: 1.03,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Pattern Overlay - reveals on hover */}
        <motion.div
          className={`absolute inset-0 ${patternClass} pointer-events-none z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            animate={{ 
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 25 
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-20 p-6 space-y-3">
          <motion.h3 
            className="text-xl font-heading font-bold tracking-wide"
            animate={{ 
              color: isHovered ? "hsl(25, 95%, 53%)" : "hsl(0, 0%, 95%)" 
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          
          <p className="text-muted-foreground text-sm font-body leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-heading font-bold text-gradient-orange">
              {price}
            </span>
            
            <motion.button
              onClick={justAdded ? handleViewCart : handleAddToCart}
              className={`px-5 py-2 font-heading font-semibold text-sm tracking-wider rounded-md flex items-center gap-2 transition-colors ${
                justAdded 
                  ? "bg-green-600 text-white" 
                  : "bg-primary text-primary-foreground"
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: justAdded 
                  ? "0 0 30px -5px hsl(142, 76%, 36%)"
                  : "0 0 30px -5px hsl(25, 95%, 53%)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  ADDED!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  ADD TO CART
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            border: "1px solid transparent",
            background: "linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, hsl(25 95% 53% / 0.5), transparent 50%, hsl(25 95% 53% / 0.3)) border-box",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
