import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers";
import { getPlans } from "../api/plans";

export default function SubscriptionForm({ onCreate }: any) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [customersData, plansData] = await Promise.all([
          getCustomers(),
          getPlans(),
        ]);
        setCustomers(customersData);
        setPlans(plansData);

        // Auto-seleccionar el primer customer y plan
        if (customersData.length > 0) setCustomerId(customersData[0].id);
        if (plansData.length > 0) setPlanId(plansData[0].id);
      } catch (err: any) {
        console.error("Error loading data:", err);
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const submit = async () => {
    if (!customerId || !planId) {
      alert("Please select both customer and plan");
      return;
    }

    try {
      await onCreate({ customerId, planId });
      alert("Subscription created successfully!");
    } catch (err: any) {
      console.error("Error creating subscription:", err);
      alert(err.response?.data?.message || "Failed to create subscription");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (customers.length === 0) {
    return (
      <div>
        <h3>Create Subscription</h3>
        <p>⚠️ No customers found. Please create a customer first in the Customers page.</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div>
        <h3>Create Subscription</h3>
        <p>⚠️ No plans found. Please create a plan first in the Plans page.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Create Subscription</h3>

      <label>
        Customer:
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
          <option value="">Select customer...</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {c.email}
            </option>
          ))}
        </select>
      </label>

      <label>
        Plan:
        <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
          <option value="">Select plan...</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ${p.priceMonthly}/month
            </option>
          ))}
        </select>
      </label>

      <button onClick={submit}>Create Subscription</button>
    </div>
  );
}
