import { useEffect, useState } from "react";
import { getCustomers, createCustomer, deleteCustomer } from "../api/customers";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err: any) {
      console.error("Error loading customers:", err);
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    try {
      await createCustomer(data);
      load();
    } catch (err: any) {
      console.error("Error creating customer:", err);
      alert(err.response?.data?.message || "Failed to create customer");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (err: any) {
      console.error("Error deleting customer:", err);
      alert(err.response?.data?.message || "Failed to delete customer");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Customers</h1>
      <CustomerForm onCreate={onCreate} />
      <CustomerList customers={customers} onDelete={onDelete} />
    </div>
  );
}