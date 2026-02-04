import { useState } from "react";

export default function CustomerForm({ onCreate }: any) {
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
    <div>
      <h3>New customer</h3>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Company" onChange={e => setForm({ ...form, companyName: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />

      <button onClick={submit}>Create</button>
    </div>
  );
}