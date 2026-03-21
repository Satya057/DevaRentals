"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RentalApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-serif text-[#8B2332] mb-6">Thank You!</h1>
          <p className="text-[#333] mb-8">Your rental application has been submitted successfully. We will review your application and contact you shortly.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-[#8B2332] hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-[#8B2332] text-center mb-2">
          Rental Application
        </h1>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-10" />

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Your Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-4">Your Personal Information</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#333] mb-3">Terms & Conditions</h3>
              <div className="bg-white p-4 rounded border border-[#d4c5b0] text-sm text-[#555] space-y-3">
                <p>MaxWell Excel Realty [The LANDLORD] is committed to safeguarding the personal information entrusted to us by the Applicant. Personal information means any information about an identifiable individual. This can include but is not limited to an individual{"'"}s name, home address and phone number, age, sex, marital or family status, financial information, educational history, or employment status. We manage your personal information in accordance with Alberta{"'"}s Personal Information Protection Act and other applicable laws. This policy applies to the LANDLORD and to any person providing services on our behalf.</p>
                <p>We collect the personal information for the purposes of assessing the Applicant(s) and co co-Applicant(s) if any as to suitability as a tenant in general, and/or for a specific rental location</p>
                <p>Your completion of this Application will be taken as your consent to the above use by us, including both the information provided in the Application and personal information obtained by us from other sources as noted in the Application. We will assume the same consent in cases where you volunteer other personal information for an obvious purpose, even though it may not be specifically requested in the Application.</p>
                <p>You may withdraw consent to the use and disclosure of personal information at any time, unless the personal information is necessary for us to fulfill our legal obligations. We will respect your decision, but may not be able to provide you with rental accommodation if we do not have sufficient personal information.</p>
                <p className="font-medium">I/We, the undersigned (the {"'"}Applicant{"'"}, and if applicable the {"'"}Co-Applicant{"'"}) hereby apply for approval as a Tenant(s) of the Landlord based on the information provided on this page and the following 2 pages. I/We understand that the information provided will be viewed to determine my/our suitability for the premises described below, and any other premises that the Landlord my deem appropriate.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Address of Property <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address of Property"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Date Occupancy Desired <span className="text-red-600">*</span>
                </label>
                <Input
                  type="date"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Adults <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Adults"
                  required
                  min="1"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Children <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Children"
                  required
                  min="0"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Name"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Social Insurance Number
                </label>
                <Input
                  placeholder="Social Insurance Number"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Current Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Current Address"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Phone 1 <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone 1"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Phone 2
                </label>
                <Input
                  type="tel"
                  placeholder="Phone 2"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <Input
                  type="date"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Govt Issued Photo ID <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-6">Co-Applicant{"'"}s Personal Information (if applicable)</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Name</label>
                <Input
                  placeholder="Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Social Insurance Number</label>
                <Input
                  placeholder="Social Insurance Number"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Current Address</label>
                <Input
                  placeholder="Current Address"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Phone 1</label>
                <Input
                  type="tel"
                  placeholder="Phone 1"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Phone 2</label>
                <Input
                  type="tel"
                  placeholder="Phone 2"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Date of Birth</label>
                <Input
                  type="date"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Govt Issued Photo ID</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Personal Information who is under 18 */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-6">Co-Applicant{"'"}s Personal Information who is under_18</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Name_1</label>
                <Input
                  placeholder="Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">Name_2</label>
                <Input
                  placeholder="Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e6b35] font-medium mb-2">Name_3</label>
                <Input
                  placeholder="Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">Name_4</label>
                <Input
                  placeholder="Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Previous Tenancy */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-2">Previous Tenancy</h2>
            <p className="text-sm text-[#666] mb-6 italic">If less than 2 years at current location</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Landlord{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Landlord's Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Landlord{"'"}s Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Landlord's Phone"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
                <p className="text-xs text-[#666] mt-1">Only numbers and phone characters (#, -, *, etc)</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Present Address <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Present Address"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Time at this location <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Time at this location"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Monthly Rent <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Monthly Rent"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8B2332] font-medium mb-2">
                Reason for Leaving <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="Reason for Leaving"
                rows={3}
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>
          </section>

          {/* Employment Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Employment Information</h2>
            
            <div className="mb-6">
              <label className="block text-[#1e3a5f] font-medium mb-3">
                Status <span className="text-red-600">*</span>
              </label>
              <RadioGroup defaultValue="full-time" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="status-full" />
                  <label htmlFor="status-full" className="text-sm text-[#333]">Full-Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="status-part" />
                  <label htmlFor="status-part" className="text-sm text-[#333]">Part-Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="status-student" />
                  <label htmlFor="status-student" className="text-sm text-[#333]">Student</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unemployed" id="status-unemployed" />
                  <label htmlFor="status-unemployed" className="text-sm text-[#333]">Unemployed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retired" id="status-retired" />
                  <label htmlFor="status-retired" className="text-sm text-[#333]">Retired</label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Current Employer <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Current Employer"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e6b35] font-medium mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Supervisor{"'"}s Name <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Supervisor's Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Length of Employment <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Length of Employment"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Monthly Wage <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Monthly Wage"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#1e3a5f] font-medium mb-2">
                Job Position <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Job Position"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#1e6b35] font-medium mb-2">
                If you have other sources of income that you would like us to consider, please list income, source and person <span className="text-red-600">*</span>
              </label>
              <Textarea
                placeholder="If you have other sources of income that you would like us to consider, please list income, source and person"
                rows={3}
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Upload Pictures <span className="text-red-600">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Upload Pictures
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Co-Applicant's Employment Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Co-Applicant{"'"}s Employment Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Current Employer</label>
                <Input
                  placeholder="Current Employer"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e6b35] font-medium mb-2">Address</label>
                <Input
                  placeholder="Address"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Supervisor{"'"}s Name</label>
                <Input
                  placeholder="Supervisor's Name"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Length of Employment</label>
                <Input
                  placeholder="Length of Employment"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Monthly Wage</label>
                <Input
                  placeholder="Monthly Wage"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#1e3a5f] font-medium mb-2">Job Position</label>
              <Input
                placeholder="Job Position"
                className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">Upload Pictures</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Credit History Description */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Credit History Description</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Have you declared bankruptcy in the past seven (7) years? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bankruptcy-yes" />
                    <label htmlFor="bankruptcy-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bankruptcy-no" />
                    <label htmlFor="bankruptcy-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Have you ever been evicted from a rental residence? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="evicted-yes" />
                    <label htmlFor="evicted-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="evicted-no" />
                    <label htmlFor="evicted-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Have you had two or more late rental payments in the past 12 months? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="late-yes" />
                    <label htmlFor="late-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="late-no" />
                    <label htmlFor="late-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Have you ever refused to pay rent when due? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="refused-yes" />
                    <label htmlFor="refused-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="refused-no" />
                    <label htmlFor="refused-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  If you have answered YES to any of the above, please state your reasons and/or circumstances
                </label>
                <Textarea
                  placeholder="If you have answered YES to any of the above, please state your reasons and/or circumstances"
                  rows={3}
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>

              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Please upload if you have current credit report
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>

              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Please upload if you have current credit report
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Do you wish to bring a pet(s) to the rental premises? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bring-pets-yes" />
                    <label htmlFor="bring-pets-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bring-pets-no" />
                    <label htmlFor="bring-pets-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  If yes, describe the pets
                </label>
                <Textarea
                  placeholder=""
                  rows={2}
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-3">
                  Do you, or any proposed occupant, smoke? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="no" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="smoke-yes" />
                    <label htmlFor="smoke-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="smoke-no" />
                    <label htmlFor="smoke-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e6b35] font-medium mb-3">
                  If you are co-applicants, do you consent to a joint credit report? <span className="text-red-600">*</span>
                </label>
                <RadioGroup defaultValue="yes" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="joint-yes" />
                    <label htmlFor="joint-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="joint-no" />
                    <label htmlFor="joint-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-[#fef3c7] p-4 rounded border border-[#d4a000] text-sm text-[#333]">
                <p><strong>NOTE:</strong> Landlords are not responsible for tenants{"'"} possessions. If accepted you must carry tenant{"'"}s insurance covering your possessions and protecting you against liability. I/We presently insure our belongings and for third party liability</p>
              </div>

              <div>
                <RadioGroup defaultValue="yes" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="insurance-yes" />
                    <label htmlFor="insurance-yes" className="text-sm text-[#333]">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="insurance-no" />
                    <label htmlFor="insurance-no" className="text-sm text-[#333]">No</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Additional Comments by Applicants
                </label>
                <Textarea
                  placeholder="Additional Comments by Applicants"
                  rows={3}
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Emergency Contact</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Name of a person not residing with you <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Name of a person not residing with you"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#1e6b35] font-medium mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Address"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
              <div>
                <label className="block text-[#c4a000] font-medium mb-2">
                  Relationship <span className="text-red-600">*</span>
                </label>
                <Input
                  placeholder="Relationship"
                  className="bg-white border-[#d4c5b0] focus:border-[#8B2332] focus:ring-[#8B2332]"
                />
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-6">Terms & Conditions</h2>
            
            <div className="bg-white p-4 rounded border border-[#d4c5b0] text-sm text-[#555] space-y-3 mb-6">
              <p className="text-[#8B2332]">The Applicant and/or Co-Applicant acknowledges that pets, barbeques, waterbeds and aquariums are not permitted without the advance written permission of the Landlord.</p>
              <p className="text-[#8B2332]">If the Landlord permits a pet, an additional Pet Damage Deposit of $100.00 will be paid to the Landlord. The Landlord will hold the Deposit(s) until the Tenancy ends.</p>
              <p>The Applicant(s) do(es) hereby state that the information contained herein is true and correct, and contain no misrepresentations. If misrepresentations are found after a residential tenancy agreement is entered into with the Applicant and/or Co-Applicant, the Landlord shall have the option to terminate the residential tenancy agreement and seek all available remedies.</p>
              <p>The Applicant(s) and/or Co-Applicant authorizes the Landlord to obtain tenant history, credit, personal and employment information from one or more consumer reporting agencies, previous landlords, employers or previous employers and from other sources of such information, to verify the information provided by the Applicant(s) and/or Co-Applicant. The Applicant(s) and/or Co-Applicant authorize(s) the reporting agencies, and any other person, including personnel from any governmental ministry or agency, to disclose relevant information about the Applicant(s) and/or Co-Applicant to the Landlord. If the parties enter into a Residential tenancy agreement, the Applicant(s) and/or Co-Applicant authorize the above information to be used and disclosed for responding to emergencies, ensuring the orderly management of the tenancy and complying with legal requirements.</p>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-[#333]">
                Agree with terms and conditions <span className="text-red-600">*</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">
                  Signature <span className="text-red-600">*</span>
                </label>
                <div className="bg-white border border-[#d4c5b0] rounded h-32 flex items-center justify-center">
                  <span className="text-[#999] text-sm">Click to sign</span>
                </div>
              </div>
              <div>
                <label className="block text-[#8B2332] font-medium mb-2">
                  Co-Applicant{"'"}s Signature
                </label>
                <div className="bg-white border border-[#d4c5b0] rounded h-32 flex items-center justify-center">
                  <span className="text-[#999] text-sm">Click to sign</span>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#8B2332] hover:bg-[#6d1c28] text-white px-12 py-3 text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
