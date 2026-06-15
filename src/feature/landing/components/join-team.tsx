"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function JoinTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="join" className="py-20 sm:py-32">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-2">
            Join Our Team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Make a Real Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you&apos;re passionate about education, healthcare, or
            community support, there&apos;s a place for you in our organization.
            Join us and be part of an organization making real impact, one
            person at a time.
          </p>
        </motion.div>

        {/* Opportunities Grid */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Volunteer",
              description:
                "Contribute your time and energy to help those in need.",
              icon: "🙋",
            },
            {
              title: "Donate",
              description:
                "Your financial support creates lasting change in communities.",
              icon: "💝",
            },
            {
              title: "Partner With Us",
              description: "Collaborate with us to amplify our social impact.",
              icon: "🤝",
            },
          ].map((opportunity, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: "var(--primary)" }}
              className="p-8 rounded-xl border border-border bg-background hover:shadow-lg transition-all cursor-pointer">
              <p className="text-5xl mb-4">{opportunity.icon}</p>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {opportunity.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {opportunity.description}
              </p>
              <button className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-12 sm:p-16 border border-primary/20 overflow-hidden">
          {/* Background Animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl"
          />

          <div className="relative text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Join Our Mission?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of volunteers making a positive impact in
              communities across India.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 group">
                Join Us Today
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
