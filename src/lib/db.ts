import { createClient, SupabaseClient } from "@supabase/supabase-js";

export let db: null | SupabaseClient = null

export function createClientConnection(): boolean {
  try {
    if (db) return true;
    db = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
    return true;
  } catch (error) {
    console.error(`${error}`);
    return false;
  }
}
export interface MetaData {
  id: number,
  created_at: Date
}

const tableNames: Record<string, string> = {
  'data': 'event-data',
  'tickets': "event-tickets"
};

export interface Ticket {
  fullName: string,
  email: string,
  phoneNumber: string,
  status: "pending" | "active" | "complete" | "canceled"
}

export interface Event {
  type: string,
  date: string,
  number_of_guests: number,
  number_of_chairs: number,
  number_of_tables: number,
  catering: boolean,
  services?: string[],
  requests?: string
}

export type CreateTicketPayload = Ticket & Event

// TODO: add for validation
export async function createTicket(ticketData: Ticket, eventData: Event): Promise<boolean> {
  try {
    if (!db) throw Error("Failed to connect to database");

    const { data: ticket, error: ticketError } = await db
      .from('event-tickets')
      .insert({
        full_name: ticketData.fullName,
        email: ticketData.email,
        phone_number: ticketData.phoneNumber,
        status: ticketData.status
      })
      .select()
      .single();

    if (ticketError) throw ticketError

    const { error: eventError } = await db
      .from('event-data')
      .insert({
        ticket_id: ticket.id,
        type: eventData.type,
        date: eventData.date,
        number_of_guests: eventData.number_of_guests,
        number_of_chairs: eventData.number_of_chairs,
        number_of_tables: eventData.number_of_tables,
        catering: eventData.catering ?? false,
        services: eventData.services,
        requests: eventData.requests,
      });

    if (eventError) throw eventError;

    return true;
  } catch (error) {
    console.error(`${error}`);
    return false;
  }
}

export async function getTickets<T>(): Promise<T[]> {
  try {
    if (!db) throw Error("Failed to connect to database");

    const { data, error } = await db.from("event-tickets").select();

    if (error) throw error;

    return data as T[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// TODO: make a function to subscribe to the realtime database
export function getTicketsRealtime(func: (newValue: Record<string, any>, oldValue: Partial<Record<string, any>>) => void): () => void {
  if (!db) throw Error("Failed to connect to database");

  const channel = db.channel('event-tickets-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'event-tickets'
      },
      (payload) => {
        func(payload.new, payload.old);
      }
    )
    .subscribe();

  return () => {
    db?.removeChannel(channel);
  }
}
