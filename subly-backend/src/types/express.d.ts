import "express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        id: string;
        email: string;
        role?: "ADMIN" | "MEMBER";
        companyId?: string;
        iat?: number;
        exp?: number;
      };
    }
  }
}
