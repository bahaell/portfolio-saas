import { getPublicPortfolio } from "@/lib/public-api"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

export default async function AboutPage(props: Props) {
  const params = await props.params
  const portfolio = await getPublicPortfolio(params.username)

  if (!portfolio) {
    return <div>Portfolio not found</div>
  }

  const { profile, experiences, skills } = portfolio

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link href={`/u/${params.username}`}>
        <Button variant="outline" className="mb-8 bg-transparent">
          ← Back to Portfolio
        </Button>
      </Link>

      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          {profile.image && (
            <img src={profile.image || "/placeholder.svg"} alt={profile.name} className="w-full rounded-lg mb-6" />
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
          <p className="text-xl mb-6 font-medium" style={{ color: portfolio.theme.primary }}>
            {profile.title}
          </p>
          <p className="text-lg leading-relaxed opacity-80 mb-8">{profile.bio}</p>

          <div className="space-y-4">
            {profile.email && (
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${profile.email}`} className="opacity-70 hover:opacity-100">
                  {profile.email}
                </a>
              </p>
            )}
            {profile.phone && (
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href={`tel:${profile.phone}`} className="opacity-70 hover:opacity-100">
                  {profile.phone}
                </a>
              </p>
            )}
            {profile.location && (
              <p>
                <span className="font-semibold">Location:</span> {profile.location}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border-l-4 pl-6"
              style={{
                borderColor: portfolio.theme.primary,
              }}
            >
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <p style={{ color: portfolio.theme.primary }} className="font-semibold mb-2">
                {exp.company}
              </p>
              <p className="text-sm opacity-70 mb-3">
                {new Date(exp.startDate).getFullYear()} -{" "}
                {exp.current ? "Present" : new Date(exp.endDate || "").getFullYear()}
              </p>
              <p className="opacity-80">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: portfolio.theme.primary + "10",
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-sm opacity-70">{skill.category}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(skill.proficiency / 5) * 100}%`,
                    backgroundColor: portfolio.theme.primary,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
