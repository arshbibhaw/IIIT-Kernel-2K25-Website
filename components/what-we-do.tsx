"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    title: "Alumni Mentorship",
    description: "We connect current students with IIIT Kota alumni who've walked the same corridors and now lead careers across industries. Through structured mentorship, we turn alumni experiences into student roadmaps.",
    icon: "🎓",
  },
  {
    title: "Expert Sessions",
    description: "We regularly bring in industry professionals, domain experts, and thought leaders to campus. Their insights on technology, careers, and the professional world give students the real experience.",
    icon: "🎤",
  },
  {
    title: "Workshops",
    description: "Learning by doing is at our core. We organise technical workshops that sharpen practical skills, encourage experimentation, and prepare students for the demands of the real world.",
    icon: "🛠️",
  },
  {
    title: "Career & Networking",
    description: "From internship leads to project collaborations, we actively create opportunities for students to step forward. Our community is a network — and networks open doors.",
    icon: "🤝",
  },
  {
    title: "Guidance",
    description: "We understand that college can be overwhelming. Through our Disha sessions, we offer honest, peer-to-peer guidance to help students make informed decisions both academically and professionally.",
    icon: "🧭",
  },
  {
    title: "Experiences",
    description: "From our newest launch event Prarambh to flagship events like LinkedIn Linkup and Ignite Talk Series, we keep the calendar full of experiences that educate, and inspire people.",
    icon: "🌟",
  },
]

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="what-we-do" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
            02 / Our Work
          </span>
          <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-foreground mt-4">
            What We Do
          </h2>
          <p className="font-mono text-base text-muted-foreground mt-6 max-w-2xl">
            Six pillars that define how we grow, connect, and build.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative z-10 overflow-hidden border border-border/50 p-8 bg-background/60 backdrop-blur-md hover:border-accent/60 hover:bg-accent/10 transition-all duration-300"
            >
              {/* Title */}
              <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300 leading-relaxed">
                {pillar.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
