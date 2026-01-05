import { Search, Calendar, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse Venues",
    description: "Explore our curated collection of premium venues across various categories and locations.",
    step: "01",
  },
  {
    icon: Calendar,
    title: "Select Date & Time",
    description: "Choose your preferred date and time slot. Check real-time availability instantly.",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Confirm Booking",
    description: "Complete your booking with secure payment and receive instant confirmation.",
    step: "03",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Book your perfect event in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
