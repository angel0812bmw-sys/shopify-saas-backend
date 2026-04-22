const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchHomeInsights() {
  const res = await fetch(`${API_BASE_URL}/home_insights`);
  if (!res.ok) throw new Error("Error fetching home insights");
  return res.json();
}

export async function generateScript(producto: string, tono: string, idioma: string) {
  const params = new URLSearchParams({ producto, tono, idioma });
  const res = await fetch(`${API_BASE_URL}/generate_script?${params}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error generating script");
  return res.json();
}

export async function fetchPricing() {
  const res = await fetch(`${API_BASE_URL}/pricing`);
  if (!res.ok) throw new Error("Error fetching pricing");
  return res.json();
}
