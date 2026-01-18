import { PricingCard } from "./pricing-card"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: ["One portfolio", "Basic templates", "5 GB storage", "Analytics dashboard", "Email support"],
  },
  {
    name: "Premium",
    price: 9,
    description: "For serious professionals",
    features: [
      "Unlimited portfolios",
      "All premium templates",
      "Unlimited storage",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Team collaboration",
      "Advanced exports",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations and teams",
    features: [
      "Everything in Premium",
      "Advanced security",
      "SSO & SAML",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Team management",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. Upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div key={plan.name} style={{ animationDelay: `${index * 100}ms` }} className="animate-entrance">
              <PricingCard
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
