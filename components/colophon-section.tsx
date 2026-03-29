"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { Instagram, Linkedin } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"

gsap.registerPlugin(ScrollTrigger)

const CONTACT_PLACEHOLDERS = [
  ["Enter your Name", "Full Name", "College Student", "Industry Professional"],
  ["Enter your Email", "username@gmail.com", "collegeid@iiitkota.ac.in", "department@company.com"],
  ["Enter your Message", "I would like to discuss...", "I want to join Kernel...", "We want to collaborate..."]
];

function useSynchronizedTypewriters(arrayOfTextArrays: string[][]) {
  const [placeholders, setPlaceholders] = useState<string[]>(arrayOfTextArrays.map(() => ""));
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWords = arrayOfTextArrays.map(arr => arr[wordIndex % arr.length]);
    const maxLen = Math.max(...currentWords.map(w => w.length));
    const typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === maxLen) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setPlaceholders(
        currentWords.map(word => word.substring(0, charIndex + (isDeleting ? -1 : 1)))
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, arrayOfTextArrays]);

  return placeholders;
}

export function ColophonSection() {
  const [namePlaceholder, emailPlaceholder, messagePlaceholder] = useSynchronizedTypewriters(CONTACT_PLACEHOLDERS);

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
      if (formRef.current) {
        gsap.from(formRef.current, {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
      if (socialRef.current) {
        gsap.from(socialRef.current, {
          y: 30, opacity: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: socialRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (formRef.current) formRef.current.reset()
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative">
      {/* Social Media Section */}
      <div ref={socialRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-accent/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">05 / Find Us</span>
            <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-foreground mt-4">
              Follow Our Journey
            </h2>
            <p className="font-mono text-base text-muted-foreground mt-6 max-w-2xl">
              Stay updated with our latest events, sessions, and announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram */}
            <div className="group relative z-10 border border-border/50 p-8 bg-background/60 backdrop-blur-md hover:border-accent/60 hover:bg-accent/10 transition-all duration-300">
              <div className="mb-6"><Instagram className="w-10 h-10 text-foreground group-hover:text-accent transition-colors duration-300" /></div>
              <h3 className="font-[var(--font-bebas)] text-2xl text-foreground mb-2">Instagram</h3>
              <p className="font-mono text-xs text-accent font-bold tracking-widest mb-4">@kernel.iiitkota</p>
              <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
                Follow us on Instagram for event highlights, behind-the-scenes moments, and announcements all at one place.
              </p>
              <a
                href="https://www.instagram.com/kernel.iiitkota"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 md:gap-3 border border-foreground/30 px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                <ScrambleTextOnHover text="Follow on Instagram" as="span" duration={0.6} />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
              </a>
            </div>

            {/* LinkedIn */}
            <div className="group relative z-10 border border-border/50 p-8 bg-background/60 backdrop-blur-md hover:border-accent/60 hover:bg-accent/10 transition-all duration-300">
              <div className="mb-6"><Linkedin className="w-10 h-10 text-foreground group-hover:text-accent transition-colors duration-300" /></div>
              <h3 className="font-[var(--font-bebas)] text-2xl text-foreground mb-2">LinkedIn</h3>
              <p className="font-mono text-xs text-accent font-bold tracking-widest mb-4">IIIT Kernel</p>
              <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
                Connect with us on LinkedIn for updates, alumni features, talk session recaps, and career opportunities.
              </p>
              <a
                href="https://www.linkedin.com/company/iiit-kernel"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 md:gap-3 border border-foreground/30 px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                <ScrambleTextOnHover text="Connect on LinkedIn" as="span" duration={0.6} />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">06 / Get in Touch</span>
            <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-foreground mt-4">
              Connect with Kernel
            </h2>
            <p className="font-mono text-base text-muted-foreground mt-6 max-w-2xl">
              Have a question, a collaboration idea, or just want to know more about us? We're always happy to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 border border-border/50 p-8 md:p-12 bg-background/60 backdrop-blur-md space-y-6">
              <div>
                <label className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground mb-2 block"><strong>Name</strong></label>
                <input
                  type="text"
                  placeholder={namePlaceholder}
                  className="w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm text-black placeholder:text-black focus:border-accent focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground mb-2 block"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder={emailPlaceholder}
                  className="w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm text-black placeholder:text-black focus:border-accent focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground mb-2 block"><strong>Message</strong></label>
                <textarea
                  placeholder={messagePlaceholder}
                  rows={5}
                  className="w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm text-black placeholder:text-black focus:border-accent focus:outline-none transition-colors duration-150 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 md:gap-3 border border-foreground/30 px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                <ScrambleTextOnHover text="Send Message" as="span" duration={0.6} />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
              </button>

              {formSubmitted && (
                <p className="font-mono text-sm text-black font-italic mt-4">
                  🎉 Your message is on its way! We'll get back to you soon. — The Kernel Team
                </p>
              )}
            </form>

            {/* Contact Info */}
            <div className="relative z-10 border border-border/50 p-8 md:p-12 bg-background/60 backdrop-blur-md space-y-8 h-fit">
              <div>
                <h4 className="font-mono text-[12px] uppercase tracking-widest text-accent font-bold mb-4"><strong>Address</strong></h4>
                <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                  📍 Indian Institute of Information Technology Kota, Permanent Campus, RIICO Industrial Area, Kuber Extension, Ranpur, Kota, Rajasthan, India<br />
                  Pincode — 325003
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[12px] uppercase tracking-widest text-accent font-bold mb-4"><strong>Email</strong></h4>
                <a href="mailto:kernel@iiitkota.ac.in" className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors duration-200">
                  📧 kernel@iiitkota.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="bg-black text-white border-t border-white/10 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kernelKALogo-ONF1rDZAzaBv1E0V2psXsXbldQINXO.jpg"
                  alt="Kernel"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-[var(--font-bebas)] text-lg tracking-widest">IIIT KERNEL</p>
                <p className="font-mono text-[10px] text-accent uppercase tracking-wider">
                  The Official Technical & Alumni Connect Club of IIIT Kota
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="#about" className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-200">About</a>
              <a href="#what-we-do" className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-200">What We Do</a>
              <a href="#events" className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-200">Events</a>
              <a href="#team" className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-200">Team</a>
              <a href="#contact" className="font-mono text-xs text-white/60 hover:text-white transition-colors duration-200">Contact</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8 pt-8 border-t border-border/20">
            <p className="font-mono text-[10px] text-white/50 tracking-[0.15em]">
              © 2026 IIIT Kernel. All rights reserved. Made with ❤️ & ⚡ by Aditya Pandey and Aakarsh Bibhaw.
            </p>
            <p className="font-mono text-[11px] text-accent font-semibold tracking-wide animate-shimmer">
              Connecting Pasts - Building Futures
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
