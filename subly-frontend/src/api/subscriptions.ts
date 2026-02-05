import api from "./axios";

export const getSubscriptions = async () => {
  try {
    const response = await api.get("/subscriptions");
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching subscriptions:", error.message);
    throw error;
  }
};

export const createSubscription = async (data: {
  customerId: string;
  planId: string;
  status?: string;
}) => {
  try {
    console.log("📝 Creating subscription:", data);
    const response = await api.post("/subscriptions", data);
    console.log("✅ Subscription created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Create error:", error.message);
    throw error;
  }
};

export const updateSubscription = async (
  id: string,
  data: { status?: string; planId?: string }
) => {
  try {
    console.log("📝 Updating subscription:", id, data);
    const response = await api.patch(`/subscriptions/${id}`, data);
    console.log("✅ Subscription updated:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Update error:", error.message);
    throw error;
  }
};

export const deleteSubscription = async (id: string) => {
  try {
    const response = await api.delete(`/subscriptions/${id}`);
    console.log("✅ Subscription deleted");
    return response.data;
  } catch (error: any) {
    console.error("❌ Delete error:", error.message);
    throw error;
  }
};