"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FiInstagram, FiFacebook, FiYoutube, FiLinkedin } from "react-icons/fi";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <p className="text-primary uppercase tracking-[0.35em] text-sm font-semibold">
              Contact Us
            </p>

            <h2 className="mt-4 text-5xl md:text-6xl font-black leading-none">
              Get in Touch
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-8">
              Join us in creating positive change through education, healthcare,
              community support and youth empowerment initiatives.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:contact@nayepankh.com"
                className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                <Mail className="size-5" />
                contact@nayepankh.com
              </a>

              <a
                href="tel:+918318500748"
                className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                <Phone className="size-5" />
                +91 8318500748
              </a>

              <div className="flex items-center gap-3 text-lg text-muted-foreground">
                <MapPin className="size-5" />
                Kanpur, Uttar Pradesh, India
              </div>
            </div>

            {/* Social */}
            <div className="mt-10">
              <p className="uppercase tracking-[0.35em] text-sm font-semibold mb-5">
                Follow Us
              </p>

              <div className="flex gap-2 mb-3">
                {[FiInstagram, FiLinkedin, FiYoutube, FiFacebook].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{
                        y: -3,
                      }}
                      className="h-11 w-11 rounded-xl border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                      <Icon className="size-5" />
                    </motion.a>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-3">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-5">Quick Links</h3>

              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-muted-foreground hover:text-primary">
                  Home
                </Link>

                <Link
                  href="#about"
                  className="block text-muted-foreground hover:text-primary">
                  About Us
                </Link>

                <Link
                  href="/volunteer"
                  className="block text-muted-foreground hover:text-primary">
                  Volunteer
                </Link>

                <Link
                  href="#impact"
                  className="block text-muted-foreground hover:text-primary">
                  Impact Stories
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-5">Information</h3>

              <div className="space-y-3">
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>

                <Link
                  href="/privacy-policy"
                  className="block text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>

                <Link
                  href="/refund-policy"
                  className="block text-muted-foreground hover:text-primary">
                  Refund Policy
                </Link>

                <Link
                  href="/certificates"
                  className="block text-muted-foreground hover:text-primary">
                  NGO Certificates
                </Link>
              </div>
            </div>

            {/* NGO Info */}
            <div className="sm:col-span-2">
              <div className="rounded-2xl border bg-muted/30 p-6">
                <h4 className="font-bold mb-3">NayePankh Foundation</h4>

                <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">Registration</p>
                    <p>80G Certified</p>
                  </div>

                  <div>
                    <p className="font-medium text-foreground">Tax Benefits</p>
                    <p>12A Registered</p>
                  </div>

                  <div>
                    <p className="font-medium text-foreground">Community</p>
                    <p>200+ Active Volunteers</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className=" pt-5 border-t flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} NayePankh Foundation. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Made with dedication for social impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
