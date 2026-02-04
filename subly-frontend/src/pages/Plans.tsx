import { useEffect, useState } from "react";
import { getPlans, createPlan, updatePlan, deletePlan } from "../api/plans";
import PlanForm from "../components/PlanForm";
import PlanList from "../components/PlanList";

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getPlans();
    setPlans(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    await createPlan(data);
    load();
  };

  const onUpdate = async (id: string, data: any) => {
    await updatePlan(id, data);
    load();
  };

  const onDelete = async (id: string) => {
    await deletePlan(id);
    setPlans(plans.filter(p => p.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Plans</h1>

      <PlanForm onCreate={onCreate} />
      <PlanList plans={plans} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
