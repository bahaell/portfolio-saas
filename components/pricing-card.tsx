import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  name: string
  price: number | string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({ name, price, description, features, highlighted }: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        highlighted
          ? "border-accent bg-gradient-to-br from-accent/5 to-white shadow-premium-lg scale-105 md:scale-100 md:ring-2 md:ring-accent/30"
          : "border-primary/20 bg-white shadow-sm hover:shadow-premium hover:border-primary/40"
      } hover-lift`}
    >
      <div className="p-8 md:p-10">
        <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground mb-8 text-sm">{description}</p>

        {/* Pricing */}
        <div className="mb-10">
          {typeof price === "number" ? (
            <>
              <span className="text-5xl font-bold text-foreground">${price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </>
          ) : (
            <span className="text-5xl font-bold text-foreground">{price}</span>
          )}
        </div>

        <Button
          className={`w-full mb-10 font-semibold transition-all duration-300 ${
            highlighted
              ? "bg-accent hover:bg-accent text-accent-foreground shadow-md hover:shadow-lg"
              : "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          Get Started
        </Button>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
