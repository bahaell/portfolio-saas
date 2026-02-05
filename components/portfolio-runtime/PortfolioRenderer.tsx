"use client"

import { useEffect } from "react"
import { MinimalLayout } from "./layouts/MinimalLayout"
import { ModernLayout } from "./layouts/ModernLayout"
import type { RuntimePortfolioData } from "./types"

interface PortfolioRendererProps {
    data: RuntimePortfolioData
    template: string // slug of the template
    theme: {
        colors: Record<string, string>
        fonts: Record<string, string>
        spacing: Record<string, string>
        radius: Record<string, string>
    }
}

export function PortfolioRenderer({ data, template, theme }: PortfolioRendererProps) {

    // Choose Layout
    const LayoutComponent = (() => {
        switch (template.toLowerCase()) {
            case "modern":
                return ModernLayout
            case "minimal":
            default:
                return MinimalLayout
        }
    })()

    // Generate CSS Variables style tag
    const cssVariables = {
        // Colors
        "--color-primary": theme.colors.primary,
        "--color-secondary": theme.colors.secondary,
        "--color-background": theme.colors.background,
        "--color-text": theme.colors.text,
        "--color-accent": theme.colors.accent || theme.colors.primary,
        "--color-card": theme.colors.card || "#ffffff",
        "--color-card-foreground": theme.colors.cardForeground || "#000000",

        // Fonts
        "--font-heading": theme.fonts.heading,
        "--font-body": theme.fonts.body,

        // Spacing
        "--spacing-section": theme.spacing.section || "4rem",
        "--spacing-card": theme.spacing.card || "1.5rem",

        // Radius
        "--radius-sm": theme.radius.sm || "0.25rem",
        "--radius-md": theme.radius.md || "0.5rem",
        "--radius-lg": theme.radius.lg || "0.75rem",
    } as React.CSSProperties

    return (
        <div style={cssVariables} className="portfolio-runtime-root">
            <LayoutComponent data={data} />
        </div>
    )
}
