interface Skill {
    _id: string
    name: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    category?: string
}

interface SkillsSectionProps {
    data: {
        skills: Skill[]
    }
}

export function SkillsSection({ data }: SkillsSectionProps) {
    if (!data.skills?.length) return null

    // Group skills if needed, usually just a list or grid
    return (
        <section id="skills" className="py-[var(--spacing-section)] px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[var(--color-secondary)] font-[family-name:var(--font-heading)] mb-12">
                    Skills & Expertise
                </h2>

                <div className="flex flex-wrap justify-center gap-3">
                    {data.skills.map((skill) => (
                        <div
                            key={skill._id}
                            className="px-4 py-2 bg-[var(--color-card)] rounded-[var(--radius-md)] border border-[var(--color-secondary)]/20 shadow-sm flex items-center gap-2"
                        >
                            <span className="font-medium text-[var(--color-card-foreground)]">{skill.name}</span>
                            {/* Optional dot for level */}
                            <span className={`w-2 h-2 rounded-full ${skill.level === "Expert" ? "bg-[var(--color-primary)]" :
                                    skill.level === "Advanced" ? "bg-[var(--color-primary)]/80" :
                                        skill.level === "Intermediate" ? "bg-[var(--color-primary)]/60" :
                                            "bg-[var(--color-primary)]/40"
                                }`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
