import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ScheduleViewingForm } from "@/components/forms/schedule-viewing-form"

export default function ScheduleViewingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#8B2332] hover:underline mb-5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-[#8B2332] text-center mb-2">
          Schedule Viewing
        </h1>
        <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mb-6" />

        <ScheduleViewingForm
          redirectHomeAfterMs={5000}
          showBackLinkOnSuccess
        />
      </div>
    </div>
  )
}
