"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Rss, Play, Send } from "lucide-react";

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-card border-t border-border ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                NP
              </div>
              <div>
                <p className="font-bold text-foreground">NayePankh</p>
                <p className="text-xs text-muted-foreground">Foundation</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Making a difference in communities across India through education,
              healthcare, and sustainable development.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Join Us", "Donate"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {[
                "Education",
                "Healthcare",
                "Community Support",
                "Disaster Relief",
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@nayepankh.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                contact@nayepankh.com
              </a>
              <a
                href="tel:+918318500748"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                +91 8318 500 748
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Kanpur, Ghaziabad, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} NayePankh Foundation. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Rss, label: "Instagram", href: "#" },
              { icon: Send, label: "LinkedIn", href: "#" },
              { icon: Play, label: "YouTube", href: "#" },
              { icon: Send, label: "Twitter", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.1, color: "var(--primary)" }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
