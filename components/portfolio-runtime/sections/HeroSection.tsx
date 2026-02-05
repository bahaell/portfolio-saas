import { ActionButton } from "@/components/ui/button" // Assuming we might need a generic button, or we use HTML buttons styled with CSS vars
// Actually we should avoid dashboard UI components if possible to keep runtime independent, but basic UI components are fine.
// Let's use standard HTML/Tailwind with CSS variables for independence.

interface HeroSectionProps {
    data: {
        title: string
        subtitle?: string
        image?: string
        ctaText?: string
        ctaLink?: string
    }
}

export function HeroSection({ data }: HeroSectionProps) {
    return (
        <section className="py-[var(--spacing-section)] px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--color-primary)] font-[family-name:var(--font-heading)] leading-tight">
                        {data.title}
                    </h1>
                    {data.subtitle && (
                        <p className="text-xl text-[var(--color-text)] opacity-80 font-[family-name:var(--font-body)]">
                            {data.subtitle}
                        </p>
                    )}
                    {/* Simple CTA if needed */}
                    {data.ctaText && (
                        <a
                            href={data.ctaLink || "#contact"}
                            className="inline-block px-8 py-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity font-medium"
                        >
                            {data.ctaText}
                        </a>
                    )}
                </div>
                {data.image && (
                    <div className="flex-1">
                        {/* Using standard img for simplicity in runtime, or Next/Image if we have valid domains */}
                        <div className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-xl border-4 border-[var(--color-card)] bg-[var(--color-card)]">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
