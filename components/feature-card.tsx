import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-8 rounded-xl border border-primary/20 bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary/5 shadow-sm hover:shadow-premium transition-all duration-300 hover-lift">
      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-300 mb-4 shadow-sm">
        <Icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
    </div>
  )
}
