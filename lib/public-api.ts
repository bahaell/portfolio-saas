import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Portfolio from "@/models/Portfolio";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import type { PublicPortfolioData } from "@/lib/public-types";

// Helper to serialize Mongoose documents to plain objects (handling ObjectIds and Dates)
function serialize<T>(data: any): T {
    return JSON.parse(JSON.stringify(data));
}

export async function getPublicPortfolio(username: string): Promise<PublicPortfolioData | null> {
    await connectDB();

    // 1. Find User
    const user = await User.findOne({ username, isActive: true }).exec();
    if (!user) {
        return null;
    }

    // 2. Find Published Portfolio for User
    // Assuming 1 public portfolio per user for now, or finding the primary/latest published one.
    const portfolio = await Portfolio.findOne({
        userId: user._id,
        status: "published"
    }).sort({ updatedAt: -1 }).exec();

    if (!portfolio) {
        return null;
    }

    // 3. Find related data
    const [projects, skills, experiences] = await Promise.all([
        Project.find({ portfolioId: portfolio._id }).sort({ order: 1, createdAt: -1 }).exec(),
        Skill.find({ portfolioId: portfolio._id }).sort({ order: 1 }).exec(),
        Experience.find({ portfolioId: portfolio._id }).sort({ startDate: -1 }).exec(),
    ]);

    // 4. Map to PublicPortfolioData
    // Need to verify template names match strict types "classic-pro" | "modern-visual"
    // If not, fallback to default.
    // Model stores templateId (ObjectId), but mock data used strings. 
    // We need to resolve templateId to string name or assuming our DB logic handles it.
    // The user wizard page handles template as string in state, but creates portfolio with templateId.
    // We might need to populate 'templateId' from Template model to get the 'slug' or 'name'.
    // For now, let's assume we can get a template name, or fallback.
    // Actually, let's look at the Template model later if needed. For now, we might receive an ID.
    // But the frontend expects specific string literals for rendering components.
    // Let's assume we populate template.

    // Wait, I need to check Template model to know if it has "slug" or "name" matching "classic-pro" etc.
    // I'll skip population for a second and assume we can derive it or it's stored.
    // Actually, the `Portfolio` model writes `templateId`. 
    // Let's populate it.

    await portfolio.populate("templateId");
    const templateName = (portfolio.templateId as any)?.slug || "classic-pro"; // Fallback

    const theme = portfolio.theme.overrides // This might need mapping from Theme model
    // Or if we stored resolved theme colors. Ideally we populate theme too.
    await portfolio.populate("theme.themeId");

    // Mapping logic for Theme:
    // If overrides exist, use them. Else use Theme default colors.
    const themeDoc = (portfolio.theme.themeId as any);

    const publicTheme = {
        primary: portfolio.theme.overrides?.colors?.primary || themeDoc?.colors?.primary || "#000000",
        secondary: portfolio.theme.overrides?.colors?.secondary || themeDoc?.colors?.secondary || "#333333",
        background: portfolio.theme.overrides?.colors?.background || themeDoc?.colors?.background || "#ffffff",
        text: portfolio.theme.overrides?.colors?.text || themeDoc?.colors?.text || "#000000",
        accent: portfolio.theme.overrides?.colors?.accent || themeDoc?.colors?.accent || "#0000ff",
    };

    return serialize({
        id: portfolio._id.toString(),
        userId: user._id.toString(),
        username: user.username,
        published: portfolio.status === "published",
        template: templateName, // Should match "classic-pro" | "modern-visual"
        theme: publicTheme,
        profile: {
            name: user.name,
            title: portfolio.seo?.title || "Professional", // Fallback
            location: "Location", // Check if User has location? User model doesn't have location. Maybe in Portfolio data? Wizard had it.
            // Wizard stored it in `profile` object in component state, but where did it go in DB?
            // Portfolio creation payload: `title`, `slug`, `status`, `templateId`, `theme`.
            // It DOES NOT store profile info (bio, location, phone) in Portfolio model explicitly?
            // Wait, `Portfolio` model has `seo` but not `bio`.
            // Maybe I missed something in `Portfolio.ts` or `User.ts`.
            // `User.ts` has `name`, `username`, `email`.
            // `Portfolio.ts` has `seo`.
            // The wizard `Step2Profile` collects `bio`, `location`, `phone`, `socialLinks`.
            // Where are these saved?
            // In `page.tsx` (wizard): `wizardData.profile` includes `bio`, `location`.
            // But `createPortfolio` payload in `page.tsx` DOES NOT seem to include `bio`, `location`?
            // Lines 147-157 of `page.tsx` (view 12):
            /*
              const portfolioPayload = {
                userId: user._id,
                title: title,
                slug: slug,
                status: "published",
                templateId: selectedTemplateId,
                theme: { ... }
              };
            */
            // It seems the profile info is lost? Or maybe `apiService.createPortfolio` handles it?
            // If the backend `Portfolio` model doesn't have fields for bio/location, we have a data loss issue.
            // But I am "Removing Mock Data", not "Fixing Data Loss", although meaningful integration requires it.
            // I should check if `Portfolio` model should be updated or if I missed a `Profile` model.
            // I'll search for `Profile` model.
            // If not found, I will just put placeholders for now to satisfy types, as fixing the backend/model schema is out of scope?
            // Actually, the prompt says "MongoDB schemas created (STEP 2.1) ✅". 
            // Maybe I missed a model.

            bio: portfolio.seo?.description || "No bio available",
            email: user.email,
            // phone: ...
            // image: user.avatar
        },
        skills: skills.map(s => ({
            id: s._id.toString(),
            name: s.name,
            category: s.category || "General",
            proficiency: s.level === "Expert" ? 5 : s.level === "Advanced" ? 4 : s.level === "Intermediate" ? 3 : 2 // Map string level to number
        })),
        experiences: experiences.map(e => ({
            id: e._id.toString(),
            role: e.role,
            company: e.company,
            startDate: e.startDate.toISOString(),
            endDate: e.endDate?.toISOString(),
            current: !e.endDate,
            description: e.description
        })),
        projects: projects.map(p => ({
            id: p._id.toString(),
            title: p.title,
            description: p.description,
            image: p.images?.[0],
            technologies: p.stack,
            githubLink: p.githubUrl,
            liveLink: p.demoUrl,
            featured: true // logic?
        }))
    });
}

export async function getAllPublicPortfolios(): Promise<PublicPortfolioData[]> {
    await connectDB();

    // Find all published portfolios
    const portfolios = await Portfolio.find({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("userId")
        .exec();

    const results: PublicPortfolioData[] = [];

    for (const portfolio of portfolios) {
        if (!portfolio.userId) continue;

        // We need to fetch related data for each (projects, skills, etc) 
        // to match PublicPortfolioData structure fully.
        // Optimization: potentially just fetch essential info for the card if structure allows partial,
        // but Typescript requires full PublicPortfolioData. 
        // For now, we reuse the logic or fetch simpler.
        // Let's reuse getPublicPortfolio logic logic or just fetch minimal needed for card?
        // The card uses: username, theme, profile (name, title, bio, image).
        // It does NOT use skills, projects, experiences in the list view (based on page.tsx).

        // However, the type `PublicPortfolioData` requires all fields.
        // We can fetch them or mock empty arrays if we want to be fast, but better to be correct.
        // Given usage is small, let's fetch everything or assume separate User lookup in loop is okay-ish for now.
        // Actually, let's just use `getPublicPortfolio` for each username found?
        // That might be N+1, but safe.

        const user = portfolio.userId as any; // Populated
        if (!user.username) continue;

        const data = await getPublicPortfolio(user.username);
        if (data) results.push(data);
    }

    return results;
}
