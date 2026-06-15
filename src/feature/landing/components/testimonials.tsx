"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote:
        "NayePankh Foundation has truly made a difference in our community. Their dedication is remarkable.",
      author: "Prashant Shukla",
      title: "Founder & President, NayePankh Foundation",
      emoji: "🌟",
    },
    {
      quote:
        "The programs have transformed education in our neighborhood. Thank you for believing in us.",
      author: "Rajesh Kumar",
      title: "Community Leader",
      emoji: "💚",
    },
    {
      quote:
        "Working with this organization has been the most fulfilling experience of my life.",
      author: "Akshita Singh",
      title: "Volunteer",
      emoji: "✨",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

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
    <section className="py-20 sm:py-32 bg-secondary/30">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-2">
            Stories & Impact
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Hear From Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people whose lives have been transformed by
            our initiatives.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div variants={itemVariants} className="relative">
          <div className="relative h-auto">
            <div className="overflow-hidden">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 sm:p-12 rounded-2xl bg-background border border-border">
                <div className="flex flex-col items-center text-center space-y-4">
                  <p className="text-5xl">{testimonials[currentSlide].emoji}</p>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    &quot;{testimonials[currentSlide].quote}&quot;
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-bold text-foreground">
                      {testimonials[currentSlide].author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentSlide].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="p-2 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentSlide ? "bg-primary" : "bg-border"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="p-2 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Donations Received", value: "₹50L+" },
              { label: "Hours Volunteered", value: "10K+" },
              { label: "Children Educated", value: "3000+" },
              { label: "Families Supported", value: "1000+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg bg-background border border-border text-center">
                <p className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
