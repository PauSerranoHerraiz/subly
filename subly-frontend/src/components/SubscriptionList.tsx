import { useState } from "react";

export default function SubscriptionList({ subscriptions, onUpdate, onDelete }: any) {
  return (
    <ul>
      {subscriptions.map((s: any) => (
        <SubscriptionItem
          key={s.id}
          subscription={s}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function SubscriptionItem({ subscription, onUpdate, onDelete }: any) {
  const [editing, setEditing] = useState(false);
  const [planId, setPlanId] = useState(subscription.plan.id);
  const [status, setStatus] = useState(subscription.status);

  const save = () => {
    onUpdate(subscription.id, { planId, status });
    setEditing(false);
  };

  return (
    <li>
      Customer: {subscription.customer.name} — Plan: {subscription.plan.name} — Status: {subscription.status}

      {editing ? (
        <>
          <input value={planId} onChange={e => setPlanId(e.target.value)} placeholder="PlanId" />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button onClick={save}>Save</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Edit</button>
      )}

      <button onClick={() => onDelete(subscription.id)}>Delete</button>
    </li>
  );
}
