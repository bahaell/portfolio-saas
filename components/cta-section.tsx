import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-accent/10 via-white to-primary/5 border border-primary/30 rounded-2xl p-12 md:p-16 text-center shadow-premium-lg">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Ready to Showcase Your Work?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have already created amazing portfolios with Portfora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button className="px-8 py-3 text-lg bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold rounded-lg">
                Create Your Portfolio Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 font-semibold rounded-lg"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
