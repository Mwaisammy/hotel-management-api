import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "drizzle-kit";

// Safety check for environment variable
if (!process.env.Database_URL) {
  throw new Error("DATABASE_URL is not defined in your .env file");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/Drizzle/schema.ts",
  out: "./src/Drizzle/migrations",
  dbCredentials: {
    url: process.env.Database_URL, 
  },
  verbose: true,
  strict: true,
});
