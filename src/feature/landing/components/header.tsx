"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export function Header() {
  const { isSignedIn, isLoaded } = useUser();
  
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Join Us", href: "#join" },
    { label: "Contact", href: "#contact" },
    { label: "Volunteer", href: "volunteer" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>
          <Link href={"/"} className="flex items-center gap-2">
            <Image alt="logo" src={"/logo.svg"} width={40} height={40} />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-foreground">NayePankh</p>
              <p className="text-xs text-muted-foreground">Foundation</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {!isLoaded ? (
            <Spinner />
          ) : isSignedIn ? (
            <div className="gap-2 flex">
              <Button>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <Button variant={"destructive"} asChild>
                <SignOutButton />
              </Button>
            </div>
          ) : (
            <div>
              <Button>
                <Link href={"/sign-in"}> Sign In</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-border">
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              whileHover={{ x: 4 }}>
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
