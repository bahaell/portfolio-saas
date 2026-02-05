import { getPublicPortfolio } from "@/lib/public-api"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function ProjectsPage(props: Props) {
  const params = await props.params
  const portfolio = await getPublicPortfolio(params.username)

  if (!portfolio) {
    return <div>Portfolio not found</div>
  }

  const projects = portfolio.projects

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-lg opacity-70">Explore my featured projects and recent work</p>
      </div>

      <div className="grid gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg overflow-hidden hover-lift"
            style={{
              borderColor: portfolio.theme.primary + "40",
            }}
          >
            {project.image && (
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="opacity-70 mb-4">{project.description}</p>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: portfolio.theme.primary + "20",
                        color: portfolio.theme.primary,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      style={{
                        backgroundColor: portfolio.theme.primary,
                        color: "white",
                      }}
                    >
                      View Live
                    </Button>
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">View Code</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
