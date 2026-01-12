import { createClient, SupabaseClient } from "@supabase/supabase-js";

export let db: null | SupabaseClient = null

export function createClientConnection(): boolean {
  try {
    if (db) return true;
    db = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
    return true;
  } catch (error) {
    console.error(`${JSON.stringify(error)}`);
    return false;
  }
}

export interface MetaData {
  id: number,
  created_at: Date
}

export interface Ticket {
  fullName: string,
  email: string,
  phoneNumber: string,
  status: "pending" | "active" | "complete" | "canceled"
}


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
    console.error(`${JSON.stringify(error)}`);
    return false;
  }
}

/**
 * Retrieves all tickets from the database
 * @template T - Type to cast the returned ticket data to
 * @returns {Promise<T[]>} Array of tickets cast to the specified type, empty array on error
 * @throws {Error} If database connection is not established
 * @example
 * const tickets = await getTickets<Ticket & MetaData>();
 */
export async function getTickets<T>(): Promise<T[]> {
  try {
    if (!db) throw Error("Failed to connect to database");

    const { data, error } = await db.from("event-tickets").select();

    if (error) throw error;

    return data as T[];
  } catch (error) {
    console.error(`${JSON.stringify(error)}`);;
    return [];
  }
}

/**
 * Sets up a realtime subscription to ticket changes in the database
 * @param {function} func - Callback function invoked when ticket data changes
 * @param {Record<string, T>} func.newValue - The new/updated record data
 * @param {Partial<Record<string, T>>} [func.oldValue] - The previous record data (for updates/deletes)
 * @param {string} [func.typeEvent] - Type of database event ('INSERT', 'UPDATE', 'DELETE')
 * @returns {function(): void} Unsubscribe function to stop listening to changes
 * @throws {Error} If database connection is not established
 * @example
 * const unsubscribe = getTicketsRealtime((newValue, oldValue, eventType) => {
 *   console.log(`Ticket ${eventType}:`, newValue);
 * });
 * // Later: unsubscribe();
 */
export function getTicketsRealtime<T>(func: (newValue: Record<string, T>, oldValue?: Partial<Record<string, T>>, typeEvent?: string) => void): () => void {
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
        func(payload.new, payload.old, payload.eventType);
      }
    )
    .subscribe();

  return () => {
    db?.removeChannel(channel);
  }
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

export async function getEventData<T>(ticket_id: number): Promise<null | T> {
  try {
    if (!db) throw Error("Failed to connect to database");

    const { data, error } = await db.from("event-data").select("*").eq("ticket_id", ticket_id).single();

    if (error) throw error;

    return data as T
  } catch (error) {
    console.error(`${JSON.stringify(error)}`);;
    return null;
  }
}

export async function getAllEvents<T>(): Promise<T[]> {
  try {
    if (!db) throw Error("Failed to connect to database");

    const { data, error } = await db.from("event-data").select("*");

    if (error) throw error;

    return data as T[];
  } catch (error) {
    console.error(`${JSON.stringify(error)}`);;
    return [];
  }
}

