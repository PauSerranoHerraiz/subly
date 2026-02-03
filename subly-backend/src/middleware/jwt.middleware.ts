import { expressjwt } from "express-jwt";
import { Request } from "express";

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET!,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req: Request) => {
    if (req.headers.authorization?.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];
    }
    return undefined;
  },
});

export default isAuthenticated;