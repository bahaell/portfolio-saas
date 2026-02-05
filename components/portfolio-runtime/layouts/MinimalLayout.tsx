import { HeroSection } from "../sections/HeroSection"
import { AboutSection } from "../sections/AboutSection"
import { ProjectsSection } from "../sections/ProjectsSection"
import { SkillsSection } from "../sections/SkillsSection"
import { ContactSection } from "../sections/ContactSection"
import type { PortfolioLayoutProps } from "../types"

export function MinimalLayout({ data }: PortfolioLayoutProps) {
    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-[family-name:var(--font-body)]">
            <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-secondary)]/10">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-bold text-xl font-[family-name:var(--font-heading)]">{data.portfolio.title}</span>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#about" className="hover:text-[var(--color-primary)] transition-colors">About</a>
                        <a href="#projects" className="hover:text-[var(--color-primary)] transition-colors">Projects</a>
                        <a href="#skills" className="hover:text-[var(--color-primary)] transition-colors">Skills</a>
                        <a href="#contact" className="hover:text-[var(--color-primary)] transition-colors">Contact</a>
                    </nav>
                </div>
            </header>

            <div className="pt-16">
                <HeroSection data={{
                    title: `Hi, I'm ${data.user.name}`,
                    subtitle: data.portfolio.seo?.description || "Welcome to my portfolio.",
                    ctaText: "View My Work",
                    ctaLink: "#projects",
                    image: data.user.image
                }} />

                <AboutSection data={{
                    content: data.user.about || "",
                    description: data.portfolio.seo?.description
                }} />

                <ProjectsSection data={{ projects: data.projects }} />

                <SkillsSection data={{ skills: data.skills }} />

                <ContactSection data={{
                    email: data.user.email,
                    socials: data.user.socials
                }} />
            </div>
        </main>
    )
}
