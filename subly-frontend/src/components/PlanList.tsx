import { useState } from "react";

export default function PlanList({ plans, onUpdate, onDelete }: any) {
  return (
    <ul>
      {plans.map((plan: any) => (
        <PlanItem
          key={plan.id}
          plan={plan}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function PlanItem({ plan, onUpdate, onDelete }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(plan.name);
  const [price, setPrice] = useState(plan.priceMonthly);

  const save = () => {
    onUpdate(plan.id, { name, priceMonthly: price });
    setEditing(false);
  };

  return (
    <li>
      {editing ? (
        <>
          <input value={name} onChange={e => setName(e.target.value)} />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
          <button onClick={save}>Save</button>
        </>
      ) : (
        <>
          <strong>{plan.name}</strong> — {plan.priceMonthly / 100} €
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(plan.id)}>Delete</button>
    </li>
  );
}
