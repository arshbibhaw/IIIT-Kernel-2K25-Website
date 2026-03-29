import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "IIIT Kernel",
  description:
    "A vibrant hub for innovation, education, and collaboration. Bridging institutional heritage with future possibilities through tech, entrepreneurship, and community growth.",
  generator: "v0.app",
  openGraph: {
    title: "IIIT Kernel",
    description: "Connecting Past, Building Future",
    type: "website",
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kernelKALogo-ONF1rDZAzaBv1E0V2psXsXbldQINXO.jpg",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kernelKALogo-ONF1rDZAzaBv1E0V2psXsXbldQINXO.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-background text-foreground antialiased overflow-x-hidden pt-20" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
