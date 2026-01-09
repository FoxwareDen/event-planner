import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { motion } from "motion/react"


 const MotionButton = motion.create(Button);
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-foreground">Book Your Event</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <MotionButton variant="ghost" className=" btn hidden cursor-pointer md:flex border-2" whileHover={{scale: 1.1}}>
              Sign In
            </MotionButton>
            <MotionButton className="hidden md:flex bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90" whileHover={{scale: 1.1}}>Book Now</MotionButton>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="pt-4 flex flex-col space-y-2">
              <MotionButton variant="ghost" className=" btn w-full border-2  cursor-pointer border-primary text-bolder text-lg" whileHover={{scale: 1.1}}>
                Sign In
              </MotionButton>
              <MotionButton className="w-full bg-primary text-white cursor-pointer hover:bg-primary/90" whileHover={{scale: 1.1}}>Book Now</MotionButton>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
