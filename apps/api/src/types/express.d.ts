import { InsertToken } from "@repo/db";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
