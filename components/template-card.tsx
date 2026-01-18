import { Badge } from "@/components/ui/badge"

interface TemplateCardProps {
  title: string
  description: string
  image: string
  isPremium?: boolean
}

export function TemplateCard({ title, description, image, isPremium }: TemplateCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm hover:shadow-premium transition-all duration-500 mb-5 hover-lift">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isPremium && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-md font-semibold">
            Premium
          </Badge>
        )}
      </div>
      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  )
}
