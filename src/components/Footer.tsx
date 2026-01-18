import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-heading font-bold">
              CASE<span className="text-gradient-orange">FORGE</span>
            </span>
          </motion.div>

          {/* Links */}
          <motion.nav
            className="flex items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {["Products", "Features", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-body text-muted-foreground hover:text-safety-orange transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            className="text-sm text-muted-foreground font-body"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © 2026 CaseForge. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
