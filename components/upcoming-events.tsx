"use client"

import { useRef, useEffect, useState } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    number: "01",
    category: "FLAGSHIP EVENT",
    titleParts: [
      { text: "LINKEDIN ", highlight: false },
      { text: "LINKUP", highlight: true },
      { text: " SERIES", highlight: false },
    ],
    subtitle: "The First Session Hosted Each Year After New Academic Session",
    description: "LinkedIn LinkUp Challenge is IIIT Kernel's flagship event designed to help first-year students kickstart their professional journey. The event focuses on building a strong LinkedIn presence, learning effective networking strategies, and understanding how to showcase skills and achievements. Through an engaging and competitive format, participants gain hands-on experience in optimizing their profiles and expanding meaningful professional connections.",
    highlights: [
      "Open alumni-student interaction",
      "Professional networking guidance",
      "Personal branding strategies",
      "Industry trends discussion",
      "Live mentorship interactions"
    ],
    images: ["/images/events/LL_DSC_7028.jpg", "/images/events/LL_DSC_7126.jpg", "/images/events/LL_DSC_7179.jpg", "/images/events/LL_DSC_7289.jpg"], // Add paths here, e.g., ["/images/events/img1.jpg", "/images/events/img2.jpg"]
    photoPlaceholders: 4,
    align: "left" as const,
  },
  {
    number: "02",
    category: "EXPERT TALK SERIES",
    titleParts: [
      { text: "THE ", highlight: false },
      { text: "IGNITE", highlight: true },
      { text: " SERIES", highlight: false },
    ],
    subtitle: "Industry Professional Talk Sessions",
    description: "This series is a professional talk platform that brings together students, industry experts, alumni, and thought leaders for engaging and insightful sessions. Through expert-led discussions, it aims to bridge the gap between academic learning and real-world application, offering participants valuable perspectives on technology, innovation, and career growth while fostering meaningful interaction and inspiration.",
    highlights: [
      "Industry realities and career growth",
      "Domain-specific expertise deep dives",
      "Startup ecosystem and emerging tech insights",
      "Leadership, innovation, and resilience",
      "Interactive Q&A and mentorship",
      "Problem-solving frameworks and career mapping",
    ],
    images: ["/images/events/IT_DSC_4242.jpg", "/images/events/IT_DSC_4311.jpg", "/images/events/IT_DSC_4858.jpg", "/images/events/IT_DSC_4842.jpg", "/images/events/IT_DSC_4848.jpg"], // Add your image paths here
    photoPlaceholders: 5,
    align: "right" as const,
  },
  {
    number: "03",
    category: "NEW INITIATIVE",
    titleParts: [
      { text: "PRARAMBH", highlight: true },
    ],
    subtitle: "Latest Initiative by IIIT Kernel",
    description: '"Prarambh Series" is the latest initiative designed to guide students through the journey of building a strong career in technical domains. Through a series of interactive sessions, the event focuses on simplifying career paths, providing clarity on skill development, and preparing students for internships and placements. With a focus on practical learning and peer guidance, Prarambh Series aims to create a supportive environment where students can learn, grow, and make informed career decisions.',
    highlights: ["Official launch of IIIT Kernel", "Vision and mission presentation", "Community celebration and networking"],
    images: ["/images/events/PR_0.jpeg", "/images/events/PR_1.jpeg", "/images/events/PR_2.jpeg"],
    photoPlaceholders: 3,
    align: "left" as const,
  },
  {
    number: "04",
    category: "GUIDANCE SESSION",
    titleParts: [
      { text: "DISHA", highlight: true },
    ],
    subtitle: "Exclusive Event of Tech Summit",
    description: "Disha is a thoughtfully curated guidance session aimed at helping students find clarity, direction, and confidence in their academic and career journeys. The event is designed to bridge the gap between confusion and clarity by offering structured insights, real-world perspectives, and actionable advice.\n\nThis session is specially conducted as a part of the Tech Summit, making it an exclusive opportunity for attendees to gain valuable guidance alongside a broader technical experience.",
    highlights: ["Academic and career guidance", "Senior-to-junior mentorship", "Goal-setting and planning"],
    images: ["/images/events/DS_IMG-20260329-WA0013.jpg.jpeg", "/images/events/DS_IMG-20260329-WA0018.jpg.jpeg", "/images/events/DS_IMG-20260329-WA0012.jpg.jpeg", "/images/events/DS_IMG-20260329-WA0014.jpg.jpeg", "/images/events/DS_IMG-20260329-WA0017.jpg.jpeg"], // Add your image paths here
    photoPlaceholders: 6,
    align: "right" as const,
  },
]

export function PastEventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const detailPanelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (enlargedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [enlargedImage])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !eventsRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const articles = eventsRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = events[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate expanded panel
  useEffect(() => {
    detailPanelRefs.current.forEach((panel, index) => {
      if (!panel) return
      if (expandedIndex === index) {
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0, y: 30 },
          { height: "auto", opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        )
      } else {
        gsap.to(panel, { height: 0, opacity: 0, y: 10, duration: 0.3, ease: "power2.in" })
      }
    })
  }, [expandedIndex])

  return (
    <section ref={sectionRef} id="events" className="relative py-32 bg-[#0a0a0a] text-[#fafafa]">
      {/* Dark grid overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div ref={headerRef} className="mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
            03 / OUR JOURNEY
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            EVENTS THAT DEFINED US
          </h2>
          <p className="font-mono text-sm text-[#888] mt-6 max-w-2xl">
            Every event is a chapter. Here's our story so far. Click any event to explore details.
          </p>
        </div>

        {/* Staggered events */}
        <div ref={eventsRef} className="space-y-28 md:space-y-40">
          {events.map((event, index) => (
            <article
              key={index}
              className={`group flex flex-col pb-12 md:pb-16 border-b border-[#222] hover:border-accent/50 transition-colors duration-300 cursor-pointer ${event.align === "right" ? "items-end text-right" : "items-start text-left"
                }`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Annotation label */}
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-2">
                {event.number} / {event.category}
              </span>

              {/* Subtitle */}
              <p className="font-mono text-xs text-[#666] mb-6 italic tracking-wide">
                {event.subtitle}
              </p>

              {/* Large title with highlighted text */}
              <h3 className="font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.95] group-hover:text-accent transition-colors duration-300">
                {event.titleParts.map((part, i) =>
                  part.highlight ? (
                    <HighlightText key={i} parallaxSpeed={0.6}>
                      {part.text}
                    </HighlightText>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </h3>

              {/* Brief description preview */}
              <p className="mt-8 md:mt-10 max-w-3xl font-mono text-sm md:text-base text-[#888] leading-relaxed group-hover:text-[#aaa] transition-colors duration-300">
                {event.description.slice(0, 180)}...
              </p>

              {/* Expand prompt */}
              <div className={`mt-6 flex items-center gap-3 ${event.align === "right" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full border border-[#333] group-hover:border-accent flex items-center justify-center group-hover:bg-accent/10 transition-all duration-300 ${expandedIndex === index ? "bg-accent/20 border-accent" : ""} ${expandedIndex === index ? (event.align === "right" ? "-rotate-90" : "rotate-90") : ""}`}>
                  <span className="text-[#666] group-hover:text-accent text-sm">
                    {event.align === "right" ? "←" : "→"}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#555] group-hover:text-accent transition-colors duration-200">
                  {expandedIndex === index ? "Close details" : "View details"}
                </span>
              </div>

              {/* Decorative accent line */}
              <div className={`mt-8 h-[3px] bg-gradient-to-r ${index % 2 === 0
                ? "from-accent to-transparent"
                : "from-transparent to-accent"
                } w-20 md:w-32 group-hover:w-40 transition-all duration-500 ${event.align === "right" ? "mr-0" : "ml-0"}`} />

              {/* === EXPANDABLE DETAIL PANEL (Amazon-style slide) === */}
              <div
                ref={(el) => { detailPanelRefs.current[index] = el }}
                className="w-full overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className={`mt-10 bg-[#111] border border-[#222] p-8 md:p-12 ${event.align === "right" ? "text-left" : "text-left"}`}>
                  {/* Full description */}
                  <p className="font-mono text-sm md:text-base text-[#999] leading-relaxed mb-8">
                    {event.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mb-8">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-4">
                      Key Highlights
                    </h4>
                    <ul className="space-y-3">
                      {event.highlights.map((h, i) => (
                        <li key={i} className="font-mono text-sm text-[#bbb] flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Photo Placeholders */}
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-4">
                      📸 Event Photos
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {event.images && event.images.length > 0 ? (
                        event.images.map((imgSrc, i) => (
                          <div
                            key={i}
                            onClick={() => setEnlargedImage(imgSrc)}
                            className="shrink-0 w-32 h-24 md:w-40 md:h-28 bg-[#1a1a1a] border border-[#333] rounded-sm overflow-hidden hover:border-accent/50 transition-colors duration-200 cursor-zoom-in"
                          >
                            <img src={imgSrc} alt={`Event photo ${i + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
                          </div>
                        ))
                      ) : (
                        Array.from({ length: event.photoPlaceholders }).map((_, i) => (
                          <div
                            key={i}
                            className="shrink-0 w-32 h-24 md:w-40 md:h-28 bg-[#1a1a1a] border border-[#333] rounded-sm flex items-center justify-center hover:border-accent/50 transition-colors duration-200"
                          >
                            <span className="font-mono text-[10px] text-[#444]">Photo {i + 1}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImage(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
            style={{ cursor: "zoom-out" }}
          >
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={enlargedImage}
              alt="Enlarged event photo"
              className="w-full h-full max-w-5xl max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
