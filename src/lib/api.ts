// lib/api.ts (frontend utility)
const BASE = "/api";

export async function apiGet(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",  // sends cookies
  });
  return res.json();
}

export async function apiPost(path: string, body: object) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}

// Usage in component:
// const data = await apiGet("/complaints?status=Pending&page=1");
// const result = await apiPost("/complaints", { title: "...", ... });