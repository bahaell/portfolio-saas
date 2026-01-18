import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "Security"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Community", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "License"],
  },
]

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 mt-20 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Portfora
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Create beautiful, professional portfolios that showcase your best work to the world.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title} className="md:col-span-1">
              <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">© 2025 Portfora. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 transform"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
