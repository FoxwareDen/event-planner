import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wedding Client",
    content:
      "Absolutely stunning venue! The booking process was seamless and the staff went above and beyond to make our special day perfect.",
    rating: 5,
    image: "/professional-woman-smiling.png",
  },
  {
    name: "Michael Chen",
    role: "Corporate Event Planner",
    content:
      "We've hosted multiple corporate events through this platform. The venues are always top-notch and the service is exceptional.",
    rating: 5,
    image: "/professional-man-suit.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Birthday Celebration",
    content:
      "Made my daughter's sweet sixteen unforgettable! The venue was beautiful and everything was exactly as promised.",
    rating: 5,
    image: "/smiling-curly-woman.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who trusted us with their special moments
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-pretty">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {/* <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
