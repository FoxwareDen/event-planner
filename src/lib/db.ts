import { createClient, SupabaseClient } from "@supabase/supabase-js";

export let db: null | SupabaseClient = null

export function createClientConnection(): boolean {
  try {
    if (db) return true;
    db = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
    return true;
  } catch (error) {
    console.error(`{error}`);
    return false;
  }
}
