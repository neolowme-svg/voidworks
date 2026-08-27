import { createBrowserClient } from "@supabase/ssr";
export function createClient(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!url||!key)throw new Error("Supabase is nog niet ingesteld. Voeg NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY toe aan .env.local.");return createBrowserClient(url,key)}
