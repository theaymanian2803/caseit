import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import caseGreyPerforated from "@/assets/case-grey-perforated.jpeg";
import caseGreyAccent from "@/assets/case-grey-accent.jpeg";
import caseOrange from "@/assets/case-orange.jpeg";

const products = [
  {
    id: 1,
    image: caseGreyPerforated,
    name: "APEX MATRIX",
    price: "$79",
    description: "Perforated heat-dissipating design with precision-cut ventilation dots.",
    variant: "grey-perforated" as const,
  },
  {
    id: 2,
    image: caseGreyAccent,
    name: "VECTOR PRO",
    price: "$89",
    description: "Angular reinforcement lines channel impact away from critical zones.",
    variant: "grey-accent" as const,
  },
  {
    id: 3,
    image: caseOrange,
    name: "BLAZE EDITION",
    price: "$99",
    description: "Bold safety orange with micro-textured grip zones for ultimate hold.",
    variant: "orange" as const,
  },
];

const Products = () => {
  return (
    <section id="products" className="relative py-32 px-6">
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
            THE COLLECTION
          </motion.span>
          
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CHOOSE YOUR <span className="text-gradient-orange">ARMOR</span>
          </motion.h2>
          
          <motion.p
            className="max-w-xl mx-auto text-muted-foreground font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Each case is precision-engineered for iPhone 15 Pro Max. 
            Military-grade drop protection meets industrial design.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
