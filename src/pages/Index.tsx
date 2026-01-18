import AuroraBackground from "@/components/AuroraBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutForm from "@/components/CheckoutForm";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <AuroraBackground />
        <Header />
        <main>
          <Hero />
          <Products />
          <Features />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutForm />
      </div>
    </CartProvider>
  );
};

export default Index;
