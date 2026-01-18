"use client"

import { Eye, EyeOff } from "lucide-react"

interface Section {
  id: string
  label: string
  visible: boolean
}

interface SectionVisibilityToggleProps {
  sections: Section[]
  onToggle: (sectionId: string, visible: boolean) => void
}

export function SectionVisibilityToggle({ sections, onToggle }: SectionVisibilityToggleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-100">Portfolio Sections</h3>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onToggle(section.id, !section.visible)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm font-medium ${
              section.visible
                ? "bg-slate-700/40 border-slate-600/50 text-slate-100 hover:bg-slate-700/60 hover:border-slate-500"
                : "bg-slate-900/30 border-slate-700/30 text-slate-500 hover:bg-slate-900/50 hover:border-slate-600/30"
            }`}
          >
            {section.visible ? (
              <Eye size={16} className="text-blue-400" />
            ) : (
              <EyeOff size={16} className="text-slate-600" />
            )}
            <span>{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
