/** Real Google Business Profile reviews — keep text verbatim from Google. */
export type GoogleReview = {
  name: string
  initial: string
  color: string
  rating: number
  text: string
  /** Relative date as shown on Google, or a neutral label if unknown */
  date: string
}

export const GOOGLE_REVIEW_URL = "https://g.page/r/CcoLA2Sqt-_ZEBM/review"
export const GOOGLE_PROFILE_URL = "https://g.page/r/CcoLA2Sqt-_ZEBM"

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Karishma",
    initial: "K",
    color: "bg-emerald-600",
    rating: 5,
    text: "I really appreciate their work. Highly recommended! Work in effective and efficient manner. One of the best in Edmonton.",
    date: "1 month ago",
  },
  {
    name: "Pankaj Bakshi",
    initial: "P",
    color: "bg-blue-600",
    rating: 5,
    text: "Clear communication, a transparent leasing process, and professional management made our experience as tenants positive and stress-free.",
    date: "1 month ago",
  },
  {
    name: "Sisodiya Indrajitsinh",
    initial: "S",
    color: "bg-amber-600",
    rating: 5,
    text: "Communication was quick and helpful whenever we had questions, which made the rental experience much easier. The lease process was transparent, and the team was professional throughout.",
    date: "1 month ago",
  },
  {
    name: "Zavian Pink",
    initial: "Z",
    color: "bg-rose-600",
    rating: 5,
    text: "Deva Rentals property Management is excellent in professionalism, communication prompts response to any issue and proactive maintenance and tenant Concerns thanks to Manpreet and Laksh your highly recommended.",
    date: "Verified on Google",
  },
  {
    name: "Pat Ganesan",
    initial: "P",
    color: "bg-teal-600",
    rating: 5,
    text: "As a realtor, my primary focus is working with buyers, and I do not currently handle property management directly. Recently, one of my clients was looking for a two-bedroom, two-bathroom condo rental, and I referred him to Deva Rentals. The feedback I received was excellent — the property was spotless, well-maintained, and move-in ready on time. The entire process was handled with professionalism and efficiency, which made for a smooth transition for my client. Based on this positive experience, I am pleased to recommend Deva Rentals as a trusted resource for rental management. I feel confident that clients I refer will be well taken care of, and I will not hesitate to recommend them again in the future.",
    date: "Verified on Google",
  },
]
