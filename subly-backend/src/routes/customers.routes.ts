import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import isAuthenticated from "../middleware/jwt.middleware";

const router = Router();
router.use(isAuthenticated);

// GET /customers
router.get("/", async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany({
    where: {
      companyId: req.auth!.companyId,
    },
  });

  res.json(customers);
});

// POST /customers
router.post("/", async (req: Request, res: Response) => {
  const { name, email, companyName, phone } = req.body;

  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      companyName,
      phone,
      companyId: req.auth!.companyId,
    },
  });

  res.status(201).json(customer);
});

// GET /customers/:id
router.get("/:id", async (req: Request, res: Response) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: req.params.id,
      companyId: req.auth!.companyId,
    },
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json(customer);
});

// PUT /customers/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { name, email, companyName, phone } = req.body;

  const updated = await prisma.customer.updateMany({
    where: {
      id: req.params.id,
      companyId: req.auth!.companyId,
    },
    data: {
      name,
      email,
      companyName,
      phone,
    },
  });

  if (updated.count === 0) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer updated" });
});

// DELETE /customers/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const deleted = await prisma.customer.deleteMany({
    where: {
      id: req.params.id,
      companyId: req.auth!.companyId,
    },
  });

  if (deleted.count === 0) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deleted" });
});

export default router;
