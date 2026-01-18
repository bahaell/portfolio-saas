import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Introducing AI-Powered Portfolio Layouts</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center text-foreground leading-tight mb-6 text-balance">
          Your Professional Portfolio, <span className="text-accent">Elevated</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Showcase your work to the world with stunning templates designed by top designers. Get noticed by clients and
          employers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/auth/register">
            <Button className="px-8 py-3 text-lg bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-lg font-semibold">
              Create Your Portfolio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 rounded-lg font-semibold"
          >
            View Examples
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative mt-16 animate-slide-up">
          <div className="bg-gradient-to-b from-accent/10 to-primary/5 rounded-2xl border border-primary/20 overflow-hidden shadow-premium-lg hover:shadow-premium-lg hover:border-primary/40 transition-all duration-500">
            <img src="/modern-portfolio-dashboard.jpg" alt="Portfolio platform showcase" className="w-full h-auto" />
          </div>
          <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-2xl" />
        </div>
      </div>
    </section>
  )
}
