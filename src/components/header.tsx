import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold text-foreground">Book Your Event</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              Sign In
            </Button>
            <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="/#events" className="block text-sm font-medium text-foreground hover:text-primary">
              Events
            </a>
            <a href="/#categories" className="block text-sm font-medium text-foreground hover:text-primary">
              Categories
            </a>
            <a href="/#how-it-works" className="block text-sm font-medium text-foreground hover:text-primary">
              How It Works
            </a>
            <a href="/#about" className="block text-sm font-medium text-foreground hover:text-primary">
              About
            </a>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
