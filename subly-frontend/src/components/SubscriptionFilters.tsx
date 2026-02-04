export default function SubscriptionFilters({
  plans,
  filterPlan,
  setFilterPlan,
  filterStatus,
  setFilterStatus
}: any) {
  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)}>
        <option value="">All Plans</option>
        {plans.map((p: any) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="PAUSED">Paused</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
}
