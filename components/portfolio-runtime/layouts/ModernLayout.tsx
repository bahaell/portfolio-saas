import { HeroSection } from "../sections/HeroSection"
import { AboutSection } from "../sections/AboutSection"
import { ProjectsSection } from "../sections/ProjectsSection"
import { SkillsSection } from "../sections/SkillsSection"
import { ContactSection } from "../sections/ContactSection"
import type { PortfolioLayoutProps } from "../types"

export function ModernLayout({ data }: PortfolioLayoutProps) {
    return (
        <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-[family-name:var(--font-body)]">
            {/* Modern layout uses a sidebar on desktop or different spacing structure */}
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar / Header */}
                <aside className="lg:w-80 lg:h-screen lg:fixed lg:left-0 lg:top-0 bg-[var(--color-card)] border-r border-[var(--color-secondary)]/10 p-8 flex flex-col justify-between z-40">
                    <div>
                        <h1 className="text-2xl font-black font-[family-name:var(--font-heading)] mb-2 text-[var(--color-primary)]">
                            {data.portfolio.title}
                        </h1>
                        <p className="opacity-60 text-sm mb-8">{data.user.name}</p>

                        <nav className="flex flex-col gap-4 font-medium">
                            <a href="#" className="hover:translate-x-1 transition-transform hover:text-[var(--color-primary)]">Home</a>
                            <a href="#about" className="hover:translate-x-1 transition-transform hover:text-[var(--color-primary)]">About</a>
                            <a href="#projects" className="hover:translate-x-1 transition-transform hover:text-[var(--color-primary)]">Projects</a>
                            <a href="#skills" className="hover:translate-x-1 transition-transform hover:text-[var(--color-primary)]">Skills</a>
                            <a href="#contact" className="hover:translate-x-1 transition-transform hover:text-[var(--color-primary)]">Contact</a>
                        </nav>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--color-secondary)]/10">
                        <p className="text-xs opacity-50">
                            Built with Portfora
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:ml-80 flex-1">
                    <HeroSection data={{
                        title: "Building the future, one pixel at a time.",
                        subtitle: data.portfolio.seo?.description || `I am ${data.user.name}, a passionate creator.`,
                        ctaText: "Contact Me",
                        ctaLink: "#contact",
                        image: data.user.image
                    }} />

                    <div className="bg-[var(--color-card)]/30">
                        <ProjectsSection data={{ projects: data.projects }} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="bg-[var(--color-background)]">
                            <SkillsSection data={{ skills: data.skills }} />
                        </div>
                        <div className="bg-[var(--color-card)]/50">
                            <AboutSection data={{
                                content: data.user.about || "",
                                description: data.portfolio.seo?.description
                            }} />
                        </div>
                    </div>

                    <ContactSection data={{
                        email: data.user.email,
                        socials: data.user.socials
                    }} />
                </div>
            </div>
        </main>
    )
}
