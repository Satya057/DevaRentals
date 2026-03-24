"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, Mail, ChevronRight } from "lucide-react"
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
        <div className="mx-auto flex w-[90%] items-center justify-between py-2.5">
          <div className="flex items-center gap-8">
            <a
              href="mailto:info@devarentals.com"
              className="flex items-center gap-2.5 text-base font-medium tracking-tight transition-opacity hover:opacity-85 sm:text-[1.0625rem]"
            >
              <Mail className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
              info@devarentals.com
            </a>
            <a
              href="tel:780-984-1996"
              className="flex items-center gap-2.5 text-base font-medium tracking-tight transition-opacity hover:opacity-85 sm:text-[1.0625rem]"
            >
              <Phone className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
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
                    className="inline-flex items-center gap-1 rounded-md border border-white/25 bg-secondary px-4 py-2 text-sm font-semibold tracking-wide text-secondary-foreground shadow-md ring-1 ring-black/10 transition-[background-color,box-shadow] [text-shadow:0_0_14px_rgba(255,250,240,0.35)] hover:bg-secondary/88 hover:shadow-lg hover:[text-shadow:0_0_18px_rgba(255,250,240,0.45)]"
                  >
                    <ChevronRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
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

      {/* Main Nav — logo | centered links | CTA */}
      <div className="mx-auto w-[92%] max-w-7xl">
        <div className="flex h-[4.25rem] w-full items-center gap-4 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <BrandLogoMark />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-primary">
                DEVA RENTALS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Property Management
              </span>
            </div>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            aria-label="Main"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-6 xl:gap-x-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative whitespace-nowrap py-2 text-[0.9375rem] font-medium text-foreground/65 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:origin-center after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button
              asChild
              className="rounded-lg border border-primary-foreground/25 bg-primary px-5 text-primary-foreground shadow-md ring-2 ring-primary/30 transition-[transform,box-shadow] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              <Link href="#contact" className="inline-flex items-center gap-1.5 font-semibold">
                Get Started
                <ChevronRight className="h-4 w-4 opacity-90" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="ml-auto lg:hidden">
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
                    className="border-b border-border/80 py-3.5 text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
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
                <Button
                  asChild
                  className="mt-4 border border-primary-foreground/20 bg-primary font-semibold shadow-md ring-1 ring-primary/25 hover:bg-primary/90"
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
