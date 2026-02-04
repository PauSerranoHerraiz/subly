import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboard";
import StatsPanel from "../components/StatsPanel";
import SubscriptionFilters from "../components/SubscriptionFilters";
import DashboardTable from "../components/DashboardTable";
import SubscriptionChart from "../components/SubscriptionChart";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [filterPlan, setFilterPlan] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getDashboardData();
    setSubscriptions(data.subscriptions);
    setPlans(data.plans);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = subscriptions.filter(s =>
    (!filterPlan || s.plan.id === filterPlan) &&
    (!filterStatus || s.status === filterStatus)
  );

  const onDelete = async (id: string) => {
    await fetch(`/subscriptions/${id}`, { method: "DELETE" });
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Panel de estadísticas rápidas */}
      <StatsPanel subscriptions={subscriptions} />

      {/* Gráfico circular de estados de suscripciones */}
      <div className="flex gap-10 mb-6">
        <SubscriptionChart subscriptions={subscriptions} />
        {/* Aquí podrías añadir otra gráfica o KPI adicional */}
      </div>

      {/* Filtros */}
      <SubscriptionFilters
        plans={plans}
        filterPlan={filterPlan}
        setFilterPlan={setFilterPlan}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Tabla con CRUD de suscripciones */}
      <DashboardTable subscriptions={filtered} onDelete={onDelete} />
    </div>
  );
}
