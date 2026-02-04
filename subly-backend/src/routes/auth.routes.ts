import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import isAuthenticated from "../middleware/jwt.middleware";

const router = Router();
const saltRounds = 10;

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, companyName } = req.body;

  if (!email || !password || !companyName)
    return res.status(400).json({ message: "Provide email, password, companyName" });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const company = await prisma.company.create({
    data: {
      name: companyName,
      users: {
        create: {
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      },
    },
    include: { users: true },
  });

  const user = company.users[0];
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, companyId: company.id },
    process.env.TOKEN_SECRET!,
    { algorithm: "HS256", expiresIn: "6h" }
  );

  res.status(201).json({ authToken: token, user: { id: user.id, email: user.email, role: user.role, companyId: company.id } });
});


router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Provide email and password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});


router.get("/verify", isAuthenticated, (req: Request, res: Response) => {
  res.status(200).json(req.auth);
});

export default router;
