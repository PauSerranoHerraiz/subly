import { useState } from "react";

type CustomerFormProps = {
  onCreate: (data: { name: string; email: string; companyName: string; phone: string }) => void;
};

export default function CustomerForm({ onCreate }: CustomerFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
  });

  const submit = () => {
    onCreate(form);
    setForm({ name: "", email: "", companyName: "", phone: "" });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md max-w-md mb-6">
      <h3 className="text-xl font-bold text-white mb-4">New Customer</h3>

      <div className="flex flex-col gap-3">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        />
        <input
          placeholder="Company"
          value={form.companyName}
          onChange={e => setForm({ ...form, companyName: e.target.value })}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        />
      </div>

      <button
        onClick={submit}
        className="mt-4 w-full py-3 bg-lime-500 text-gray-900 font-semibold rounded-lg hover:bg-lime-400 transition"
      >
        Create
      </button>
    </div>
  );
}
