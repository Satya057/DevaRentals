"use client"

import React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

interface LandlordInquiryFormProps {
  onSuccess?: () => void
}

export function LandlordInquiryForm({ onSuccess }: LandlordInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    if (onSuccess) {
      setTimeout(onSuccess, 2000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-serif text-[#8B2332] mb-2">Thank You!</h2>
        <p className="text-[#333]">Your landlord inquiry has been submitted successfully. We will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Owner Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Full Name <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Full Name"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
          <p className="text-xs text-[#666] mt-1">
            Please provide the full name of the registered landlord.
          </p>
        </div>
        <div>
          <label className="block text-[#1e6b35] font-medium mb-2 text-sm">
            2nd Owner Full Name
          </label>
          <Input
            placeholder="2nd Owner Full Name"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <Input
            type="tel"
            placeholder="Phone Number"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#1e6b35] font-medium mb-2 text-sm">
            2nd Owner Phone Number
          </label>
          <Input
            type="tel"
            placeholder="2nd Owner Phone Number"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Email <span className="text-red-600">*</span>
          </label>
          <Input
            type="email"
            placeholder="Email"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#1e6b35] font-medium mb-2 text-sm">
            2nd Owner Email
          </label>
          <Input
            type="email"
            placeholder="2nd Owner Email"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Property Address <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Property Address"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#1e6b35] font-medium mb-2 text-sm">
            2nd Property Address
          </label>
          <Input
            placeholder="If you have 2nd property, please enter address here"
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          Property Type <span className="text-red-600">*</span>
        </label>
        <RadioGroup defaultValue="front-attach" className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="front-attach" id="front-attach" />
            <label htmlFor="front-attach" className="text-xs text-[#333]">Front Attach Garage</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lane-home" id="lane-home" />
            <label htmlFor="lane-home" className="text-xs text-[#333]">Lane Home (Back Garage)</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="duplex" id="duplex" />
            <label htmlFor="duplex" className="text-xs text-[#333]">Duplex</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="townhouse" id="townhouse" />
            <label htmlFor="townhouse" className="text-xs text-[#333]">Townhouse</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apartment" id="apartment" />
            <label htmlFor="apartment" className="text-xs text-[#333]">Apartment</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="main-floor" id="main-floor" />
            <label htmlFor="main-floor" className="text-xs text-[#333]">Main Floor</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basement" id="basement" />
            <label htmlFor="basement" className="text-xs text-[#333]">Basement</label>
          </div>
        </RadioGroup>
      </div>

      {/* Property Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Available Date for New Tenants <span className="text-red-600">*</span>
          </label>
          <Input
            type="date"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
            Rent Expectation (Monthly) <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Rent Expectation (Monthly)"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Square Footage <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Square Footage"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
        <div>
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
            Property Build Year <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Property Build Year"
            required
            className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Number of Bedrooms <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
            Number of Bathrooms <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Furnishing Type <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="Unfurnished" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unfurnished">Unfurnished</SelectItem>
              <SelectItem value="partially-furnished">Partially Furnished</SelectItem>
              <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-[#c4a000] font-medium mb-2 text-sm">
            Backyard Availability <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#8B2332] font-medium mb-2 text-sm">
            Preferred Tenant Lease Term <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-years">2 Years</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
            Contract Term Period <span className="text-red-600">*</span>
          </label>
          <Select required>
            <SelectTrigger className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]">
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-years">2 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pet Policy */}
      <div>
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          Are Pets Allowed? <span className="text-red-600">*</span>
        </label>
        <RadioGroup defaultValue="no" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pets-yes" />
            <label htmlFor="pets-yes" className="text-xs text-[#333]">Yes</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pets-no" />
            <label htmlFor="pets-no" className="text-xs text-[#333]">No</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="negotiable" id="pets-negotiable" />
            <label htmlFor="pets-negotiable" className="text-xs text-[#333]">Negotiable</label>
          </div>
        </RadioGroup>
        <p className="text-xs text-[#666] mt-1 italic">
          Note: Pet-friendly properties get $50.00 extra rent per month.
        </p>
      </div>

      <div>
        <label className="block text-[#c4a000] font-medium mb-2 text-sm">
          Specify Restrictions (pets) <span className="text-red-600">*</span>
        </label>
        <Input
          placeholder="Specify Restrictions"
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      {/* Parking */}
      <div>
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          Parking Availability <span className="text-red-600">*</span>
        </label>
        <RadioGroup defaultValue="single" className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="parking-single" />
            <label htmlFor="parking-single" className="text-xs text-[#333]">Single Garage</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="double" id="parking-double" />
            <label htmlFor="parking-double" className="text-xs text-[#333]">Double Garage</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="street" id="parking-street" />
            <label htmlFor="parking-street" className="text-xs text-[#333]">Street Parking</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="covered" id="parking-covered" />
            <label htmlFor="parking-covered" className="text-xs text-[#333]">Covered Stall</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="underground" id="parking-underground" />
            <label htmlFor="parking-underground" className="text-xs text-[#333]">Under Ground</label>
          </div>
        </RadioGroup>
      </div>

      {/* Additional Info */}
      <div>
        <label className="block text-[#1e3a5f] font-medium mb-2 text-sm">
          Any Comments or information you{"'"}d like to share with us before we call you?
        </label>
        <Textarea
          placeholder=""
          rows={3}
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      <div>
        <label className="block text-[#c4a000] font-medium mb-2 text-sm">
          What date would you like to visit the property for an in-person tour? <span className="text-red-600">*</span>
        </label>
        <Input
          type="date"
          placeholder="Select preferred date"
          required
          className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
        />
      </div>

      {/* How did you hear about us */}
      <div>
        <label className="block text-[#8B2332] font-medium mb-2 text-sm">
          How did you hear about us? <span className="text-red-600">*</span>
        </label>
        <RadioGroup defaultValue="google" className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="facebook" id="hear-facebook" />
            <label htmlFor="hear-facebook" className="text-xs text-[#333]">Facebook</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="google" id="hear-google" />
            <label htmlFor="hear-google" className="text-xs text-[#333]">Google</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="website" id="hear-website" />
            <label htmlFor="hear-website" className="text-xs text-[#333]">Website</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="instagram" id="hear-instagram" />
            <label htmlFor="hear-instagram" className="text-xs text-[#333]">Instagram</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="referral" id="hear-referral" />
            <label htmlFor="hear-referral" className="text-xs text-[#333]">Friend Referral</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="others" id="hear-others" />
            <label htmlFor="hear-others" className="text-xs text-[#333]">Others</label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-12 py-3"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
