"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "what-we-do", label: "What We Do" },
  { id: "events", label: "Events" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-40 w-10 md:w-14 hidden md:flex flex-col items-center justify-center gap-4 py-4">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center"
          title={section.label}
        >
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              activeSection === section.id
                ? "bg-accent scale-125"
                : "bg-muted-foreground/30 hover:bg-accent/60 hover:scale-110"
            )}
          />
          <span className="absolute left-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
