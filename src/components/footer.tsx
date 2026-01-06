import { Link } from "@tanstack/react-router"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Book Your Event</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              Creating unforgettable moments, one event at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#events" className="text-background/80 hover:text-primary transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#categories" className="text-background/80 hover:text-primary transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-background/80 hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-background/80 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/80">
          <p>&copy; 2026 Book Your Event. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
