import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users } from "lucide-react"

const events = [
  {
    title: "Grand Ballroom",
    location: "Downtown Plaza",
    capacity: "200-500 guests",
    date: "Available Now",
    price: "$5,000",
    image: "/luxury-ballroom-chandeliers.png",
  },
  {
    title: "Garden Terrace",
    location: "Hillside Estate",
    capacity: "100-200 guests",
    date: "Available Now",
    price: "$3,500",
    image: "/outdoor-garden-terrace-venue-with-flowers.jpg",
  },
  {
    title: "Rooftop Lounge",
    location: "City Center",
    capacity: "50-150 guests",
    date: "Available Now",
    price: "$4,000",
    image: "/modern-rooftop-lounge.png",
  },
]

export function FeaturedEvents() {
  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Featured Venues</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Handpicked venues perfect for your next celebration
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.title} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      {event.capacity}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Starting at</div>
                    <div className="text-2xl font-bold text-primary">{event.price}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
