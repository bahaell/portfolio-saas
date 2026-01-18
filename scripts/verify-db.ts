
import fs from 'fs';
import path from 'path';

// 1. Load Env
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/^"|"$/g, '');
                if (key && value) {
                    process.env[key] = value;
                }
            }
        });
    }
} catch (e) {
    console.warn("Could not read .env.local", e);
}

// 2. Main function with dynamic imports
async function verify() {
    try {
        // Dynamic imports to ensure env vars are set before db.ts is evaluated
        const { connectDB } = await import('../lib/db');
        const { default: User } = await import('../models/User');
        const { default: Portfolio } = await import('../models/Portfolio');

        await connectDB();
        console.log('✅ Connected to MongoDB');

        const userCount = await User.countDocuments();
        console.log(`- Users found: ${userCount}`);

        if (userCount > 0) {
            const u = await User.findOne();
            console.log(`  > Sample User: ${u?.email}`);
        }

        const portfolioCount = await Portfolio.countDocuments();
        console.log(`- Portfolios found: ${portfolioCount}`);

        if (portfolioCount > 0) {
            const p = await Portfolio.findOne();
            console.log(`  > Sample Portfolio: "${p?.title}" (Slug: ${p?.slug})`);
        } else {
            console.log("  > No portfolios found yet. Try creating one via the Wizard!");
        }

    } catch (error) {
        console.error("❌ DB Verification Failed:", error);
    }
    process.exit();
}

verify();
