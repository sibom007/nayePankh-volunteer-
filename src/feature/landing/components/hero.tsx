"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YKbL494Mv8Ip3qgy/whatsapp-image-2023-01-31-at-9.40.45-pm-dWxpDb2pNbCaxERZ.jpeg"
          alt=""
          className="w-full h-full object-cover"
          fill
          sizes=""
          priority
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl">
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-black leading-none mt-32">
            Bring a<span className="block text-primary">Smile</span>
            To Every Child
          </h1>

          <p className="mt-8 text-xl text-white/80 max-w-2xl">
            Empowering underprivileged communities through education, healthcare
            and youth-led social impact.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button size="lg" className="h-14 px-8 text-base">
              Donate Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button size="lg" variant="secondary" asChild className="h-14 px-8">
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-10 mt-20 max-w-2xl">
            <div>
              <h3 className="text-4xl font-bold text-white">5000+</h3>
              <p className="text-white/70 mt-2">Lives Impacted</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">200+</h3>
              <p className="text-white/70 mt-2">Volunteers</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">3+</h3>
              <p className="text-white/70 mt-2">Cities</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background/70 via-background/20 to-transparent" />
    </section>
  );
}
