"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, CalendarDays, ExternalLink, FileText, Wrench } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"
import { ScheduleViewingForm } from "@/components/forms/schedule-viewing-form"
import { RentalApplicationForm } from "@/components/forms/rental-application-form"
import { ServiceRequestForm } from "@/components/forms/service-request-form"

const formCards = [
  {
    id: "landlord",
    icon: Building,
    label: "Landlord Inquiry",
    description: "List your property with us",
    title: "Landlord Inquiry Form",
  },
  {
    id: "rental",
    icon: FileText,
    label: "Rental Application",
    description: "Apply for a rental property",
    title: "Rental Application",
  },
  {
    id: "schedule",
    icon: CalendarDays,
    label: "Schedule Viewing",
    description: "Book a property tour",
    title: "Schedule Viewing",
  },
  {
    id: "service",
    icon: Wrench,
    label: "Service Request",
    description: "Submit a maintenance request",
    title: "Service Request",
  },
]

export function Contact() {
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

  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-balance">
          Forms & Applications
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Dialog
                key={card.id}
                open={openDialog === card.id}
                onOpenChange={(open) => setOpenDialog(open ? card.id : null)}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-4 p-5 bg-muted rounded-xl hover:bg-primary/10 transition-colors group border border-transparent hover:border-primary/20 text-left w-full cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{card.label}</p>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[90vh] p-0 bg-[#f5f0e8]">
                  <DialogHeader className="px-6 pt-6 pb-0">
                    <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                      {card.title}
                    </DialogTitle>
                    <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                    <div className="mt-2 text-center">
                      <Link
                        href={`/forms/${card.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#8B2332] hover:underline"
                      >
                        Open full page
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </DialogHeader>
                  <ScrollArea className="max-h-[calc(90vh-100px)] px-6 pb-6">
                    {renderForm(card.id, () => setOpenDialog(null))}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </section>
  )
}
