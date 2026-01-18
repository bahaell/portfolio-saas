import type { PublicPortfolioData, PublicUser } from "./public-types"

// Public user data
export const publicUsers: Record<string, PublicUser> = {}
// {
//   sarahjohnson: {
//     id: "user-1",
//     username: "sarahjohnson",
//     name: "Sarah Johnson",
//     plan: "PREMIUM",
//   },
//   ...
// }

// Public portfolio data
export const publicPortfolios: Record<string, PublicPortfolioData> = {}
// {
//   sarahjohnson: {
//     id: "port-1",
//     userId: "user-1",
//     username: "sarahjohnson",
//     published: true,
//     template: "modern-visual",
//     ...
//   },
//   ...
// }
