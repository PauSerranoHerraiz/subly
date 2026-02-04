import api from "./axios";

export const getSubscriptions = () =>
  api.get("/subscriptions", {}).then(res => res.data);

export const createSubscription = (data: {
  customerId: string;
  planId: string;
}) => api.post("/subscriptions", data).then(res => res.data);

export const updateSubscription = (id: string, data: { planId?: string; status?: string }) =>
  api.put(`/subscriptions/${id}`, data).then(res => res.data);

export const deleteSubscription = (id: string) =>
  api.delete(`/subscriptions/${id}`);
