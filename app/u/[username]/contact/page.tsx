// import { publicPortfolios } from "@/lib/public-mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function ContactPage(props: Props) {
  const params = await props.params
  // Mock data disabled.

  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-muted-foreground">Contact information is currently unavailable.</p>
      </div>
    </div>
  )
}
