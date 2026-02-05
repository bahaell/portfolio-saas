import { Github, ExternalLink } from "lucide-react"

interface Project {
    _id: string
    title: string
    description: string
    imageUrl?: string
    link?: string
    githubUrl?: string
    stack?: string[]
}

interface ProjectsSectionProps {
    data: {
        projects: Project[]
    }
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
    if (!data.projects?.length) return null

    return (
        <section id="projects" className="py-[var(--spacing-section)] px-6 bg-[var(--color-background)]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] font-[family-name:var(--font-heading)] mb-12">
                    Featured Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.projects.map((project) => (
                        <article
                            key={project._id}
                            className="group bg-[var(--color-card)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm hover:shadow-md transition-all border border-[var(--color-secondary)]/10 flex flex-col"
                        >
                            {project.imageUrl ? (
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-video bg-[var(--color-secondary)]/5 flex items-center justify-center text-[var(--color-secondary)]/20">
                                    <span className="font-bold">No Image</span>
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-[var(--color-card-foreground)] mb-2 font-[family-name:var(--font-heading)]">
                                    {project.title}
                                </h3>
                                <p className="text-[var(--color-text)] opacity-80 mb-4 line-clamp-3 text-sm flex-1">
                                    {project.description}
                                </p>

                                {project.stack && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.stack.map(tech => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-1 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-[var(--radius-sm)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-secondary)]/10">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
                                        >
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            <Github className="w-4 h-4" /> Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
