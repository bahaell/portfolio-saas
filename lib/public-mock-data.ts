import type { PublicPortfolioData, PublicUser } from "./public-types"

// Public user data
export const publicUsers: Record<string, PublicUser> = {
  sarahjohnson: {
    id: "user-1",
    username: "sarahjohnson",
    name: "Sarah Johnson",
    plan: "PREMIUM",
  },
  johndoe: {
    id: "user-2",
    username: "johndoe",
    name: "John Doe",
    plan: "FREE",
  },
}

// Public portfolio data
export const publicPortfolios: Record<string, PublicPortfolioData> = {
  sarahjohnson: {
    id: "port-1",
    userId: "user-1",
    username: "sarahjohnson",
    published: true,
    template: "modern-visual",
    theme: {
      primary: "#215E61",
      secondary: "#FE7F2D",
      background: "#F5FBE6",
      text: "#233D4D",
      accent: "#FE7F2D",
    },
    profile: {
      name: "Sarah Johnson",
      title: "Product Designer & Strategist",
      location: "San Francisco, CA",
      bio: "I'm a passionate product designer with 8+ years of experience creating beautiful, functional digital experiences. Specializing in SaaS, startups, and enterprise platforms.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
    },
    skills: [
      { id: "s1", name: "UI/UX Design", category: "Design", proficiency: 5 },
      { id: "s2", name: "Figma", category: "Design", proficiency: 5 },
      { id: "s3", name: "Product Strategy", category: "Strategy", proficiency: 4 },
      { id: "s4", name: "Design Systems", category: "Design", proficiency: 4 },
      { id: "s5", name: "User Research", category: "Research", proficiency: 4 },
      { id: "s6", name: "Prototyping", category: "Design", proficiency: 5 },
    ],
    experiences: [
      {
        id: "e1",
        role: "Senior Product Designer",
        company: "Vercel",
        startDate: "2022-01-15",
        current: true,
        description:
          "Lead product design initiatives and design system development. Collaborate with engineering and product teams to shape the future of web development.",
      },
      {
        id: "e2",
        role: "Product Designer",
        company: "Linear",
        startDate: "2019-06-01",
        endDate: "2021-12-31",
        current: false,
        description:
          "Designed core product features and owned the design system. Worked on improving user workflows and reducing friction.",
      },
      {
        id: "e3",
        role: "UX Designer",
        company: "Stripe",
        startDate: "2017-03-01",
        endDate: "2019-05-31",
        current: false,
        description: "Created designs for payment products. Focus on security, simplicity, and developer experience.",
      },
    ],
    projects: [
      {
        id: "p1",
        title: "Design System Overhaul",
        description:
          "Comprehensive design system with 200+ components, detailed documentation, and Figma integration. Used by 100+ developers.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
        technologies: ["Figma", "React", "TypeScript", "Storybook"],
        featured: true,
        liveLink: "https://example.com/design-system",
      },
      {
        id: "p2",
        title: "E-commerce Platform Redesign",
        description: "Complete UX overhaul reducing checkout flow from 7 steps to 3. Increased conversion by 35%.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
        technologies: ["Figma", "User Research", "Analytics"],
        featured: true,
        liveLink: "https://example.com/ecommerce",
      },
      {
        id: "p3",
        title: "Mobile App Design System",
        description: "iOS and Android component library with platform-specific guidelines and interaction patterns.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
        technologies: ["Figma", "iOS Design", "Android Design"],
        featured: true,
      },
      {
        id: "p4",
        title: "Brand Identity Package",
        description: "Complete brand guidelines including logo, color palette, typography, and brand voice.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
        technologies: ["Branding", "Design"],
        featured: false,
      },
    ],
  },
  johndoe: {
    id: "port-2",
    userId: "user-2",
    username: "johndoe",
    published: true,
    template: "classic-pro",
    theme: {
      primary: "#215E61",
      secondary: "#FE7F2D",
      background: "#F5FBE6",
      text: "#233D4D",
      accent: "#FE7F2D",
    },
    profile: {
      name: "John Doe",
      title: "Full Stack Developer",
      location: "Austin, TX",
      bio: "Building scalable web applications with modern technologies. 5+ years of experience in full-stack development.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      email: "john@example.com",
    },
    skills: [
      { id: "s1", name: "React", category: "Frontend", proficiency: 5 },
      { id: "s2", name: "TypeScript", category: "Frontend", proficiency: 4 },
      { id: "s3", name: "Node.js", category: "Backend", proficiency: 4 },
      { id: "s4", name: "PostgreSQL", category: "Database", proficiency: 4 },
    ],
    experiences: [
      {
        id: "e1",
        role: "Senior Developer",
        company: "TechCorp",
        startDate: "2021-01-01",
        current: true,
        description: "Leading development of core platform features.",
      },
      {
        id: "e2",
        role: "Full Stack Developer",
        company: "StartupXYZ",
        startDate: "2019-06-01",
        endDate: "2020-12-31",
        current: false,
        description: "Built full-stack features for SaaS product.",
      },
    ],
    projects: [
      {
        id: "p1",
        title: "Task Management App",
        description: "Real-time task management application with team collaboration features.",
        technologies: ["React", "Node.js", "PostgreSQL"],
        featured: true,
        liveLink: "https://example.com/tasks",
        githubLink: "https://github.com/johndoe/tasks",
      },
      {
        id: "p2",
        title: "Analytics Dashboard",
        description: "Real-time analytics dashboard with data visualization and export features.",
        technologies: ["React", "D3.js", "Node.js"],
        featured: true,
        githubLink: "https://github.com/johndoe/analytics",
      },
    ],
  },
}
