"use client"

import type { PortfolioData, ThemeConfig } from "@/lib/types/theme"
import { ModernTemplate, MinimalTemplate } from "@/components/templates"

interface LivePreviewProps {
  theme: ThemeConfig
  templateId: string
  portfolio: PortfolioData
  isLoading?: boolean
}

export function LivePreview({ theme, templateId, portfolio, isLoading }: LivePreviewProps) {
  const getTemplate = () => {
    switch (templateId) {
      case "minimal":
        return <MinimalTemplate portfolio={portfolio} theme={theme} />
      case "modern":
      default:
        return <ModernTemplate portfolio={portfolio} theme={theme} />
    }
  }

  return (
    <div className="w-full h-full bg-muted rounded-lg overflow-hidden flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="text-white">Loading preview...</div>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        <iframe
          title="Portfolio Preview"
          className="w-full h-full border-none"
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Preview</title>
              </head>
              <body style="margin: 0; padding: 0;">
                <div id="root"></div>
              </body>
            </html>
          `}
        />
      </div>
    </div>
  )
}
