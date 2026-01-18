// import { publicPortfolios } from "@/lib/public-mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function ProjectsPage(props: Props) {
  const params = await props.params
  // const portfolio = publicPortfolios[params.username]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground">Project details are currently unavailable.</p>
      </div>
    </div>
  )
}
