import { useState } from "react";

type PlanFormProps = {
  onCreate: (data: { name: string; priceMonthly: number }) => void;
};

export default function PlanForm({ onCreate }: PlanFormProps) {
  const [name, setName] = useState("");
  const [priceMonthly, setPriceMonthly] = useState<number | "">("");

  const submit = () => {
    if (!name || priceMonthly === "") return;
    const priceInCents = Math.round(Number(priceMonthly) * 100);
    onCreate({ name, priceMonthly: priceInCents });
    setName("");
    setPriceMonthly("");
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        placeholder="Plan name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
      />

      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
        <input
          type="number"
          placeholder="Price / month"
          value={priceMonthly}
          onChange={(e) => setPriceMonthly(Number(e.target.value))}
          step="0.01"
          className="w-full bg-gray-700 text-white placeholder-gray-400 px-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
        <span className="absolute right-3 top-2.5 text-gray-400 text-sm">/mo</span>
      </div>

      <button
        onClick={submit}
        className="bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold rounded-lg transition px-4 py-2"
      >
        Create plan
      </button>
    </div>
  );
}
