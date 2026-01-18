import { publicPortfolios } from "@/lib/public-mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function ContactPage(props: Props) {
  const params = await props.params
  const portfolio = publicPortfolios[params.username]

  if (!portfolio) {
    return <div>Portfolio not found</div>
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-lg opacity-70">Have a project in mind? Let's work together.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          {portfolio.profile.email && (
            <div className="mb-6">
              <p className="text-sm opacity-70 mb-1">Email</p>
              <a href={`mailto:${portfolio.profile.email}`} className="text-lg font-semibold hover:opacity-70">
                {portfolio.profile.email}
              </a>
            </div>
          )}

          {portfolio.profile.phone && (
            <div className="mb-6">
              <p className="text-sm opacity-70 mb-1">Phone</p>
              <a href={`tel:${portfolio.profile.phone}`} className="text-lg font-semibold hover:opacity-70">
                {portfolio.profile.phone}
              </a>
            </div>
          )}

          {portfolio.profile.location && (
            <div className="mb-6">
              <p className="text-sm opacity-70 mb-1">Location</p>
              <p className="text-lg font-semibold">{portfolio.profile.location}</p>
            </div>
          )}
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <Input placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input type="email" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <Textarea placeholder="Tell me about your project..." rows={5} required />
          </div>
          <Button
            type="submit"
            style={{
              backgroundColor: portfolio.theme.primary,
              color: "white",
            }}
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
