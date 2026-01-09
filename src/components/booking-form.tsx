"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createTicket, type Event, type Ticket } from "@/lib/db"
import { motion } from "motion/react"

const MotionBtn = motion.create(Button);

export function BookingForm() {
  const [additionalServices, setAdditionalServices] = useState<string[]>([])

  const handleServiceToggle = (service: string) => {
    setAdditionalServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const form = e.currentTarget;
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const ticket = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phone") as string,
      status: "pending"
    } as Ticket;

    const eventData = {
      type: formData.get("eventType") as string | "",
      date: formData.get("eventDate") as string | "",
      number_of_guests: Number(formData.get("guests")),
      number_of_chairs: Number(formData.get("chairs")),
      number_of_tables: Number(formData.get("tables")),
      catering: formData.get("catering") == "yes" ? true : false,
      services: additionalServices,
      requests: formData.get("specialRequests") as string
    } as Event;
    // Handle form submission

    // TODO: added loading animation
    const res = await createTicket(ticket, eventData);

    if (res) {
      form.reset()
    }
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">Book Your Event</h2>
          <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you shortly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-black">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-black">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-black">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-black">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-black">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="eventType" className="text-sm font-semibold text-black">
                  Event Type *
                </Label>
                <Select name="eventType" required>
                  <SelectTrigger
                    id="eventType"
                    className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-sm font-semibold text-black">
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  required
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm font-semibold text-black">
                  Number of Guests *
                </Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  required
                  placeholder="50"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chairs" className="text-sm font-semibold text-black">
                  Chairs Needed *
                </Label>
                <Input
                  id="chairs"
                  name="chairs"
                  type="number"
                  min="0"
                  required
                  placeholder="50"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tables" className="text-sm font-semibold text-black">
                  Tables Needed *
                </Label>
                <Input
                  id="tables"
                  name="tables"
                  type="number"
                  min="0"
                  required
                  placeholder="10"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-black">Services</h3>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-black">Catering Required *</Label>
                <RadioGroup name="catering" defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="catering-yes" className="border-gray-300" />
                    <Label htmlFor="catering-yes" className="font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="catering-no" className="border-gray-300" />
                    <Label htmlFor="catering-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-black">Additional Services</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Photography", "Entertainment", "Decorations", "DJ/Music"].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.toLowerCase().replace("/", "-")}
                        checked={additionalServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                        className="border-gray-300 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37] rounded-none"
                      />
                      <Label htmlFor={service.toLowerCase().replace("/", "-")} className="font-normal cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests Section */}
          <div className="border border-gray-200 p-8">
            <h3 className="text-xl font-bold mb-6 text-black">Special Requests</h3>
            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-sm font-semibold text-black">
                Any special requests or requirements?
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                rows={5}
                placeholder="Please let us know if you have any special requirements or requests..."
                className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none resize-none"
              />
            </div>
          </div>

          <MotionBtn
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold py-6 text-lg rounded-none cursor-pointer" whileHover={{scale:1.1}}
          >
            Submit Booking Request
          </MotionBtn>
        </form>
      </div>
    </section>
  )
}
