import { InsertToken } from "@repo/db";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESS: string;
      JWT_REFRESH: string;
      WEB_URL: string;
      DB_URL: string;
      NODE_ENV: "production" | "development"
    }
  }
}