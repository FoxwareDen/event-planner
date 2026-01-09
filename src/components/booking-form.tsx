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

    const res = await createTicket(ticket, eventData);

    if (res) {
      form.reset()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      }
    }
  };

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold mb-4 text-black">Book Your Event</h2>
          <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you shortly</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Personal Information Section */}
          <motion.div
            className="border border-gray-200 p-8"
            variants={sectionVariants}
            whileHover={{ boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
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
                  placeholder="+27 76 000 0000"
                  className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Event Details Section */}
          <motion.div
            className="border border-gray-200 p-8"
            variants={sectionVariants}
            whileHover={{ boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="border border-gray-200 p-8"
            variants={sectionVariants}
            whileHover={{ boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>

          {/* Special Requests Section */}
          <motion.div
            className="border border-gray-200 p-8"
            variants={sectionVariants}
            whileHover={{ boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>

          <motion.div
            variants={sectionVariants}
          >
            <MotionBtn
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold py-6 text-lg rounded-none cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Submit Booking Request
            </MotionBtn>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}