"use server"
import { neon } from "@neondatabase/serverless";
import getENV from "@/lib/env";

const DB_URL = getENV("DATABASE_URL");
const getDbConnection = async () => {
    if(!DB_URL) {
        throw new Error("Database URL is not defined. Please set the DATABASE_URL environment variable.");
    }

    const sql = neon(DB_URL);
    return sql;
}

export default getDbConnection;