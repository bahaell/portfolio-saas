import type React from "react"
import type { Metadata } from "next"
import { publicPortfolios, publicUsers } from "@/lib/public-mock-data"
import { PublicPortfolioHeader } from "@/components/public/header"
import { PublicPortfolioFooter } from "@/components/public/footer"

interface Props {
  params: Promise<{ username: string }>
  children: React.ReactNode
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const portfolio = publicPortfolios[params.username]
  const user = publicUsers[params.username]

  if (!portfolio || !user) {
    return {
      title: "Portfolio Not Found",
      description: "This portfolio does not exist or is not published.",
    }
  }

  return {
    title: `${user.name} | Portfora`,
    description: portfolio.profile.bio || `Portfolio of ${user.name}`,
    authors: [{ name: user.name }],
    openGraph: {
      title: user.name,
      description: portfolio.profile.bio,
      type: "profile",
      url: `https://portfora.app/u/${params.username}`,
    },
    twitter: {
      card: "summary_large_image",
      title: user.name,
      description: portfolio.profile.bio,
    },
  }
}

export default async function PublicPortfolioLayout(props: Props) {
  const params = await props.params
  const portfolio = publicPortfolios[params.username]

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-muted-foreground">
            The portfolio you're looking for doesn't exist or hasn't been published yet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: portfolio.theme.background,
        color: portfolio.theme.text,
      }}
    >
      <PublicPortfolioHeader portfolio={portfolio} />
      <main className="flex-1">{props.children}</main>
      <PublicPortfolioFooter />
    </div>
  )
}
