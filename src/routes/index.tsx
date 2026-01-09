import { BookingForm } from "@/components/booking-form";
import { Hero } from "@/components/hero";
import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/testimonials";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <>
    <Hero />
    <Testimonials/>
    <BookingForm />
  </>;
}
