export interface RuntimePortfolioData {
    portfolio: {
        title: string
        seo?: {
            title?: string
            description?: string
            image?: string
        }
    }
    user: {
        name: string
        email: string
        image?: string
        socials?: {
            linkedin?: string
            github?: string
            twitter?: string
            [key: string]: string | undefined
        }
        about?: string // Fallback if no specific section content
    }
    projects: any[]
    skills: any[]
    experiences: any[]
}

export interface PortfolioLayoutProps {
    data: RuntimePortfolioData
}
