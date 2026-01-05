import { BookingForm } from "@/components/booking-form";
import { Hero } from "@/components/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <>
    <Hero />
    <BookingForm />
  </>;
}
