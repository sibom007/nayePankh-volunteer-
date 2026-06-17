"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=475,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-05-at-9.13.03-am-YBgL64ZLPPI03WXe.jpeg",
      title: "Community Development",
      quote:
        "NayePankh Foundation has been working for underprivileged communities through health, education, awareness and humanitarian support initiatives. Our mission is to uplift lives and create opportunities for a brighter future.",
    },
    {
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-01-31-at-9.40.45-pm-dWxpDb2pNbCaxERZ.jpeg",
      title: "Education & Welfare",
      quote:
        "NayePankh Foundation works with a vision to create a society where every child can achieve their full potential and enjoy equal opportunities regardless of their background.",
    },
    {
      image:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=475,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-05-at-9.13.03-am-YBgL64ZLPPI03WXe.jpeg",
      title: "Youth Empowerment",
      quote:
        "NayePankh Foundation promotes the culture of kindness and inspires young people to give back to society through meaningful service and community engagement.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  return (
    <section
      className="py-24 lg:py-32 bg-linear-to-b from-background to-secondary/20"
      id="impact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-[0.35em] text-sm">
            Stories & Impact
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black">
            Creating Change
            <br />
            One Life At A Time
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-muted-foreground text-lg leading-8">
            Discover how NayePankh Foundation is transforming communities
            through education, healthcare, awareness and youth empowerment
            initiatives.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
          }}
          className="relative">
          <div className="overflow-hidden rounded-[40px] border border-border bg-background shadow-2xl">
            <motion.div
              key={currentSlide}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="grid lg:grid-cols-[300px_1fr] gap-2 lg:gap-6 items-center p-6 md:p-10 lg:p-14">
              {/* Image */}
              <div className="relative flex justify-center">
                <button
                  onClick={prevSlide}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-background border shadow-lg hover:scale-105 transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="relative w-full max-w-95 aspect-[1.6/1] overflow-hidden rounded-full border-4 border-primary/10 shadow-xl">
                  <Image
                    src={testimonials[currentSlide].image}
                    alt={testimonials[currentSlide].title}
                    fill
                    sizes=""
                    className="object-cover"
                  />
                </div>

                <button
                  onClick={nextSlide}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-background border shadow-lg hover:scale-105 transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary font-medium">
                  <Quote className="h-4 w-4" />
                  {testimonials[currentSlide].title}
                </div>

                <blockquote className="mt-6 text-xl md:text-3xl lg:text-3xl font-medium leading-relaxed text-foreground">
                  {testimonials[currentSlide].quote}
                </blockquote>

                <div className="mt-8 flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="h-11 w-11 rounded-full border flex items-center justify-center hover:bg-muted transition">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="h-11 w-11 rounded-full border flex items-center justify-center hover:bg-muted transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-10 bg-primary"
                    : "w-3 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
          {[
            {
              value: "5000+",
              label: "Lives Impacted",
            },
            {
              value: "200+",
              label: "Volunteers",
            },
            {
              value: "3000+",
              label: "Children Supported",
            },
            {
              value: "10+",
              label: "Active Programs",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                y: -5,
              }}
              className="rounded-2xl border border-border bg-background p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">{item.value}</p>

              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
