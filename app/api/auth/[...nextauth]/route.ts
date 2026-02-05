import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt", // Using JWT for session to reduce DB hits, though Adapter defaults to database sessions. NextAuth with Adapter defaults to database strategy. Let's explicit set to "database" or actually "jwt" can work with adapter but adapter persists users.
        // If we use 'database' strategy (default with adapter), session token is stored in DB.
        // For simplicity and performance, JWT is often preferred but let's stick to default adapter behavior which is 'database' usually, or forced.
        // Actually, "jwt" is easier for middleware protection (stateless).
        // Let's use "jwt" strategy even with adapter (adapter handles user persistence, jwt handles session).
    },
    callbacks: {
        async session({ session, token, user }) {
            // If strategy is "jwt", 'token' is available. If "database", 'user' is available.
            // With "jwt" strategy, we need to persist user info into the token first.
            if (session.user && token) {
                session.user.id = token.sub as string;
                // We might need to fetch the user plan from DB if it's not in the token.
                // Or add it to the token in jwt callback.
                session.user.plan = (token as any).plan || "FREE";
            }
            return session
        },
        async jwt({ token, user, trigger, session }) {
            // user is only available on sign in
            if (user) {
                token.id = user.id;
                // @ts-ignore
                token.plan = user.plan || "FREE";
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
