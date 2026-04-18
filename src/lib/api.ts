import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Automatically embed NextAuth Django Superuser token in SSR if available
  try {
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
      headers.append('Authorization', `Token ${session.accessToken}`);
    } else if (process.env.OBSIDIAN_API_TOKEN) {
      // Fallback for SSG build time or strictly environment defined auth
      headers.append('Authorization', `Token ${process.env.OBSIDIAN_API_TOKEN}`);
    }
  } catch(e) {
      // if called from client side, drop back to process.env.
     if (process.env.OBSIDIAN_API_TOKEN) {
       headers.append('Authorization', `Token ${process.env.OBSIDIAN_API_TOKEN}`);
     }
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