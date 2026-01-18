import { TemplateCard } from "./template-card"

const templates = [
  {
    title: "Minimal Pro",
    description: "Clean and minimal design perfect for professionals",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: false,
  },
  {
    title: "Creative Studio",
    description: "Bold colors and modern layout for creatives",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: true,
  },
  {
    title: "Dark Elegance",
    description: "Sophisticated dark theme for tech professionals",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: false,
  },
  {
    title: "Art Gallery",
    description: "Showcase your visual work with this gallery-focused template",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: true,
  },
  {
    title: "Corporate Suite",
    description: "Professional template for business leaders",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: false,
  },
  {
    title: "Innovation Hub",
    description: "Futuristic design for tech and startup founders",
    image: "/placeholder.svg?height=300&width=400",
    isPremium: true,
  },
]

export function TemplatesSection() {
  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Beautiful Templates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose from our curated collection of professional templates or create your own.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template, index) => (
            <div key={template.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-entrance">
              <TemplateCard
                title={template.title}
                description={template.description}
                image={template.image}
                isPremium={template.isPremium}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
