"use client"

import type React from "react"

import type { PortfolioData, ThemeConfig } from "@/lib/types/theme"
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react"

interface ModernTemplateProps {
  portfolio: PortfolioData
  theme: ThemeConfig
}

export function ModernTemplate({ portfolio, theme }: ModernTemplateProps) {
  const themeStyle = {
    "--theme-primary": theme.colors.primary,
    "--theme-secondary": theme.colors.secondary,
    "--theme-accent": theme.colors.accent,
    "--theme-background": theme.colors.background,
    "--theme-foreground": theme.colors.foreground,
    "--theme-card": theme.colors.card,
    "--theme-card-foreground": theme.colors.cardForeground,
  } as React.CSSProperties

  return (
    <div style={themeStyle} className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-foreground)]">
      {/* Header */}
      <header
        className="border-b"
        style={{
          borderColor: theme.colors.secondary + "20",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading }}>
                {portfolio.name}
              </h1>
              <p className="text-lg" style={{ color: theme.colors.secondary, fontFamily: theme.fonts.body }}>
                {portfolio.title}
              </p>
            </div>
          </div>
          <p className="text-base max-w-2xl" style={{ color: theme.colors.foreground, fontFamily: theme.fonts.body }}>
            {portfolio.description}
          </p>

          {/* Contact Info */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
                style={{
                  backgroundColor: theme.colors.accent + "10",
                  color: theme.colors.accent,
                }}
              >
                <Mail size={18} />
                <span style={{ fontFamily: theme.fonts.body }}>{portfolio.email}</span>
              </a>
            )}
            {portfolio.social?.linkedin && (
              <a
                href={portfolio.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:opacity-80"
                style={{
                  backgroundColor: theme.colors.secondary + "10",
                  color: theme.colors.secondary,
                }}
              >
                <Linkedin size={18} />
              </a>
            )}
            {portfolio.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:opacity-80"
                style={{
                  backgroundColor: theme.colors.secondary + "10",
                  color: theme.colors.secondary,
                }}
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About Section */}
      {portfolio.about && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading }}>
            About Me
          </h2>
          <p style={{ color: theme.colors.foreground, fontFamily: theme.fonts.body }}>{portfolio.about}</p>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: theme.fonts.heading }}>
            Projects
          </h2>
          <div className="grid gap-6">
            {portfolio.projects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-lg border transition-all hover:shadow-lg"
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.secondary + "20",
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                    {project.title}
                  </h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:opacity-70">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="mb-3" style={{ color: theme.colors.foreground, fontFamily: theme.fonts.body }}>
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: theme.colors.accent + "15",
                          color: theme.colors.accent,
                          fontFamily: theme.fonts.body,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: theme.fonts.heading }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-lg text-center"
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.secondary + "20",
                  border: `1px solid ${theme.colors.secondary}20`,
                }}
              >
                <p className="font-semibold" style={{ fontFamily: theme.fonts.heading }}>
                  {skill.name}
                </p>
                <p
                  className="text-sm capitalize"
                  style={{
                    color: theme.colors.secondary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {skill.level}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
