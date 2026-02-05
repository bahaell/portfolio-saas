import { Mail, Linkedin, Twitter, Github } from "lucide-react"

interface ContactSectionProps {
    data: {
        email: string
        socials?: {
            linkedin?: string
            twitter?: string
            github?: string
            [key: string]: string | undefined
        }
    }
}

export function ContactSection({ data }: ContactSectionProps) {
    return (
        <section id="contact" className="py-[var(--spacing-section)] px-6 bg-[var(--color-card)] text-[var(--color-card-foreground)]">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)]"> Let's Connect </h2>

                <div className="flex justify-center items-center gap-6">
                    <a
                        href={`mailto:${data.email}`}
                        className="flex flex-col items-center gap-2 hover:text-[var(--color-primary)] transition-colors group"
                    >
                        <div className="p-4 rounded-full bg-[var(--color-background)] group-hover:bg-[var(--color-primary)]/10 transition-colors">
                            <Mail className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium">{data.email}</span>
                    </a>
                </div>

                {data.socials && Object.keys(data.socials).some(k => data.socials![k]) && (
                    <div className="flex justify-center gap-4 mt-8">
                        {data.socials.github && (
                            <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-[var(--color-background)] transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {data.socials.linkedin && (
                            <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-[var(--color-background)] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        {data.socials.twitter && (
                            <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-[var(--color-background)] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                )}

                <div className="pt-12 text-sm opacity-60">
                    © {new Date().getFullYear()} Protected by Portfora. All rights reserved.
                </div>
            </div>
        </section>
    )
}
