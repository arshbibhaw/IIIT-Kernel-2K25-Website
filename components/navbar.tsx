"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Instagram, Linkedin } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "what-we-do", label: "What We Do" },
    { id: "events", label: "Events" },
    { id: "team", label: "Team" },
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav
        className={cn(
          "pointer-events-auto transition-all duration-500 flex items-center justify-between rounded-full",
          scrolled
            ? "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.05)] px-6 py-2 w-full md:w-[70%] max-w-4xl"
            : "bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 w-full md:w-[85%] max-w-5xl"
        )}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30 group-hover:border-accent/60 transition-all duration-300 shadow-sm">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kernelKALogo-ONF1rDZAzaBv1E0V2psXsXbldQINXO.jpg"
              alt="Kernel"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="flex font-mono text-[12px] font-semibold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors duration-200">
            KERNEL
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA + Social Icons */}
        <div className="shrink-0 flex items-center gap-3">
          <a
            href="https://www.instagram.com/kernel.iiitkota"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/iiit-kernel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex font-mono text-[12px] font-semibold uppercase tracking-widest text-foreground border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-full"
          >
            Contact Us
          </a>
        </div>
      </nav>
    </div>
  )
}
