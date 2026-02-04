import type { Subscription } from "../types";

export default function StatsPanel({ subscriptions }: { subscriptions: Subscription[] }) {
  const total = subscriptions.length;
  const active = subscriptions.filter(s => s.status === "ACTIVE").length;
  const paused = subscriptions.filter(s => s.status === "PAUSED").length;
  const cancelled = subscriptions.filter(s => s.status === "CANCELLED").length;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>Total subscriptions: {total}</div>
      <div>Active: {active}</div>
      <div>Paused: {paused}</div>
      <div>Cancelled: {cancelled}</div>
    </div>
  );
}
