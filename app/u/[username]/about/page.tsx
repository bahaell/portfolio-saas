// import { publicPortfolios } from "@/lib/public-mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function AboutPage(props: Props) {
  const params = await props.params
  // Mock data disabled.

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">About</h1>
        <p className="text-muted-foreground">About section is currently unavailable.</p>
      </div>
    </div>
  )
}
