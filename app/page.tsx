import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WhatWeDoSection } from "@/components/what-we-do"
import { PastEventsSection } from "@/components/upcoming-events"
import { TeamSection } from "@/components/team-section"
import { ColophonSection } from "@/components/colophon-section"
import { Navbar } from "@/components/navbar"
import { SideNav } from "@/components/side-nav"
import { CursorGlow } from "@/components/cursor-glow"

export default function Page() {
  return (
    <main className="relative w-full">
      <CursorGlow />
      <Navbar />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative">
        <HeroSection />
        <AboutSection />
        <WhatWeDoSection />
        <PastEventsSection />
        <TeamSection />
        <ColophonSection />
      </div>
    </main>
  )
}