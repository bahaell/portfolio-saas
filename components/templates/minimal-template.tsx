"use client"

import type React from "react"

import type { PortfolioData, ThemeConfig } from "@/lib/types/theme"
import { Mail, ExternalLink } from "lucide-react"

interface MinimalTemplateProps {
  portfolio: PortfolioData
  theme: ThemeConfig
}

export function MinimalTemplate({ portfolio, theme }: MinimalTemplateProps) {
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
      {/* Minimal Header */}
      <header className="max-w-3xl mx-auto px-6 py-20">
        <h1
          className="text-5xl font-bold mb-4 tracking-tight"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.foreground,
          }}
        >
          {portfolio.name}
        </h1>
        <p
          className="text-xl mb-8"
          style={{
            color: theme.colors.secondary,
            fontFamily: theme.fonts.body,
          }}
        >
          {portfolio.title}
        </p>
        <p
          className="text-base leading-relaxed"
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fonts.body,
          }}
        >
          {portfolio.description}
        </p>

        {/* Contact */}
        <div className="mt-12 flex gap-6 items-center">
          {portfolio.email && (
            <a
              href={`mailto:${portfolio.email}`}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{
                color: theme.colors.accent,
                fontFamily: theme.fonts.body,
              }}
            >
              <Mail size={20} />
              {portfolio.email}
            </a>
          )}
        </div>
      </header>

      {/* About */}
      {portfolio.about && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <p
            className="text-lg leading-relaxed"
            style={{
              color: theme.colors.foreground,
              fontFamily: theme.fonts.body,
            }}
          >
            {portfolio.about}
          </p>
        </section>
      )}

      {/* Projects */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2
            className="text-2xl font-bold mb-12"
            style={{
              fontFamily: theme.fonts.heading,
            }}
          >
            Work
          </h2>
          <div className="space-y-12">
            {portfolio.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: theme.fonts.heading,
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} style={{ color: theme.colors.accent }} />
                    </a>
                  )}
                </div>
                <p
                  className="text-base"
                  style={{
                    color: theme.colors.secondary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
