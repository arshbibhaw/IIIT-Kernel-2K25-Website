"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, Check } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const domainDescriptions: Record<string, string> = {
  "PR": "Building and maintaining Kernel's image, outreach, and external relationships.",
  "Content": "Crafting the words and stories that give Kernel its voice.",
  "Design": "Shaping the visual identity of Kernel — every graphic, every poster, every pixel.",
  "Event": "Planning, organising, and executing every Kernel event from concept to conclusion.",
  "Hospitality": "Ensuring every speaker, guest, and attendee feels genuinely welcomed.",
  "Social Media": "Keeping Kernel's online presence alive, engaging, and growing.",
  "Video Editing": "Capturing and telling Kernel's story through film, reels, and visual content.",
  "Coordinator": "Steering the club's vision, overseeing operations, and serving as the primary bridge between the institute, alumni, and students.",
  "Co-Coordinator": "Co-leading the club's initiatives, managing domain workflows, and ensuring the smooth execution of all Kernel activities.",
}

const getDomain = (role: string) => {
  if (role.includes("PR")) return "PR"
  if (role.includes("Content")) return "Content"
  if (role.includes("Design")) return "Design"
  if (role.includes("Event")) return "Event"
  if (role.includes("Hospitality")) return "Hospitality"
  if (role.includes("Social Media")) return "Social Media"
  if (role.includes("Video Editing")) return "Video Editing"
  if (role.includes("Co-Coordinator")) return "Co-Coordinator"
  if (role.includes("Coordinator")) return "Coordinator"
  return "General"
}

interface TeamMember {
  name: string
  role: string
  year: string
  id: string
  image?: string
}

const coordinators: TeamMember[] = [
  { name: "Dhrudeep Desai", role: "Coordinator", year: "3rd Year", id: "2023KUCP1081", image: "/images/team/Dhrudeep Desai_Coordinator.jpg" },
  { name: "Lalit Kumar", role: "Co-Coordinator", year: "3rd Year", id: "2023KUCP1120", image: "/images/team/Lalit Kumar_Co-Coordinator.jpeg" },
]

const domainLeads: TeamMember[] = [
  { name: "Arman Redhu", role: "Content Lead", year: "3rd Year", id: "2023KUCP1061", image: "/images/team/Arman Redhu_content lead.jpeg" },
  { name: "Raj Singhal", role: "Hospitality Lead", year: "3rd Year", id: "2023KUCP1088", image: "/images/team/Raj Singhal_hospitality lead.jpeg" },
  { name: "Shubham Repswal", role: "Video Editing Lead", year: "3rd Year", id: "2023KUCP1092", image: "/images/team/Shubham Repswal_video editing lead.jpeg" },
  { name: "Abhay Kumar", role: "Design Lead", year: "3rd Year", id: "2023KUCP1104", image: "/images/team/Abhay_Design Lead.jpeg" },
  { name: "Arijit Ajay Kumar", role: "Event Lead", year: "3rd Year", id: "2023KUCP1071", image: "/images/team/Arijiit Ajay Kumar_Event lead.jpeg" },
  { name: "Atulya", role: "Event Lead", year: "3rd Year", id: "2023KUCP1170", image: "/images/team/Atulya pandey_event lead.jpg" },
  { name: "Achyut Gupta", role: "PR Lead", year: "3rd Year", id: "2023KUCP1158", image: "/images/team/Achyut gupta_PR lead.jpeg" },
  { name: "Ayush Khandelwal", role: "Social Media Lead", year: "3rd Year", id: "2023KUEC2076" },
]

const seniorExecs: TeamMember[] = [
  { name: "Lovepreet Singh", role: "Design Senior Executive", year: "2nd Year", id: "2024KUAD3022", image: "/images/team/Lovepreet Singh_Design Senior Executive.jpeg" },
  { name: "Satyam Jha", role: "Social Media Senior Executive", year: "2nd Year", id: "2024KUAD3024", image: "/images/team/Satyam Jha_social media sr executive.jpg" },
  { name: "Dhruv Patel", role: "Event Senior Executive", year: "2nd Year", id: "2024KUAD3041", image: "/images/team/Dhruv Patel_event sr executive.jpg" },
  { name: "Pranav Karwa", role: "Event Senior Executive", year: "2nd Year", id: "2024KUCP1022" },
  { name: "Uday Singh", role: "Social Media Senior Executive", year: "2nd Year", id: "2024KUCP1023", image: "/images/team/Uday Singh_ social media sr executive.jpg" },
  { name: "Prachi Gupta", role: "PR Senior Executive", year: "2nd Year", id: "2024KUCP1056", image: "/images/team/Prachi Gupta_PR sr executive.jpg" },
  { name: "Aditya Pandey", role: "Hospitality Senior Executive", year: "2nd Year", id: "2024KUEC2067", image: "/images/team/Aditya Pandey_hospitality sr executive.jpg" },
  { name: "Chirag Singh", role: "Event Senior Executive", year: "2nd Year", id: "2024KUCP1081", image: "/images/team/Chirag Singh_event sr executive.jpg" },
  { name: "Mitali Nayak", role: "PR Senior Executive", year: "2nd Year", id: "2024KUCP1098", image: "/images/team/Mitali Nayak_PR sr executive.jpg" },
  { name: "Arvind Gill", role: "Design Senior Executive", year: "2nd Year", id: "2024KUCP1153", image: "/images/team/Arvind Gill_Design Senior Executive.jpeg" },
  { name: "Gopal Regar", role: "Video Editing Senior Executive", year: "2nd Year", id: "2024KUCP1155", image: "/images/team/Gopal Regar_video editing sr executive.jpeg" },
  { name: "Aakarsh Bibhaw", role: "Content Senior Executive", year: "2nd Year", id: "2024KUCP1156", image: "/images/team/Aakarsh Bibhaw_content sr executive.jpg" },
  { name: "Somya Saraswat", role: "Hospitality Senior Executive", year: "2nd Year", id: "2024KUCP1071", image: "/images/team/Somya Saraswat_hospitality sr executive.jpg" },
  { name: "Rohit", role: "Video Editing Senior Executive", year: "2nd Year", id: "2024KUEC2068", image: "/images/team/Rohit_video editing sr executive.jpg" },
  { name: "Anshika Sahu", role: "Content Senior Executive", year: "2nd Year", id: "2024KUEC2072", image: "/images/team/AnshikaSahu_hospitality sr executive.jpg" },
  { name: "Arun", role: "Event Senior Executive", year: "2nd Year", id: "2024KUEC2075", image: "/images/team/Arun_Event Management Senior Executives.jpeg" }
]

const juniorExecs: TeamMember[] = [
  { name: "Akarsh Lal", role: "Hospitality Junior Executive", year: "1st Year", id: "2025KUAD3009", image: "/images/team/Akarsh lal_hospitality jr executive.jpg" },
  { name: "Nidhi Suthar", role: "Social Media Junior Executive", year: "1st Year", id: "2025KUCP1125", image: "/images/team/Nidhi suthar_social media  jr executive.jpg" },
  { name: "Samman Gupta", role: "Design Junior Executive", year: "1st Year", id: "2025KUAD3026", image: "/images/team/samman gupta_design  jr executive.jpg" },
  { name: "Vansh Chauhan", role: "Event Junior Executive", year: "1st Year", id: "2025KUAD3031", image: "/images/team/Vansh Chauhan_Event Management Junior Executive.jpeg" },
  { name: "Tulsi Meena", role: "Hospitality Junior Executive", year: "1st Year", id: "2025KUAD3049", image: "/images/team/Tulsi Meena_hospitalty  jr executive.jpg" },
  { name: "Shiv Gupta", role: "Event Junior Executive", year: "1st Year", id: "2025KUAD3055", image: "/images/team/Shiv Gupta_event  jr executive.jpg" },
  { name: "Akshat Sharma", role: "Video Editing Junior Executive", year: "1st Year", id: "2025KUCP1001" },
  { name: "Aditya Sisodiya", role: "Event Junior Executive", year: "1st Year", id: "2025KUCP1067", image: "/images/team/Aditya Sisodiya_event  jr executive.jpg" },
  { name: "Virag Jain", role: "Video Editing Junior Executive", year: "1st Year", id: "2025KUCP1068" },
  { name: "Sanika Sharma", role: "Hospitality Junior Executive", year: "1st Year", id: "2025KUCP1077", image: "/images/team/Sanika Sharma Hospitality jr executive.jpg" },
  { name: "Bhumika", role: "Design Junior Executive", year: "1st Year", id: "2025KUCP1100", image: "/images/team/Bhumika_Design Junior Executive.jpeg" },
  { name: "Shikhar Asthana", role: "Content Junior Executive", year: "1st Year", id: "2025KUCP1107", image: "/images/team/ShikharAsthana_content  jr executive.jpg" },
  { name: "Dhruvi Purohit", role: "Content Junior Executive", year: "1st Year", id: "2025KUCP1167", image: "/images/team/Dhruvi Purohit_content jr executive.jpg" },
  { name: "Palak Panwar", role: "PR Junior Executive", year: "1st Year", id: "2025KUCP1172", image: "/images/team/Palak panwar_PR  jr executive.jpg" },
  { name: "Shivang Singh", role: "PR Junior Executive", year: "1st Year", id: "2025KUEC2008", image: "/images/team/ShivangSingh_ PR Jr.Executive.jpg" },
  { name: "Niyati Desai", role: "Social Media Junior Executive", year: "1st Year", id: "2025KUEC2050", image: "/images/team/Niyati Desai_social media jr executive.jpg" },
  { name: "Uday Baldaniya", role: "Event Junior Executive", year: "1st Year", id: "2025KUEC2061", image: "/images/team/Uday Baldaniya_event jr executive.jpg" },
  { name: "Tanveen Kaur", role: "Hospitality Junior Executive", year: "1st Year", id: "2025KUEC2071", image: "/images/team/TanveenKaur_hospitality jr executive.jpg" },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [selectedMember])

  const TeamGroup = ({ title, subtitle, members, columns = 4 }: { title: string; subtitle: string; members: TeamMember[]; columns?: number }) => {
    const gridCols = columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-cols-5"

    return (
      <div className="mb-24">
        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl text-[#fafafa] mb-3">{title}</h3>
        <p className="font-mono text-xs md:text-sm text-[#888] mb-10 max-w-3xl leading-relaxed">{subtitle}</p>
        <div className={`grid ${gridCols} gap-4 md:gap-6`}>
          {members.map((member, index) => (
            <div
              key={index}
              className="group h-full w-full relative border border-[#222] bg-[#0a0a0a] px-4 pt-10 pb-8 md:p-6 md:pt-10 hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-start text-center animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[280px]"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
              onClick={() => setSelectedMember(member)}
            >
              {/* Visual indicator for interactive card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
              <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-30 pointer-events-none">
                <span className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Click to Expand</span>
              </div>

              <div className="w-16 h-16 shrink-0 rounded-full bg-[#111] border border-[#222] mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10 overflow-hidden relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 64px, 64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="font-[var(--font-bebas)] text-3xl text-zinc-400">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-h-[56px] flex items-center justify-center w-full mb-3 z-10 px-2 lg:px-0">
                <h4 className="font-[var(--font-bebas)] text-xl text-[#eee] leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {member.name}
                </h4>
              </div>

              <div className="min-h-[40px] flex items-start justify-center w-full mb-4 z-10 px-2 lg:px-0">
                <p className="font-mono text-[10px] text-accent font-bold tracking-widest uppercase line-clamp-2">
                  {member.role}
                </p>
              </div>

              <div className="mt-auto flex flex-col items-center">
                <div className="h-[1px] w-8 bg-[#222] mb-3 group-hover:bg-accent/30 transition-colors duration-300 z-10" />
                <p className="font-mono text-[10px] text-[#666] uppercase tracking-wider z-10 px-2 lg:px-0">
                  {member.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} id="team" className="relative w-full py-24 md:py-32 bg-[#000] text-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
            04 / THE PEOPLE
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight">
            THE KERNEL TEAM
          </h2>
          <p className="font-mono text-sm text-[#888] mt-6 max-w-2xl leading-relaxed">
            Passionate students from every domain, united by one mission — to make IIIT Kota's community stronger. Click on any profile to learn more about their specific role and domain.
          </p>
        </div>

        {/* Leadership */}
        <TeamGroup
          title="Club Leadership"
          subtitle="Steering the club's vision and operations — the two heads of IIIT Kernel."
          members={coordinators}
          columns={2}
        />

        {/* Bifurcated by Domain */}
        {Array.from(new Set([...domainLeads, ...seniorExecs, ...juniorExecs].map((m) => getDomain(m.role))))
          .sort()
          .map((domain) => {
            const domainMembers = [
              ...domainLeads.filter((m) => getDomain(m.role) === domain),
              ...seniorExecs.filter((m) => getDomain(m.role) === domain),
              ...juniorExecs.filter((m) => getDomain(m.role) === domain),
            ].sort((a, b) => b.year.localeCompare(a.year));
            return (
              <TeamGroup
                key={domain}
                title={`${domain} Team`}
                subtitle={domainDescriptions[domain] || `The dedicated minds behind our ${domain} initiatives.`}
                members={domainMembers}
                columns={4}
              />
            )
          })}
      </div>

      {/* AMAZON-STYLE MODAL / POPUP OVERLAY */}
      {selectedMember && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6" style={{ cursor: "auto" }}>
          {/* Backdrop - Removed backdrop-blur to massively improve cursor framerate */}
          <div
            className="absolute inset-0 bg-black/80 cursor-pointer"
            onClick={() => setSelectedMember(null)}
            style={{ animation: "fadeIn 0.3s ease-out forwards" }}
          />

          {/* Card */}
          <div
            className="relative w-[95vw] max-w-[480px] bg-white text-black overflow-hidden shadow-2xl flex flex-col"
            style={{
              borderRadius: "16px",
              animation: "slideUpCard 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors"
            >
              <X size={16} />
            </button>

            {/* Top Image Area */}
            <div className="w-full aspect-square md:aspect-[4/3] shrink-0 bg-[#f8f9fa] relative flex items-center justify-center overflow-hidden border-b border-zinc-100">
              {selectedMember.image ? (
                <div className="relative w-full h-full p-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    sizes="(max-width: 480px) 100vw, 480px"
                    className="object-contain drop-shadow-sm rounded-md p-4"
                  />
                </div>
              ) : (
                <span className="font-[var(--font-bebas)] text-7xl md:text-8xl text-zinc-300">
                  {selectedMember.name.charAt(0)}
                </span>
              )}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {selectedMember.id}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 md:p-6 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-1 leading-tight line-clamp-1">
                  {selectedMember.name}
                </h2>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="font-semibold text-zinc-800 line-clamp-1 break-all">{selectedMember.role}</span>
                  <span className="text-zinc-300">&bull;</span>
                  <span className="text-zinc-600 shrink-0">{selectedMember.year}</span>
                </div>
              </div>

              {/* Domain Overview */}
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3 md:p-4 mb-4">
                <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2 text-sm">
                  <span className="text-[#0284c7]">✨</span>
                  Domain Overview
                </h3>
                <p className="text-xs md:text-sm text-zinc-700 leading-snug line-clamp-2 md:line-clamp-none">
                  {domainDescriptions[getDomain(selectedMember.role)] || "Dedicated member of the IIIT Kernel community, working to execute the club's vision."}
                </p>
              </div>

              {/* Tags / Badges */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-auto">
                {[getDomain(selectedMember.role), selectedMember.year].map((tag, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Check size={14} className="text-emerald-500" />
                    {tag}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-3 mt-4 rounded-full border border-zinc-300 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400 transition-all shadow-sm flex justify-center items-center shrink-0"
              >
                Close Profile Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add inline keyframes for the modal to avoid modifying globals.css */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpCard {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </section>
  )
}
