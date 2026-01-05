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
export interface MetaData {
  id: Number,
  created_at: Date
}

export interface Ticket {
  fullName: string,
  email: string,
  phoneNumber: string,
  status: "pending" | "active" | "complete" | "canceled"
}

export interface Event {
  ticket_id: Number,
  type: string,
  date: Date,
  number_of_guests: Number,
  number_of_chairs: Number,
  number_of_tables: Number,
  catering: boolean,
  services?: string[],
  requests?: string
}

const tableNames: Record<string, string> = {
  'data': 'event-data',
  'tickets': "event-tickets"
};


// TODO: make a function to subscribe to the realtime database
