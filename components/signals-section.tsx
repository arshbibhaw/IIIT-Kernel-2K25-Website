"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "2026.03.20",
    title: "Spring Hackathon",
    note: "Annual innovation sprint bringing together 500+ participants from across the region.",
  },
  {
    date: "2026.02.14",
    title: "Mentorship Launch",
    note: "New program connecting industry professionals with aspiring technologists.",
  },
  {
    date: "2026.01.30",
    title: "Research Grants",
    note: "Funding announced for 15 groundbreaking research projects in emerging tech.",
  },
  {
    date: "2025.12.15",
    title: "Heritage Hub",
    note: "Digital archive of institutional history now publicly accessible online.",
  },
  {
    date: "2025.11.28",
    title: "Bootcamp 2026",
    note: "Applications open for intensive 12-week program in AI, Web3, and Systems Design.",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">05 / UPDATES</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">LATEST NEWS</h2>
      </div>

      {/* Signals list */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="space-y-0 overflow-hidden pr-6 md:pr-12"
      >
        {signals.map((signal, i) => (
          <div
            key={i}
            className="group border-t border-border/30 py-12 md:py-16 px-0 cursor-pointer hover:bg-accent/[0.02] transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <p className="font-mono text-[10px] text-accent-blue uppercase tracking-[0.2em] mb-4 font-bold">{signal.date}</p>
                <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl text-foreground group-hover:text-accent transition-colors duration-200 mb-6 leading-tight">
                  {signal.title}
                </h3>
                <div className="w-16 h-1 bg-accent/60 mb-6 group-hover:w-32 transition-all duration-500" />
                <p className="max-w-3xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-muted-foreground/95 transition-colors duration-200">
                  {signal.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
