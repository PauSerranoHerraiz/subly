import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SubscriptionChart({ subscriptions }: { subscriptions: any[] }) {
  const data = [
    { name: "Active", value: subscriptions.filter(s => s.status === "ACTIVE").length },
    { name: "Paused", value: subscriptions.filter(s => s.status === "PAUSED").length },
    { name: "Cancelled", value: subscriptions.filter(s => s.status === "CANCELLED").length },
  ];

  const colors = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <PieChart width={250} height={250}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
