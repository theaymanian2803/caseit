import { motion, AnimatePresence } from "framer-motion";
import { X, Package, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(500, "Address must be less than 500 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const { items, totalPrice, isCheckoutOpen, setIsCheckoutOpen, clearCart } =
    useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    address: "",
    phone: "",
  });

  // Generate order details for hidden field
  const orderDetails = items
    .map((item) => `${item.name} x${item.quantity} (${item.price} each)`)
    .join("\n");

  const orderSummary = `
ORDER SUMMARY
=============
${orderDetails}

TOTAL: $${totalPrice}
  `.trim();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<CheckoutFormData> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Submit to Formspree
    try {
      const response = await fetch("https://formspree.io/f/xojjeavp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          order_details: orderSummary,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        clearCart();
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
    setFormData({ name: "", address: "", phone: "" });
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              className="w-full max-w-lg glass-card p-8 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {isSubmitted ? (
                /* Success State */
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle className="w-20 h-20 text-safety-orange mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-2xl font-heading font-bold mb-2">
                    ORDER CONFIRMED!
                  </h2>
                  <p className="text-muted-foreground font-body mb-6">
                    Thank you for your purchase. We'll contact you shortly with
                    shipping details.
                  </p>
                  <motion.button
                    onClick={handleClose}
                    className="px-8 py-3 bg-primary text-primary-foreground font-heading font-bold tracking-wider rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    CONTINUE SHOPPING
                  </motion.button>
                </motion.div>
              ) : (
                /* Checkout Form */
                <>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-safety-orange" />
                    <h2 className="text-xl font-heading font-bold">CHECKOUT</h2>
                  </div>

                  {/* Order Summary */}
                  <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                    <h3 className="text-sm font-heading font-semibold text-muted-foreground mb-2">
                      ORDER SUMMARY
                    </h3>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm font-body"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-safety-orange">
                            ${item.priceNumber * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between">
                      <span className="font-heading font-bold">Total</span>
                      <span className="font-heading font-bold text-gradient-orange text-lg">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden Order Details */}
                    <input
                      type="hidden"
                      name="order_details"
                      value={orderSummary}
                    />

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-heading font-semibold mb-2"
                      >
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="John Doe"
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1 font-body">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-heading font-semibold mb-2"
                      >
                        SHIPPING ADDRESS
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input min-h-[100px] resize-none"
                        placeholder="123 Main Street, City, State, ZIP"
                        maxLength={500}
                      />
                      {errors.address && (
                        <p className="text-destructive text-sm mt-1 font-body">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-heading font-semibold mb-2"
                      >
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1 font-body">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wider rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                      whileHover={
                        !isSubmitting
                          ? {
                              scale: 1.02,
                              boxShadow: "0 0 40px -5px hsl(25, 95%, 53%)",
                            }
                          : {}
                      }
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          PROCESSING...
                        </motion.span>
                      ) : (
                        "PLACE ORDER"
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutForm;
