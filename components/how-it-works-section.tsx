import { Check } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Create Your Profile",
    description: "Sign up and set up your professional profile in minutes.",
  },
  {
    number: "2",
    title: "Add Your Projects",
    description: "Showcase your best work with descriptions and media.",
  },
  {
    number: "3",
    title: "Share Your Portfolio",
    description: "Get a unique link to share with clients and employers.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary/3">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get started in three simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%-2rem)] h-0.5 bg-gradient-to-r from-accent/30 via-accent/20 to-transparent" />
              )}

              {/* Step Card */}
              <div className="relative z-10 p-8 rounded-xl border border-primary/20 bg-white hover:bg-gradient-to-br hover:from-white hover:to-accent/5 shadow-sm hover:shadow-premium transition-all duration-300 hover-lift">
                {/* Step Number */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-6 shadow-md group-hover:shadow-lg transition-all">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{step.description}</p>

                {/* Check Mark */}
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium">Ready to start</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
