import { useEffect, useState } from "react";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptions";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getSubscriptions();
    setSubscriptions(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    await createSubscription(data);
    load();
  };

  const onUpdate = async (id: string, data: any) => {
    await updateSubscription(id, data);
    load();
  };

  const onDelete = async (id: string) => {
    await deleteSubscription(id);
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscriptions</h1>

      <SubscriptionForm onCreate={onCreate} />
      <SubscriptionList
        subscriptions={subscriptions}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
