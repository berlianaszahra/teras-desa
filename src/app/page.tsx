import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import About from "@/components/sections/About"
import { CTA } from "@/components/sections/CTA"
import FAQ from "@/components/sections/FAQ"
import HeroSection from "@/components/sections/HeroSection" 
import Stats from "@/components/sections/Stats"
import Why from "@/components/sections/Why"

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Stats />
            <About />
            <Why />
            <FAQ />
            <CTA />
            <Footer />
            
        </>
    )
}