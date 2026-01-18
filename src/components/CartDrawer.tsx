import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    setIsCheckoutOpen,
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-safety-orange" />
                <h2 className="text-xl font-heading font-bold">YOUR CART</h2>
              </div>
              <motion.button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-body">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground/60 font-body mt-1">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="glass-card p-4 flex gap-4"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-safety-orange font-heading font-bold mt-1">
                        {item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <motion.button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                        <span className="w-8 text-center font-body text-sm">
                          {item.quantity}
                        </span>
                        <motion.button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-body">Total</span>
                  <span className="text-2xl font-heading font-bold text-gradient-orange">
                    ${totalPrice}
                  </span>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wider rounded-lg"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 40px -5px hsl(25, 95%, 53%)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  CHECKOUT
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
