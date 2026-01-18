"use client"

import type { PublicPortfolioData } from "@/lib/public-types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface Props {
  portfolio: PublicPortfolioData
}

export function ClassicProTemplate({ portfolio }: Props) {
  const featuredProjects = portfolio.projects.filter((p) => p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 py-24">
        <div className="text-center animate-entrance">
          {portfolio.profile.image && (
            <img
              src={portfolio.profile.image || "/placeholder.svg"}
              alt={portfolio.profile.name}
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover"
              style={{ borderColor: portfolio.theme.primary + "40", borderWidth: "4px" }}
            />
          )}
          <h1 className="text-5xl font-bold mb-4">{portfolio.profile.name}</h1>
          <p className="text-2xl font-medium mb-6" style={{ color: portfolio.theme.primary }}>
            {portfolio.profile.title}
          </p>
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8 leading-relaxed">{portfolio.profile.bio}</p>

          <div className="flex justify-center gap-4">
            <Link href={`/u/${portfolio.username}/projects`}>
              <Button
                style={{
                  backgroundColor: portfolio.theme.primary,
                  color: "white",
                }}
                size="lg"
              >
                View Projects
              </Button>
            </Link>
            <Link href={`/u/${portfolio.username}/contact`}>
              <Button variant="outline" size="lg">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section className="py-20 opacity-90">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="animate-entrance">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-sm opacity-70">{skill.category}</span>
                  </div>
                  <div
                    className="w-full rounded-full h-2"
                    style={{
                      backgroundColor: portfolio.theme.primary + "20",
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
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Work</h2>
            <div className="space-y-12">
              {featuredProjects.map((project) => (
                <div key={project.id} className="border rounded-lg overflow-hidden hover-lift">
                  {project.image && (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="opacity-70 mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: portfolio.theme.primary + "20",
                            color: portfolio.theme.primary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <Button
                            style={{
                              backgroundColor: portfolio.theme.primary,
                              color: "white",
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Button>
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`/u/${portfolio.username}/projects`}>
                <Button variant="outline" size="lg">
                  View All Projects →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div
          className="container max-w-4xl mx-auto px-4 rounded-2xl p-16 text-center"
          style={{ backgroundColor: portfolio.theme.primary + "10" }}
        >
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-lg opacity-70 mb-8">Have a project in mind? I'd love to hear about it.</p>
          <Link href={`/u/${portfolio.username}/contact`}>
            <Button
              style={{
                backgroundColor: portfolio.theme.primary,
                color: "white",
              }}
              size="lg"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
