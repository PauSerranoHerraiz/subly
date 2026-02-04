import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import isAuthenticated from "../middleware/jwt.middleware";

const router = Router();
router.use(isAuthenticated);

router.get("/", async (req: Request, res: Response) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      customer: { companyId: req.auth!.companyId },
    },
    include: { customer: true, plan: true },
  });

  res.json(subscriptions);
});

router.post("/", async (req: Request, res: Response) => {
  const { customerId, planId } = req.body;

  // Validar que el cliente pertenece al usuario
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, userId: req.auth!.id },
  });
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  const subscription = await prisma.subscription.create({
    data: {
      customerId,
      planId,
      status: "ACTIVE",
    },
  });

  res.status(201).json(subscription);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { planId, status } = req.body;

  const subscription = await prisma.subscription.findUnique({
    where: { id: req.params.id },
    include: { customer: true },
  });

  if (!subscription || subscription.customer.userId !== req.auth!.id)
    return res.status(404).json({ message: "Subscription not found" });

  const updated = await prisma.subscription.update({
    where: { id: req.params.id },
    data: { planId, status },
  });

  res.json(updated);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id: req.params.id },
    include: { customer: true },
  });

  if (!subscription || subscription.customer.userId !== req.auth!.id)
    return res.status(404).json({ message: "Subscription not found" });

  await prisma.subscription.delete({ where: { id: req.params.id } });
  res.json({ message: "Subscription deleted" });
});

export default router;