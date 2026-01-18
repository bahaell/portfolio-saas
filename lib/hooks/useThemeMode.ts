"use client"

import { useEffect, useState } from "react"

type ThemeMode = "light" | "dark"

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem("theme-mode") as ThemeMode | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const preferredMode = stored || (systemPrefersDark ? "dark" : "light")
    setMode(preferredMode)
    applyThemeMode(preferredMode)
  }, [])

  const applyThemeMode = (newMode: ThemeMode) => {
    const html = document.documentElement
    if (newMode === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme-mode", newMode)
  }

  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    applyThemeMode(newMode)
  }

  return { mode, toggleThemeMode, mounted }
}
