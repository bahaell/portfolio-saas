"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Copy, Check } from "lucide-react"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ColorPicker({ label, value, onChange, disabled = false }: ColorPickerProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-semibold text-slate-200">{label}</Label>
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-12 h-10 rounded-lg cursor-pointer border border-slate-600/50 disabled:opacity-50 transition-all duration-200 hover:border-slate-500"
          />
        </div>
        <div className="flex-1 flex items-center gap-1 px-3 py-2 border border-slate-600/50 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-all duration-200">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="flex-1 bg-transparent text-sm font-mono text-slate-200 placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed outline-none"
            placeholder="#000000"
          />
          <button
            onClick={copyToClipboard}
            disabled={disabled}
            className="p-1 hover:bg-slate-800/50 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy color"
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} className="text-slate-400 hover:text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
