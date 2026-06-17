"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { isSignedIn, isLoaded } = useUser();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Join Us", href: "#join" },
    { label: "Contact", href: "#contact" },
    { label: "Volunteer", href: "/volunteer" },
  ];

  const compactNavbar = !isHomePage || scrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        height: compactNavbar ? 72 : 110,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        compactNavbar
          ? "bg-background/80 backdrop-blur-xl  shadow-lg"
          : "bg-transparent"
      }`}>
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            animate={{
              width: compactNavbar ? 50 : 85,
              height: compactNavbar ? 50 : 85,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="relative">
            <Image
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png"
              alt="NayePankh"
              fill
              sizes=""
              className="object-contain"
            />
          </motion.div>

          <motion.div
            animate={{
              opacity: compactNavbar ? 1 : 0,
              x: compactNavbar ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
            className="hidden sm:block">
            <p
              className={`font-bold text-lg transition-colors ${
                compactNavbar ? "text-foreground" : "text-white"
              }`}>
              NayePankh
            </p>

            <p
              className={`text-xs transition-colors ${
                compactNavbar ? "text-muted-foreground" : "text-white/70"
              }`}>
              Foundation
            </p>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors ${
                compactNavbar
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-primary"
              }`}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {!isLoaded ? (
              <Spinner />
            ) : isSignedIn ? (
              <>
                <Button
                  size="sm"
                  variant={compactNavbar ? "default" : "secondary"}
                  asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>

                <SignOutButton>
                  <Button size="sm" variant="destructive">
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <Button
                size="sm"
                variant={compactNavbar ? "default" : "secondary"}
                asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden transition-colors ${
              compactNavbar ? "text-foreground" : "text-white"
            }`}>
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border">
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors">
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-border flex flex-col gap-2">
            {!isLoaded ? (
              <Spinner />
            ) : isSignedIn ? (
              <>
                <Button asChild>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>

                <SignOutButton>
                  <Button variant="destructive">Logout</Button>
                </SignOutButton>
              </>
            ) : (
              <Button asChild>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
