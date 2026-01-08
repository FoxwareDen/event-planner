import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              Create Unforgettable Moments
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              From intimate gatherings to grand celebrations, discover and book the perfect venue for your special
              occasion. Make every moment count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 px-8">
                Explore Events
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
