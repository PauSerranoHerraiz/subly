import { useState } from "react";

export default function PlanForm({ onCreate }: any) {
  const [name, setName] = useState("");
  const [priceMonthly, setPriceMonthly] = useState(0);

  const submit = () => {
    onCreate({ name, priceMonthly: Number(priceMonthly) });
    setName("");
    setPriceMonthly(0);
  };

  return (
    <div>
      <h3>New plan</h3>

      <input
        placeholder="Plan name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price (cents)"
        value={priceMonthly}
        onChange={e => setPriceMonthly(Number(e.target.value))}
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}

