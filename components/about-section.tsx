"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: 15, suffix: "+", label: "Events Hosted" },
    { value: 7, suffix: "", label: "Active Domains" },
    { value: 40, suffix: "+", label: "Club Members" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!ref.current) return

        let intervalId: ReturnType<typeof setInterval> | null = null

        const runAnimation = () => {
            setCount(0)
            const duration = 1500
            const startTime = Date.now()

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setCount(Math.floor(eased * value))
                if (progress < 1) requestAnimationFrame(animate)
            }
            animate()
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    runAnimation()
                    if (!intervalId) {
                        intervalId = setInterval(runAnimation, 5000)
                    }
                } else {
                    if (intervalId) {
                        clearInterval(intervalId)
                        intervalId = null
                    }
                }
            },
            { threshold: 0.5 },
        )

        observer.observe(ref.current)
        return () => {
            observer.disconnect()
            if (intervalId) clearInterval(intervalId)
        }
    }, [value])

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    )
}

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            if (headerRef.current) {
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
            }

            if (contentRef.current) {
                const paragraphs = contentRef.current.querySelectorAll("p")
                gsap.from(paragraphs, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                })
            }

            if (statsRef.current) {
                const statItems = statsRef.current.querySelectorAll(":scope > div")
                gsap.from(statItems, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div ref={headerRef} className="mb-16">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                        01 / About Us
                    </span>
                    <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-foreground mt-4">
                        Connecting Pasts, Building Futures!
                    </h2>
                </div>

                {/* Content */}
                <div ref={contentRef} className="max-w-4xl space-y-8 bg-[#f5f5fa] p-8 border border-border/20">
                    <p className="font-mono text-sm md:text-base text-foreground/85 leading-relaxed">
                        <strong>IIIT Kernel is the first official technical club of the Indian Institute of Information Technology, Kota. Our mission is to cultivate a thriving alumni network and bridge the gap between alumni and current students through engaging talks and informative events.</strong>
                    </p>
                    <p className="font-mono text-sm md:text-base text-foreground/85 leading-relaxed">
                        By strengthening ties with our distinguished alumni network, we create pathways for mentorship, guidance, and real-world exposure. Whether it's a candid conversation with an industry professional, a hands-on workshop, or a career guidance session, everything we do is driven by the belief that shared knowledge is the most powerful tool a student can have.
                    </p>
                    <p className="font-mono text-sm md:text-base text-foreground/85 leading-relaxed">
                        At Kernel, you don't just attend events. You become part of a living, breathing community that grows with you through internships, opportunities, collaborations, and friendships that last beyond college.
                    </p>
                </div>

                {/* Stat Counters */}
                <div className="mt-20 pt-12 border-t border-border/30">
                    <div ref={statsRef} className="bg-background/60 backdrop-blur-md border border-border/50 p-8 md:p-12 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="font-[var(--font-bebas)] text-5xl md:text-6xl text-accent mb-2">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
