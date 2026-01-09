import emailjs from "@emailjs/browser";

import type { Ticket, Event } from "./db.ts";

const EMAIL_PUBLIC_KEY: string = import.meta.env.VITE_EMAIL_KEY!;
const EMAIL_SERVICE_ID: string = import.meta.env.VITE_EMAIL_SERVICE_ID!;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID!;

emailjs.init(EMAIL_PUBLIC_KEY);

type EmailTemplateData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;

  event_type: string;
  event_date: string;
  guests: number;
  chairs: number;
  tables: number;
  catering: string;
  services: string;
  requests: string;
};

function mapToEmailData(input: Ticket & Event): EmailTemplateData {
  return {
    fullName: input.fullName,
    email: input.email,
    phoneNumber: input.phoneNumber,
    status: input.status,

    event_type: input.type,
    event_date: input.date,
    guests: input.number_of_guests,
    chairs: input.number_of_chairs,
    tables: input.number_of_tables,
    catering: input.catering ? "Yes" : "No",
    services: input.services?.join(", ") || "None",
    requests: input.requests || "None",
  };
}

export async function sendEmail(ticket: Ticket & Event): Promise<{ data: string | null, error: Error | null }> {
  try {
    const emailData = mapToEmailData(ticket);

    const result = await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, emailData);

    if (result.status != 200) {
      return {
        data: null,
        error: Error(`Failed to send email error code:${result.status}\n${result.text}`)
      }
    }

    return {
      error: null,
      data: result.text,
    }
  } catch (error) {
    return { data: null, error: Error(JSON.stringify(error)) };
  }
}
