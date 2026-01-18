"use client"

import type { PublicPortfolioData } from "@/lib/public-types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

interface Props {
  portfolio: PublicPortfolioData
}

export function ModernVisualTemplate({ portfolio }: Props) {
  const featuredProjects = portfolio.projects.filter((p) => p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-entrance">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{portfolio.profile.name}</h1>
            <p className="text-xl font-semibold mb-4" style={{ color: portfolio.theme.primary }}>
              {portfolio.profile.title}
            </p>
            <p className="text-lg opacity-70 mb-8 leading-relaxed">{portfolio.profile.bio}</p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/u/${portfolio.username}/projects`}>
                <Button
                  style={{
                    backgroundColor: portfolio.theme.primary,
                    color: "white",
                  }}
                  size="lg"
                >
                  Explore Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href={`/u/${portfolio.username}/contact`}>
                <Button variant="outline" size="lg">
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {portfolio.profile.image && (
            <div className="animate-entrance" style={{ animationDelay: "0.2s" }}>
              <img
                src={portfolio.profile.image || "/placeholder.svg"}
                alt={portfolio.profile.name}
                className="w-full rounded-2xl"
                style={{
                  boxShadow: `0 20px 64px ${portfolio.theme.primary}20`,
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects Grid */}
      {featuredProjects.length > 0 && (
        <section className="py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg opacity-70 mb-16">Explore my latest and greatest work</p>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden hover-lift"
                  style={{
                    boxShadow: `0 8px 32px ${portfolio.theme.primary}15`,
                  }}
                >
                  {project.image && (
                    <div className="overflow-hidden h-80">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="opacity-70 mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: portfolio.theme.primary + "20",
                            color: portfolio.theme.primary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 text-sm opacity-70">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <Button
                            style={{
                              backgroundColor: portfolio.theme.primary,
                              color: "white",
                            }}
                            size="sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href={`/u/${portfolio.username}/projects`}>
                <Button variant="outline" size="lg" className="group bg-transparent">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section className="py-24 opacity-90">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16">Skills & Expertise</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {Array.from(new Set(portfolio.skills.map((s) => s.category))).map((category) => (
                <div
                  key={category}
                  className="p-8 rounded-xl"
                  style={{
                    backgroundColor: portfolio.theme.primary + "10",
                  }}
                >
                  <h3
                    className="font-bold mb-6"
                    style={{
                      color: portfolio.theme.primary,
                    }}
                  >
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {portfolio.skills
                      .filter((s) => s.category === category)
                      .map((skill) => (
                        <div key={skill.id}>
                          <p className="text-sm font-semibold mb-2">{skill.name}</p>
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: portfolio.theme.primary + "30",
                            }}
                          >
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${(skill.proficiency / 5) * 100}%`,
                                backgroundColor: portfolio.theme.primary,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experiences.length > 0 && (
        <section className="py-24">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16">Experience</h2>

            <div className="space-y-8">
              {portfolio.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-4 pl-8"
                  style={{
                    borderColor: portfolio.theme.primary,
                  }}
                >
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p
                    className="font-semibold mb-2"
                    style={{
                      color: portfolio.theme.primary,
                    }}
                  >
                    {exp.company}
                  </p>
                  <p className="text-sm opacity-70 mb-4">
                    {new Date(exp.startDate).getFullYear()} -{" "}
                    {exp.current ? "Present" : new Date(exp.endDate || "").getFullYear()}
                  </p>
                  <p className="opacity-80 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div
          className="container max-w-4xl mx-auto px-4 rounded-3xl p-12 md:p-20 text-center"
          style={{
            backgroundColor: portfolio.theme.primary,
            color: "white",
          }}
        >
          <h2 className="text-4xl font-bold mb-6">Let's Create Something Great</h2>
          <p className="text-lg opacity-90 mb-10">Interested in working together? Let's discuss your project.</p>
          <Link href={`/u/${portfolio.username}/contact`}>
            <Button variant="secondary" size="lg" className="font-semibold">
              Start a Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
