interface AboutSectionProps {
    data: {
        content: string
        description?: string // If coming from SEO description as fallback
    }
}

export function AboutSection({ data }: AboutSectionProps) {
    if (!data.content && !data.description) return null

    return (
        <section id="about" className="py-[var(--spacing-section)] px-6 bg-[var(--color-background)]">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-bold text-[var(--color-secondary)] font-[family-name:var(--font-heading)]">
                    About Me
                </h2>
                <div className="prose prose-lg mx-auto text-[var(--color-text)] font-[family-name:var(--font-body)]">
                    <p>{data.content || data.description}</p>
                </div>
            </div>
        </section>
    )
}
