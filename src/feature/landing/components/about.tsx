"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useInView } from "motion/react";
import { useRef } from "react";

export function About() {
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
    <section id="about" className="py-20 sm:py-32 bg-secondary/30">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-2">
            About Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Think Global, Act Local
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NayePankh Foundation is India&apos;s largest student-led NGO
            dedicated to creating positive change in society.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to empowering underprivileged communities
                through education, healthcare, and sustainable development. Our
                organization operates across Kanpur, Ghaziabad, and other
                cities, touching thousands of lives every year.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Founded", value: "2020" },
                { title: "Members", value: "200+" },
                { title: "Beneficiaries", value: "5000+" },
                { title: "Programs", value: "10+" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-background p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Learn Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden border border-border">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-center px-6">
              <div>
                <p className="text-5xl font-bold mb-2">✨</p>
                <p className="text-lg font-semibold">
                  Making a Difference Daily
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "🤝",
                title: "Integrity",
                desc: "Honest and transparent in all our actions",
              },
              {
                icon: "💡",
                title: "Innovation",
                desc: "Creative solutions for social challenges",
              },
              {
                icon: "❤️",
                title: "Compassion",
                desc: "Empathy towards those we serve",
              },
              {
                icon: "🌱",
                title: "Sustainability",
                desc: "Long-term positive impact",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="p-6 rounded-lg bg-background border border-border text-center hover:border-primary/50 transition-colors">
                <p className="text-4xl mb-3">{value.icon}</p>
                <h4 className="font-bold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
