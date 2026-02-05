import { useEffect, useState } from "react";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptions";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";
import { useToast } from "../components/ToastProvider";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

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
    addToast("Subscription created");
    load();
  };

  const onUpdate = async (id: string, data: any) => {
    await updateSubscription(id, data);
    addToast("Subscription updated");
    load();
  };

  const onDelete = async (id: string) => {
    await deleteSubscription(id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    addToast("Subscription deleted", "info");
  };

  const activeCount = subscriptions.filter(  import { Link } from "react-router-dom";
  
  export default function Landing() {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="text-2xl font-bold text-lime-400">Subly</div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 text-sm font-semibold"
            >
              Get started
            </Link>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Manage subscriptions <span className="text-lime-400">in minutes</span>
            </h1>
            <p className="text-gray-400 mt-4 text-lg">
              Centraliza clientes, planes y suscripciones en un solo panel.
              Empieza gratis en menos de 2 minutos.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/signup"
                className="px-5 py-3 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold"
              >
                Create account
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                I already have an account
              </Link>
            </div>
          </div>
  
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-sm text-gray-400">Active subs</p>
                <p className="text-2xl font-bold text-lime-400">128</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-sm text-gray-400">MRR</p>
                <p className="text-2xl font-bold">€4,320</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 col-span-2">
                <p className="text-sm text-gray-400 mb-2">Latest customers</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>Acme Inc.</li>
                  <li>Nova Labs</li>
                  <li>BrightPay</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
  
        <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Clients", desc: "Organiza clientes y datos clave." },
            { title: "Plans", desc: "Crea planes mensuales fácilmente." },
            { title: "Dashboard", desc: "Visualiza el estado en tiempo real." },
          ].map((f) => (
            <div key={f.title} className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-gray-400 mt-2">{f.desc}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }
    (s) => s.status === "ACTIVE"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage customer subscriptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full">
            {subscriptions.length} total
          </span>
          <span className="text-sm text-lime-400 bg-lime-500/10 border border-lime-400/20 px-3 py-1 rounded-full">
            {activeCount} active
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading subscriptions…
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              New subscription
            </h2>
            <SubscriptionForm onCreate={onCreate} />
          </div>

          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Subscription list
            </h2>

            {subscriptions.length === 0 ? (
              <div className="text-gray-400 py-10 text-center">
                No subscriptions yet
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-auto pr-1">
                <SubscriptionList
                  subscriptions={subscriptions}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
