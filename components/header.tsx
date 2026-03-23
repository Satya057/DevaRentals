"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BrandLogoMark } from "@/components/brand-logo-mark"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"
import { ScheduleViewingForm } from "@/components/forms/schedule-viewing-form"
import { RentalApplicationForm } from "@/components/forms/rental-application-form"
import { ServiceRequestForm } from "@/components/forms/service-request-form"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Deva Rentals" },
  { href: "#landlords", label: "Landlords" },
  { href: "#tenants", label: "Tenants" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

const ctaButtons = [
  { id: "landlord", label: "Landlord Inquiry" },
  { id: "schedule", label: "Schedule Viewing" },
  { id: "rental", label: "Rental Application" },
  { id: "service", label: "Service Request" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const renderForm = (formId: string, onClose: () => void) => {
    switch (formId) {
      case "landlord":
        return <LandlordInquiryForm onSuccess={onClose} />
      case "schedule":
        return <ScheduleViewingForm onSuccess={onClose} />
      case "rental":
        return <RentalApplicationForm onSuccess={onClose} />
      case "service":
        return <ServiceRequestForm onSuccess={onClose} />
      default:
        return null
    }
  }

  const getFormTitle = (formId: string) => {
    switch (formId) {
      case "landlord":
        return "Landlord Inquiry Form"
      case "schedule":
        return "Schedule Viewing"
      case "rental":
        return "Rental Application"
      case "service":
        return "Service Request"
      default:
        return ""
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="w-[90%] mx-auto py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:info@devarentals.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              info@devarentals.com
            </a>
            <a href="tel:780-984-1996" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              780-984-1996
            </a>
          </div>
          <div className="flex items-center gap-3">
            {ctaButtons.map((btn) => (
              <Dialog 
                key={btn.id} 
                open={openDialog === btn.id} 
                onOpenChange={(open) => setOpenDialog(open ? btn.id : null)}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-semibold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] [text-shadow:0_0_14px_rgba(255,250,240,0.35)] hover:bg-secondary/88 hover:[text-shadow:0_0_18px_rgba(255,250,240,0.45)] transition-[background-color,text-shadow] cursor-pointer"
                  >
                    {btn.label}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[90vh] p-0 bg-[#f5f0e8]">
                  <DialogHeader className="px-6 pt-6 pb-0">
                    <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                      {getFormTitle(btn.id)}
                    </DialogTitle>
                    <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                  </DialogHeader>
                  <ScrollArea className="max-h-[calc(90vh-100px)] px-6 pb-6">
                    {renderForm(btn.id, () => setOpenDialog(null))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="w-[90%] mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogoMark />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-primary">
                DEVA RENTALS
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Property Management</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  {ctaButtons.map((btn) => (
                    <Dialog 
                      key={btn.id}
                      open={openDialog === btn.id} 
                      onOpenChange={(open) => {
                        setOpenDialog(open ? btn.id : null)
                        if (open) setIsOpen(false)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start bg-transparent"
                        >
                          {btn.label}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[90vh] p-0 bg-[#f5f0e8]">
                        <DialogHeader className="px-6 pt-6 pb-0">
                          <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                            {getFormTitle(btn.id)}
                          </DialogTitle>
                          <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                        </DialogHeader>
                        <ScrollArea className="max-h-[calc(90vh-100px)] px-6 pb-6">
                          {renderForm(btn.id, () => setOpenDialog(null))}
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="#contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
