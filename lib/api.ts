import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export interface ApiUser {
    _id: string;
    email: string;
    name: string;
    username: string;
    plan: "FREE" | "PREMIUM";
    isActive: boolean;
}

export interface ApiPortfolio {
    _id: string;
    userId: string;
    title: string;
    slug: string;
    status: "draft" | "published";
    templateId: string;
    theme: {
        themeId: string;
        overrides?: any;
    };
    seo?: {
        title?: string;
        description?: string;
        image?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ApiProject {
    _id: string;
    portfolioId: string;
    title: string;
    description: string;
    stack: string[];
    images: string[];
    demoUrl?: string;
    githubUrl?: string;
}

export interface ApiSkill {
    _id: string;
    portfolioId: string;
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    category?: string;
}

export const apiService = {
    getUser: async (id: string) => {
        const response = await api.get<ApiUser>(`/users/${id}`);
        return response.data;
    },
    getPortfolios: async (userId: string) => {
        const response = await api.get<ApiPortfolio[]>(
            `/portfolios?userId=${userId}`
        );
        return response.data;
    },
    createPortfolio: async (data: any) => {
        const response = await api.post<ApiPortfolio>("/portfolios", data);
        return response.data;
    },
    updatePortfolio: async (id: string, data: any) => {
        const response = await api.put<ApiPortfolio>(`/portfolios/${id}`, data);
        return response.data;
    },
    getPortfolio: async (id: string) => {
        const response = await api.get<ApiPortfolio>(`/portfolios/${id}`);
        return response.data;
    },
    getProjects: async (portfolioId: string) => {
        const response = await api.get<ApiProject[]>(
            `/projects?portfolioId=${portfolioId}`
        );
        return response.data;
    },
    createProject: async (data: any) => {
        const response = await api.post<ApiProject>("/projects", data);
        return response.data;
    },
    getSkills: async (portfolioId: string) => {
        const response = await api.get<ApiSkill[]>(
            `/skills?portfolioId=${portfolioId}`
        );
        return response.data;
    },
    createSkill: async (data: any) => {
        const response = await api.post<ApiSkill>("/skills", data);
        return response.data;
    },
    createExperience: async (data: any) => {
        const response = await api.post<any>("/experiences", data); // Type any for now or interface
        return response.data;
    },
    getMe: async () => {
        const response = await api.get<ApiUser>("/auth/me");
        return response.data;
    },
    getThemes: async () => {
        const response = await api.get("/themes");
        return response.data;
    },
    getTemplates: async () => {
        const response = await api.get("/templates");
        return response.data;
    },
};

export default apiService;
