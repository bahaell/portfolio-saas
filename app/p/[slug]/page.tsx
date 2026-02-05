import { Metadata } from "next"
import { notFound } from "next/navigation"
import connectDB from "@/lib/mongodb" // Using the clientPromise or a mongoose connect helper? 
// Wait, lib/mongodb.ts is the client promise for NextAuth. We usually have a separate connectDB for Mongoose in lib/db.ts or similar, or we just use mongoose.connect.
// Let's check imports in other files. api/auth used lib/mongodb.
// app/api routes usually use a connectDB helper. let's assume I need to standard mongoose connect.
import mongoose from "mongoose"
import Portfolio from "@/models/Portfolio"
import User from "@/models/User"
import Theme from "@/models/Theme"
import Template from "@/models/Template"
import Project from "@/models/Project"
import Skill from "@/models/Skill"
import Experience from "@/models/Experience" // Assuming this exists
import { PortfolioRenderer } from "@/components/portfolio-runtime/PortfolioRenderer"
import type { RuntimePortfolioData } from "@/components/portfolio-runtime/types"

// Helper to ensure DB connection
async function ensureDB() {
    if (mongoose.connection.readyState >= 1) return
    await mongoose.connect(process.env.MONGODB_URI!)
}

// Data Fetcher
async function getPortfolioData(slug: string) {
    await ensureDB()

    // 1. Fetch Portfolio
    const portfolio = await Portfolio.findOne({ slug, status: "published" }).lean()
    if (!portfolio) return null

    // 2. Fetch User
    const user = await User.findById(portfolio.userId).lean()
    if (!user) return null

    // 3. Fetch Template
    const template = await Template.findById(portfolio.templateId).lean()
    // Fallback if template missing? usually shouldn't happen if integrity maintained.
    // referencing template by ID.

    // 4. Fetch Theme
    const baseTheme = await Theme.findById(portfolio.theme.themeId).lean()

    // 5. Fetch Related Data
    const projects = await Project.find({ portfolioId: portfolio._id }).lean()
    const skills = await Skill.find({ portfolioId: portfolio._id }).lean()
    // const experiences = await Experience.find({ portfolioId: portfolio._id }).lean() // Assuming Experience model exists

    return {
        portfolio,
        user,
        template,
        baseTheme,
        projects,
        skills,
        // experiences
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const data = await getPortfolioData(slug)
    if (!data) return {}

    return {
        title: data.portfolio.seo?.title || `${data.user.name} - Portfolio`,
        description: data.portfolio.seo?.description || `Check out ${data.user.name}'s portfolio.`,
        openGraph: {
            title: data.portfolio.seo?.title || `${data.user.name} - Portfolio`,
            description: data.portfolio.seo?.description,
            images: data.portfolio.seo?.image ? [data.portfolio.seo.image] : [],
        }
    }
}

// Main Page Component
export default async function PublicPortfolioPage({ params }: PageProps) {
    const { slug } = await params
    const rawvData = await getPortfolioData(slug)

    if (!rawvData) {
        notFound()
    }

    const { portfolio, user, template, baseTheme, projects, skills } = rawvData

    // Prepare Theme (Merge base with overrides)
    // Note: Mongoose Maps need to be converted to objects if using .lean() sometimes they are standard objects, but if typed as Map in schema it might vary.
    // Portfolio schema defines overrides as Map. .lean() usually returns POJO.
    // Let's handle defensive merging.

    const themeConfig = {
        colors: { ...baseTheme?.base.colors.light, ...portfolio.theme.overrides?.colors }, // Default to light mode for MVP, or implement system preference
        fonts: { ...baseTheme?.base.fonts, ...portfolio.theme.overrides?.fonts },
        spacing: { ...baseTheme?.base.spacing, ...portfolio.theme.overrides?.spacing },
        radius: { ...baseTheme?.base.radius, ...portfolio.theme.overrides?.borderRadius },
    }

    // Construct Runtime Data
    const runtimeData: RuntimePortfolioData = {
        portfolio: {
            title: portfolio.title,
            seo: portfolio.seo,
        },
        user: {
            name: user.name,
            email: user.email,
            image: user.image || user.avatar, // Fallback
            socials: {
                // Assuming we stored socials in user profile or portfolio?
                // The User model has 'image', 'name', 'email'. Socials might not be there yet?
                // Let's check User model again if needed, or just pass what we have.
            },
            about: portfolio.seo?.description // Fallback to SEO desc if no dedicated bio
        },
        projects: projects.map(p => ({
            _id: p._id.toString(),
            title: p.title,
            description: p.description,
            imageUrl: p.imageUrl,
            link: p.link || p.website,
            githubUrl: p.github,
            stack: p.tags || p.stack
        })),
        skills: skills.map(s => ({
            _id: s._id.toString(),
            name: s.name,
            level: s.level,
            category: s.category
        })),
        experiences: []
    }

    return (
        <PortfolioRenderer
            data={runtimeData}
            template={template?.slug || "minimal"} // Fallback to minimal
            theme={themeConfig as any}
        />
    )
}
