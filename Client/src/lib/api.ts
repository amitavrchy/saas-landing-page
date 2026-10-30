import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export async function subscribeWaitlist(data: {
  email: string;
  name?: string;
  company?: string;
}) {
  const res = await api.post("/waitlist", data);
  return res.data;
}

export async function subscribeNewsletter(email: string) {
  const res = await api.post("/subscribers", { email });
  return res.data;
}

export async function requestDemo(data: {
  name: string;
  email: string;
  company?: string;
  message?: string;
}) {
  const res = await api.post("/demo-requests", data);
  return res.data;
}
