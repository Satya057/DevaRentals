"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Phone, Mail, ChevronRight, ExternalLink } from "lucide-react"
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
import { BrandLogoMark } from "@/components/brand-logo-mark"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"
import { ScheduleViewingForm } from "@/components/forms/schedule-viewing-form"
import { RentalApplicationForm } from "@/components/forms/rental-application-form"
import { ServiceRequestForm } from "@/components/forms/service-request-form"
import { cn } from "@/lib/utils"

const MOBILE_NAV_STAGGER_MS = 48

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
  { id: "rental", label: "Rental Application" },
  { id: "schedule", label: "Schedule Viewing" },
  { id: "service", label: "Service Request" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  const getFormPath = (formId: string) => `/forms/${formId}`

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
              isClient ? (
                <Dialog
                  key={btn.id}
                  open={openDialog === btn.id}
                  onOpenChange={(open) => setOpenDialog(open ? btn.id : null)}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-white/25 bg-secondary px-4 py-2 text-sm font-semibold tracking-wide text-secondary-foreground shadow-md ring-1 ring-black/10 transition-[background-color,box-shadow] [text-shadow:0_0_14px_rgba(255,250,240,0.35)] hover:bg-secondary/88 hover:shadow-lg hover:[text-shadow:0_0_18px_rgba(255,250,240,0.45)]"
                    >
                      <ChevronRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                      {btn.label}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="flex w-full max-w-[calc(100%-2rem)] sm:max-w-4xl flex-col gap-0 overflow-hidden p-0 bg-[#f5f0e8] max-h-[90vh]">
                    <DialogHeader className="shrink-0 px-6 pt-6 pb-3">
                      <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                        {getFormTitle(btn.id)}
                      </DialogTitle>
                      <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                      <div className="mt-2 text-center">
                        <Link
                          href={getFormPath(btn.id)}
                          onClick={() => setOpenDialog(null)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#8B2332] hover:underline"
                        >
                          Open full page
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </DialogHeader>
                    <div className="max-h-[calc(90vh-10.5rem)] min-h-[min(40vh,320px)] overflow-y-auto overscroll-contain px-6 pb-10 pt-1 [scrollbar-gutter:stable]">
                      {renderForm(btn.id, () => setOpenDialog(null))}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <button
                  key={btn.id}
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-white/25 bg-secondary px-4 py-2 text-sm font-semibold tracking-wide text-secondary-foreground shadow-md ring-1 ring-black/10"
                >
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  {btn.label}
                </button>
              )
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
              <span className="text-xl font-serif font-semibold tracking-tight text-primary">
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
              <nav className="mt-8 flex flex-col items-stretch gap-4 px-1 text-center">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${i * MOBILE_NAV_STAGGER_MS}ms` }}
                    className={cn(
                      "block w-full border-b border-border/80 py-3.5 text-center text-lg font-medium text-foreground/80 transition-colors duration-200 hover:text-primary",
                      "motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-x-0",
                      "animate-in fade-in slide-in-from-right-6 fill-mode-backwards duration-300 ease-out",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  {ctaButtons.map((btn, i) => (
                    isClient ? (
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
                            style={{
                              animationDelay: `${(navLinks.length + i) * MOBILE_NAV_STAGGER_MS}ms`,
                            }}
                            className={cn(
                              "w-full cursor-pointer justify-center bg-transparent text-center",
                              "motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-x-0",
                              "animate-in fade-in slide-in-from-right-5 fill-mode-backwards duration-300 ease-out",
                            )}
                          >
                            {btn.label}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex w-full max-w-[calc(100%-2rem)] sm:max-w-4xl flex-col gap-0 overflow-hidden p-0 bg-[#f5f0e8] max-h-[90vh]">
                          <DialogHeader className="shrink-0 px-6 pt-6 pb-3">
                            <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                              {getFormTitle(btn.id)}
                            </DialogTitle>
                            <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                            <div className="mt-2 text-center">
                              <Link
                                href={getFormPath(btn.id)}
                                onClick={() => {
                                  setOpenDialog(null)
                                  setIsOpen(false)
                                }}
                                className="inline-flex items-center gap-1 text-sm font-medium text-[#8B2332] hover:underline"
                              >
                                Open full page
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              </Link>
                            </div>
                          </DialogHeader>
                          <div className="max-h-[calc(90vh-10.5rem)] min-h-[min(40vh,320px)] overflow-y-auto overscroll-contain px-6 pb-10 pt-1 [scrollbar-gutter:stable]">
                            {renderForm(btn.id, () => setOpenDialog(null))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        key={btn.id}
                        variant="outline"
                        className="w-full cursor-pointer justify-center bg-transparent text-center"
                      >
                        {btn.label}
                      </Button>
                    )
                  ))}
                </div>
                <Button
                  asChild
                  className={cn(
                    "mt-4 w-full justify-center border border-primary-foreground/20 bg-primary font-semibold shadow-md ring-1 ring-primary/25 hover:bg-primary/90",
                    "motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-x-0",
                    "animate-in fade-in slide-in-from-right-5 zoom-in-95 fill-mode-backwards duration-300 ease-out",
                  )}
                  style={{
                    animationDelay: `${(navLinks.length + ctaButtons.length) * MOBILE_NAV_STAGGER_MS}ms`,
                  }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 text-center"
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
