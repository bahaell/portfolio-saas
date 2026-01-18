import { FeatureCard } from "./feature-card"
import { Layout, Zap, BarChart3, FileText } from "lucide-react"

const features = [
  {
    icon: Layout,
    title: "Beautiful Templates",
    description: "Choose from dozens of professionally designed templates, or customize from scratch.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance. Your portfolio loads in milliseconds.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track views, clicks, and engagement with detailed analytics.",
  },
  {
    icon: FileText,
    title: "PDF Export",
    description: "Download your portfolio as PDF for easy sharing or printing.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary/3 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful features to help you create, customize, and share your professional portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-entrance">
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
