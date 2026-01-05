import { Card, CardContent } from "@/components/ui/card"
import { Music, Heart, Briefcase, GraduationCap, PartyPopper, Users } from "lucide-react"

const categories = [
  {
    icon: Heart,
    title: "Weddings",
    description: "Create your dream wedding day",
    count: "150+ venues",
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description: "Professional business events",
    count: "80+ venues",
  },
  {
    icon: PartyPopper,
    title: "Birthday",
    description: "Celebrate in style",
    count: "120+ venues",
  },
  {
    icon: Music,
    title: "Concerts",
    description: "Live music experiences",
    count: "50+ venues",
  },
  {
    icon: GraduationCap,
    title: "Graduation",
    description: "Honor achievements",
    count: "40+ venues",
  },
  {
    icon: Users,
    title: "Conferences",
    description: "Large scale gatherings",
    count: "60+ venues",
  },
]

export function EventCategories() {
  return (
    <section id="categories" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Event Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Whatever the occasion, we have the perfect venue waiting for you
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                    <category.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <p className="text-xs font-medium text-primary">{category.count}</p>
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
