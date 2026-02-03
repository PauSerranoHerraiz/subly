import { JWTPayload } from "express-jwt";

declare global {
  namespace Express {
    interface Request {
      auth?: JWTPayload;
    }
  }
}