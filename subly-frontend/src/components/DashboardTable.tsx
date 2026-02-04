import { useState } from "react";

export default function DashboardTable({ subscriptions, onDelete }: any) {
  const [editing, setEditing] = useState<any>(null);

  const startEdit = (sub: any) => setEditing(sub);
  const closeEdit = () => setEditing(null);

  const saveEdit = (sub: any) => {
    // Llamada a API update
    closeEdit();
  };

  return (
    <>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Plan</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s: any) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{s.customer.name}</td>
              <td className="p-2">{s.plan.name}</td>
              <td className="p-2">{s.status}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => startEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Subscription</h2>

            <label className="block mb-2">Status</label>
            <select
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
              className="w-full border p-2 mb-4"
            >
              {["ACTIVE","PAUSED","CANCELLED"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeEdit}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => saveEdit(editing)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
