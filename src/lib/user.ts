import getDbConnection from './db';
import { GetUserUploadCount } from './summary';
import { PricingPlans } from '@/utils/constants';
import bcrypt from 'bcryptjs';

export const CreateUser = async (fullName: string, email: string, password: string) => {
    const sql = await getDbConnection();
    const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length) {
        throw new Error('User already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Hashed password:", hashedPassword)

    const result = await sql`
        INSERT INTO users (full_name, email, password)
        VALUES (${fullName}, ${email}, ${hashedPassword})
        RETURNING *
    `;

    return result[0];
}

export const UpdateUser = async (fullName: string, email: string, password?: string) => {
    const sql = await getDbConnection();
    const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email}
    `;
    if (!existingUser.length) {
        throw new Error('User does not exist');
    }

    let result;

    if (password) {
        result = await sql`
            UPDATE users
            SET full_name = ${fullName}, password = ${password}
            WHERE email = ${email}
            RETURNING *
        `;
    } else {
        result = await sql`
            UPDATE users
            SET full_name = ${fullName}
            WHERE email = ${email}
            RETURNING *
        `;
    }
    return result[0];
}

export const GetUserByEmailAndPassword = async (email: string, password: string) => {
    const sql = await getDbConnection();
    // Decrypt the password before checking
    const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email}
    `;
    if (!existingUser.length) {
        return null;
    }
    const isValid = await bcrypt.compare(password, existingUser[0].password);
    if (!isValid) {
        return null;
    }
    return existingUser;
}

export const GetUserPlan = async (email: string) => {
    const sql = await getDbConnection();
    const user = await sql`
        SELECT price_id FROM users WHERE email = ${email}
    `;

    return user?.[0]?.price_id || null;
}

export const GetUserUploadLimit = async (userId: string, email?: string) => {
    const uploadCount = await GetUserUploadCount(userId);
    const dailyCount = typeof uploadCount === 'object' && uploadCount !== null ? uploadCount.dailyCount : 0;
    const monthlyCount = typeof uploadCount === 'object' && uploadCount !== null ? uploadCount.monthlyCount : 0;
    const priceId = await GetUserPlan(email? email : "");
    
    const plan = PricingPlans.find((plan) => plan.priceId === priceId);
    const isPro = (plan?.title === "Pro");
    console.log("🔍 User upload limits:", { dailyCount, monthlyCount, isPro });
    const dailyUploadLimit: number = isPro ? 1000 : 5;
    const monthlyUploadLimit: number = isPro ? 10000 : 15;

    return { 
        hasReachedDailyLimit: dailyCount >= dailyUploadLimit,
        hasReachedMonthlyLimit: monthlyCount >= monthlyUploadLimit,
        dailyUploadLimit,
        monthlyUploadLimit,
    }
}