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

const NAV_SCROLL_OFFSET_PX = 112

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [activeNavHash, setActiveNavHash] = useState<string>(navLinks[0].href)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const pickFromScroll = () => {
      let active = navLinks[0].href
      for (const { href } of navLinks) {
        const id = href.slice(1)
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= NAV_SCROLL_OFFSET_PX) active = href
      }
      return active
    }

    const applyHashIfAny = () => {
      const h = window.location.hash
      if (h && navLinks.some((l) => l.href === h)) setActiveNavHash(h)
      else setActiveNavHash(pickFromScroll())
    }

    const onHashChange = () => applyHashIfAny()
    const onScrollOrResize = () => setActiveNavHash(pickFromScroll())

    applyHashIfAny()
    requestAnimationFrame(() => applyHashIfAny())

    window.addEventListener("hashchange", onHashChange)
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
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
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="hidden lg:block border-b border-black/20 bg-gradient-to-r from-primary via-[#8B2332] to-[#5a1216] text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="mx-auto flex w-[90%] items-center justify-between py-2.5">
          <div className="flex items-center gap-8">
            <a
              href="mailto:info@devarentals.com"
              className="flex items-center gap-2.5 text-base font-medium tracking-tight hover:opacity-90 sm:text-[1.0625rem]"
            >
              <Mail className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
              info@devarentals.com
            </a>
            <a
              href="tel:780-984-1996"
              className="flex items-center gap-2.5 text-base font-medium tracking-tight hover:opacity-90 sm:text-[1.0625rem]"
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
                      className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-amber-200/35 bg-gradient-to-b from-secondary via-secondary to-[#b8732f] px-4 py-2 text-sm font-medium tracking-wide text-secondary-foreground shadow-md ring-1 ring-amber-900/15 [text-shadow:0_0_12px_rgba(255,250,240,0.3)] hover:shadow-md"
                    >
                      <ChevronRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                      {btn.label}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="flex w-full max-w-[calc(100%-2rem)] sm:max-w-4xl flex-col gap-0 overflow-hidden p-0 bg-[#f5f0e8] max-h-[90vh]">
                    <DialogHeader className="shrink-0 px-6 pt-6 pb-3">
                      <DialogTitle className="text-2xl font-sans text-[#8B2332] text-center">
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
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-amber-200/35 bg-gradient-to-b from-secondary via-secondary to-[#b8732f] px-4 py-2 text-sm font-medium tracking-wide text-secondary-foreground shadow-md ring-1 ring-amber-900/15"
                >
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  {btn.label}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav — full-width strip so background color is obvious (not washed out) */}
      <div className="w-full border-b border-[#6c1517]/12 bg-gradient-to-b from-[#faf6f1] via-[#f3e9df] to-[#e8dfd4] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        <div className="mx-auto w-[92%] max-w-7xl">
        <div className="flex h-[4.25rem] w-full items-center gap-4 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <BrandLogoMark priority />
            <div className="flex flex-col">
              <span className="text-xl font-sans font-normal tracking-tight text-primary">
                DEVA RENTALS
              </span>
              <span className="inline-block bg-gradient-to-r from-secondary to-primary bg-clip-text text-[10px] font-semibold uppercase tracking-[0.2em] text-transparent">
                Property Management
              </span>
            </div>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            aria-label="Main"
          >
            <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 xl:gap-3">
              {navLinks.map((link) => {
                const isActive = activeNavHash === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-2 text-[0.8125rem] font-semibold tracking-tight sm:px-3.5 sm:text-[0.9rem]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3e9df]",
                        isActive
                          ? "border-transparent bg-gradient-to-r from-primary via-[#8B2332] to-[#a53d4a] text-primary-foreground shadow-[0_2px_12px_-4px_rgba(108,21,23,0.4),0_0_0_1px_rgba(212,175,55,0.2)]"
                          : "border-secondary/45 bg-white/90 text-[#3d2a26] shadow-sm hover:border-primary/50 hover:bg-[#fffefb] hover:text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button
              asChild
              className="rounded-lg border border-amber-200/40 bg-gradient-to-r from-primary via-[#8B2332] to-secondary px-5 text-primary-foreground shadow-md ring-2 ring-secondary/35 hover:shadow-lg"
            >
              <Link href="#contact" className="inline-flex items-center gap-1.5 font-normal">
                Get Started
                <ChevronRight className="h-4 w-4 opacity-90" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="ml-auto lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <nav className="mt-8 flex flex-col items-stretch gap-4 px-1 text-center">
                {navLinks.map((link) => {
                  const isActive = activeNavHash === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block w-full rounded-xl border px-4 py-3.5 text-center text-base font-semibold",
                        isActive
                          ? "border-transparent bg-gradient-to-r from-primary via-[#8B2332] to-[#a53d4a] text-primary-foreground shadow-md ring-1 ring-amber-200/30"
                          : "border-secondary/40 bg-white/95 text-[#3d2a26] shadow-sm hover:border-primary/45 hover:bg-[#fffefb] hover:text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <div className="mt-4 flex flex-col gap-2">
                  {ctaButtons.map((btn) => (
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
                            className="w-full cursor-pointer justify-center bg-transparent text-center"
                          >
                            {btn.label}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex w-full max-w-[calc(100%-2rem)] sm:max-w-4xl flex-col gap-0 overflow-hidden p-0 bg-[#f5f0e8] max-h-[90vh]">
                          <DialogHeader className="shrink-0 px-6 pt-6 pb-3">
                            <DialogTitle className="text-2xl font-sans text-[#8B2332] text-center">
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
                  className="mt-4 w-full justify-center border border-amber-200/40 bg-gradient-to-r from-primary via-[#8B2332] to-secondary font-normal text-primary-foreground shadow-md ring-2 ring-secondary/30 hover:shadow-lg"
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
      </div>
    </header>
  )
}
