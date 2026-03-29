"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { InteractiveGrid } from "@/components/interactive-grid"
import { CursorGlow } from "@/components/cursor-glow"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !logoRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(logoRef.current, {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <InteractiveGrid />
      <AnimatedNoise opacity={0.02} />

      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:block z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          KERNEL
        </span>
      </div>

      <div ref={contentRef} className="relative z-20 w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pt-20 pb-16">
        <div ref={logoRef} className="mb-6 md:mb-8 flex items-center justify-center">
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
            <div className="absolute inset-[-20%] rounded-full blur-3xl bg-accent/10" />
            <div
              className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden shadow-xl z-10"
              style={{
                mask: 'radial-gradient(circle, black 45%, transparent 72%)',
                WebkitMask: 'radial-gradient(circle, black 45%, transparent 72%)',
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kernelKALogo-ONF1rDZAzaBv1E0V2psXsXbldQINXO.jpg"
                alt="IIIT Kernel Logo"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 md:space-y-6 w-full max-w-5xl flex flex-col items-center justify-center">
          <div className="w-full scale-90 md:scale-100 origin-center">
            <SplitFlapText text="IIIT KERNEL" speed={60} />
          </div>

          <h2 className="font-[var(--font-bebas)] text-accent text-xl md:text-3xl lg:text-4xl tracking-wide font-semibold">
            The Founding Technical Club of IIIT Kota
          </h2>

          <p className="font-mono text-xs md:text-sm text-black leading-relaxed max-w-2xl px-4">
            Welcome to the official website of IIIT Kernel, the oldest and most active technical club of the Indian Institute of Information Technology Kota.
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 w-full">
            <a
              href="#what-we-do"
              className="group inline-flex items-center gap-2 md:gap-3 border border-foreground/30 px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
            >
              <ScrambleTextOnHover text="Explore What We Do" as="span" duration={0.6} />
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
            </a>
            <a
              href="#team"
              className="group inline-flex items-center gap-2 md:gap-3 border border-foreground/30 px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
            >
              <ScrambleTextOnHover text="Meet the Team" as="span" duration={0.6} />
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-20">
        <div className="border border-border/50 px-3 md:px-4 py-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground/70 hover:text-muted-foreground hover:border-border transition-all duration-200">
          IIIT Kota / 2026
        </div>
      </div>
    </section>
  )
}
