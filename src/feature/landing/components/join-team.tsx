"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JoinTeam() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const opportunities = [
    {
      title: "Volunteer",
      description:
        "Contribute your time and skills to support children and families.",
      icon: "🙋",
    },
    {
      title: "Donate",
      description: "Help fund education, healthcare and community programs.",
      icon: "💝",
    },
    {
      title: "Partner",
      description: "Collaborate with us to create greater social impact.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="join"
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32">
      {/* Parallax Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-05-at-9.13.05-am-AzGEo7LOeZi2gn9v.jpeg"
          alt="Join NayePankh"
          fill
          sizes=""
          className="object-cover scale-110"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-black/30 to-background" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm">
            Join Our Team
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Make A Real
            <br />
            Difference
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-white/80 leading-8">
            Become part of a movement dedicated to education, healthcare and
            community development. Every volunteer, donor and partner helps
            create lasting impact.
          </p>
        </motion.div>

        {/* Glass Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.title}
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
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-white/70 leading-7">{item.description}</p>

              <button className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="rounded-4xl border border-white/10 bg-white/10 backdrop-blur-xl p-10 md:p-16 text-center">
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Ready To Join
            <br />
            Our Mission?
          </h3>

          <p className="max-w-2xl mx-auto mt-6 text-white/80 text-lg leading-8">
            Join hundreds of volunteers working to create brighter futures and
            stronger communities across India.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button size="lg" className="group" asChild>
              <Link href="/volunteer">
                Become A Volunteer
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button size="lg" variant="secondary" asChild>
              <Link href="/donate">Donate Today</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
