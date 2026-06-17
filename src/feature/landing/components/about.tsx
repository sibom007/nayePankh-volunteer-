"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function About() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const stats = [
    {
      value: "5000+",
      label: "Lives Impacted",
    },
    {
      value: "200+",
      label: "Volunteers",
    },
    {
      value: "10+",
      label: "Programs",
    },
    {
      value: "3+",
      label: "Cities",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-linear-to-b from-background to-secondary/20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{ duration: 0.7 }}
            className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1045,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-02-05-at-9.13.03-am-YBgL64ZLPPI03WXe.jpeg"
                alt="NayePankh Foundation"
                width={900}
                height={1200}
                sizes=""
                className="w-full h-125 lg:h-195 object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
            </div>

            {/* Floating NGO Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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
                delay: 0.3,
              }}
              className="absolute -bottom-5 right-5 bg-background/90 backdrop-blur-xl border border-border rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-2xl font-bold text-primary">80G & 12A</p>

              <p className="text-xs text-muted-foreground">Registered NGO</p>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{ duration: 0.7 }}
            className="max-w-xl">
            <p className="text-primary uppercase tracking-[0.35em] font-semibold text-xs">
              About Us
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05]">
              Think Global,
              <br />
              Act Local.
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground text-base leading-7">
              <p>
                NayePankh Foundation is a student-led non-governmental
                organization dedicated to empowering underprivileged communities
                through education, healthcare, social welfare and youth
                development initiatives.
              </p>

              <p>
                Our mission is to create sustainable change by connecting
                passionate volunteers with meaningful opportunities to serve
                society and uplift those who need support the most.
              </p>

              <p>
                Together, we believe that even the smallest act of kindness can
                create a lasting impact and help build a better future for
                everyone.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-xl border border-border bg-background/70 backdrop-blur p-4">
                  <p className="text-2xl font-bold text-primary">
                    {item.value}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild className="group">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/certificates">Our Certificates</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
