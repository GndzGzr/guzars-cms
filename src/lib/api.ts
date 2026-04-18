export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const TOKEN = process.env.OBSIDIAN_API_TOKEN;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (TOKEN) {
    headers.append('Authorization', `Token ${TOKEN}`);
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    console.error(`Failed to fetch API from ${url} - Status: ${res.status}`);
    throw new Error(`Failed to fetch API: ${res.statusText}`);
  }

  return res.json();
}