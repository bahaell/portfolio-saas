"use client"

import type { PublicPortfolioData } from "@/lib/public-types"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface Props {
  portfolio: PublicPortfolioData
}

export function PublicPortfolioHeader({ portfolio }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Home", href: `/u/${portfolio.username}` },
    { label: "Projects", href: `/u/${portfolio.username}/projects` },
    { label: "About", href: `/u/${portfolio.username}/about` },
    { label: "Contact", href: `/u/${portfolio.username}/contact` },
  ]

  return (
    <header className="border-b" style={{ borderColor: portfolio.theme.primary + "20" }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href={`/u/${portfolio.username}`} className="text-xl font-bold">
            {portfolio.profile.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="opacity-70 hover:opacity-100 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block opacity-70 hover:opacity-100 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
