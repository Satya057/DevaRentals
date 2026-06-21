"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import {
  BadgeCheck,
  ChevronLeft,
  Coins,
  Menu,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  ReceiptText,
  Smile,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * Deva Rentals brand accents (aligns with globals `--primary` #6c1517 and in-app #8B2332).
 * Change here to retheme the widget without touching the rest of the site.
 */
const BRAND = {
  /** Site maroon — headers, support bubbles, launcher bar */
  bubble: "#8B2332",
} as const

type ActionLink = { href: string; label: string }

type HelpTopic = {
  id: string
  title: string
  patterns: RegExp[]
  chatSummary: string
  actions: ActionLink[]
  suggestAfter?: string[]
}

const quickTopics: HelpTopic[] = [
  {
    id: "contact",
    title: "How do I contact you?",
    patterns: [
      /780[\s.-]*984|984[\s.-]*1996|info@devarentals|devarentals\.com|your phone|your email|website|how to reach|get in touch|call you|email you/i,
    ],
    chatSummary:
      "Reach Deva Rentals at 780-984-1996, info@devarentals.com, or https://devarentals.com — or open Forms & contact for every form in one place.",
    actions: [
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
      { href: "mailto:info@devarentals.com", label: "Email info@devarentals.com" },
      { href: "https://devarentals.com", label: "Visit devarentals.com" },
      { href: "/#contact", label: "Forms & contact" },
    ],
    suggestAfter: ["fees", "included", "areas"],
  },
  {
    id: "fees",
    title: "Management fees?",
    patterns: [
      /fee|fees|management fee|commission|percent|pricing|how much|cost to manage|monthly charge|setup fee|tenant placement|10\s*%|flat fee/i,
    ],
    chatSummary:
      "Our landlord materials outline flat fees: $300 one-time setup, $300 tenant placement, plus 10% monthly management — all-inclusive style service in Edmonton & area. Your property may still need a quick review; send a landlord inquiry or call to confirm.",
    actions: [
      { href: "/forms/landlord", label: "Landlord inquiry" },
      { href: "/#landlords", label: "Landlord services on site" },
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
    ],
    suggestAfter: ["included", "areas", "landlord"],
  },
  {
    id: "included",
    title: "What’s included?",
    patterns: [
      /what'?s included|all[- ]?inclusive|rentfaster|buildium|credit check|unlimited showings|move[- ]?in|lease prep|rent collection|tenant communication|24\s*\/\s*7|photos and videos|listings on/i,
    ],
    chatSummary:
      "Typical inclusions: professional photos/videos and listings (e.g. RentFaster & major rental sites), credit checks & Buildium setup, unlimited showings, move-in/out inspections and lease prep, rent collection, maintenance coordination, tenant communication, and support involving RECA-licensed professionals.",
    actions: [
      { href: "/#landlords", label: "Landlord services" },
      { href: "/forms/landlord", label: "Landlord inquiry" },
    ],
    suggestAfter: ["fees", "why_deva", "areas"],
  },
  {
    id: "areas",
    title: "What areas do you serve?",
    patterns: [
      /beaumont|sherwood park|st\.?\s*albert|surrounding areas|which cities|what areas|where do you serve|coverage|locations? we serve|edmonton area/i,
    ],
    chatSummary:
      "We highlight Edmonton, Beaumont, Sherwood Park, St. Albert, and nearby communities for full-service management. Not sure your address qualifies? Call or send a landlord inquiry with the address.",
    actions: [
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
      { href: "/forms/landlord", label: "Landlord inquiry" },
    ],
    suggestAfter: ["fees", "included", "contact"],
  },
  {
    id: "why_deva",
    title: "Why choose Deva Rentals?",
    patterns: [
      /why choose|why deva|stress[- ]?free|minimal vacancy|fast tenant|trusted vendors|transparent financial|expert support|10\+ years|ten years/i,
    ],
    chatSummary:
      "Owners work with us for faster tenant placement, less vacancy, reliable tenants, compliance, vetted vendors, clear financials, and day-to-day support — the same themes you’ll see on our site (10+ years serving Edmonton owners).",
    actions: [
      { href: "/#why-us", label: "Why Deva Rentals" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/forms/landlord", label: "Landlord inquiry" },
    ],
    suggestAfter: ["fees", "included", "contact"],
  },
  {
    id: "reca",
    title: "Are you RECA licensed?",
    patterns: [/reca|licensed professionals|are you licensed|credentials|regulated/i],
    chatSummary:
      "Our materials state that service is handled with RECA-licensed professionals involved in the rental process. For specifics about your situation, ask on a call or landlord inquiry.",
    actions: [
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
      { href: "/forms/landlord", label: "Landlord inquiry" },
    ],
    suggestAfter: ["included", "fees", "contact"],
  },
  {
    id: "rentals",
    title: "Available rentals?",
    patterns: [
      /rental|vacanc|available|for rent|lease\b|leasing|apartment|townhouse|suite|property list|open unit|anything open/i,
    ],
    chatSummary:
      "Vacancies change often. Browse homes we’ve recently leased on the site, then call 780-984-1996 or email for what’s open right now.",
    actions: [
      { href: "/rented-properties", label: "View rented properties" },
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
    ],
    suggestAfter: ["showing", "rental", "fees"],
  },
  {
    id: "showing",
    title: "Book a showing",
    patterns: [
      /showing|viewing|tour|visit the|see the (unit|place|property|home)|book (a )?show|schedule (a )?(view|visit|tour)/i,
    ],
    chatSummary:
      "Use our schedule viewing form with your preferred times — we’ll confirm or suggest alternatives.",
    actions: [{ href: "/forms/schedule", label: "Schedule viewing form" }],
    suggestAfter: ["rental", "rentals", "maintenance"],
  },
  {
    id: "maintenance",
    title: "Maintenance request",
    patterns: [
      /maintenance|repair|fix\b|broken|leak|heat|plumb|electrical|service request|something wrong|not working/i,
    ],
    chatSummary:
      "Submit details (and photos if you can) through our service request form so we can route the right vendor — same flow tenants use on the site.",
    actions: [{ href: "/forms/service", label: "Service request form" }],
    suggestAfter: ["showing", "rental", "contact"],
  },
  {
    id: "landlord",
    title: "Landlord inquiry",
    patterns: [
      /landlord|owner|list my|list your|property management|manage my (property|rental|building)|switch (managers|companies)/i,
    ],
    chatSummary:
      "Tell us about your property — we’ll follow up with next steps. Great if you already know your area; if not, we can confirm coverage for Edmonton & nearby.",
    actions: [{ href: "/forms/landlord", label: "Landlord inquiry form" }],
    suggestAfter: ["fees", "included", "areas"],
  },
  {
    id: "rental",
    title: "Rental application?",
    patterns: [
      /application|apply to rent|tenant apply|apply for (the )?(unit|place|rental)|rental app/i,
    ],
    chatSummary:
      "Ready to apply? Use our secure rental application — upload documents and complete signatures where required. Questions first? Call or email.",
    actions: [
      { href: "/forms/rental", label: "Rental application form" },
      { href: "tel:780-984-1996", label: "Call 780-984-1996" },
    ],
    suggestAfter: ["showing", "rentals", "contact"],
  },
]

const topicById = new Map(quickTopics.map((t) => [t.id, t]))

const defaultAutoReply = {
  chatSummary:
    "We’re not sure which topic fits best. Try asking about fees, what’s included, areas we serve, or contact — or reach us at 780-984-1996 / info@devarentals.com / devarentals.com and a team member will reply.",
  actions: [
    { href: "tel:780-984-1996", label: "Call 780-984-1996" },
    { href: "mailto:info@devarentals.com", label: "Email info@devarentals.com" },
    { href: "https://devarentals.com", label: "Visit devarentals.com" },
    { href: "/#contact", label: "Forms & contact" },
  ] satisfies ActionLink[],
}

type ChatMessage = {
  id: string
  role: "user" | "support"
  text: string
  actions?: ActionLink[]
  sourceTopicId?: string
}

function findTopicByQuestion(text: string): HelpTopic | null {
  const q = text.trim()
  if (!q) return null
  for (const topic of quickTopics) {
    if (topic.patterns.some((re) => re.test(q))) return topic
  }
  return null
}

function newMsgId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function BubbleActions({
  actions,
  onNavigate,
}: {
  actions: ActionLink[]
  onNavigate?: () => void
}) {
  const base =
    "mt-2 flex w-full items-center justify-center rounded-xl border border-white/35 bg-white/10 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-white/20 transition-colors"

  return (
    <div className="mt-2 flex flex-col gap-2">
      {actions.map((a) => (
        <Link
          key={a.href + a.label}
          href={a.href}
          className={base}
          onClick={onNavigate}
        >
          {a.label}
        </Link>
      ))}
    </div>
  )
}

function SuggestionChip({ label, onPick }: { label: string; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={cn(
        "shrink-0 rounded-full border border-primary/30 bg-primary/[0.07] px-3 py-1.5 text-left text-xs font-medium",
        "text-primary transition-colors hover:bg-primary/12",
      )}
    >
      {label}
    </button>
  )
}

function TopicCard({
  title,
  caption,
  icon,
  onPick,
}: {
  title: string
  caption: string
  icon: ReactNode
  onPick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={cn(
        "group rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent p-3 text-left",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md",
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          {icon}
        </span>
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{caption}</p>
    </button>
  )
}

/**
 * Mobile: icon-only FAB with blink. Desktop: full “We Are Here!” launcher.
 */
function ChatFabButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8B2332] text-white",
        "chat-fab-blink transition-colors hover:bg-[#7a1f2c]",
      )}
      aria-label="Open support chat"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.15} aria-hidden />
    </button>
  )
}

/**
 * Launcher: transparent wrap, arched “We Are Here!” (light blue + white stroke), 👋 on the left.
 */
function WeAreHereLauncher({
  minimized,
  onMinimize,
  onOpen,
}: {
  minimized: boolean
  onMinimize: () => void
  onOpen: () => void
}) {
  if (minimized) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "relative flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-[#8B2332] text-white shadow-xl",
          "transition-transform hover:scale-[1.04] hover:bg-[#7a1f2c]",
        )}
        aria-label="Open support chat"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#8B2332]/60 animate-ping" />
        <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>
    )
  }

  return (
    <div className="relative mx-auto w-[min(52vw,168px)] bg-transparent pb-1 pt-5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onMinimize()
        }}
        className="absolute right-0 top-0 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-white shadow-md hover:bg-black/55 sm:h-6 sm:w-6"
        aria-label="Minimize to icon"
      >
        <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden />
      </button>

      <div className="relative mx-auto aspect-square w-[min(48vw,148px)] max-w-[148px]">
        <p
          className={cn(
            "pointer-events-none absolute left-1/2 top-[2%] z-20 w-[118%] -translate-x-1/2 text-center",
            "text-[13px] font-extrabold leading-snug tracking-tight text-white sm:text-sm",
            "[text-shadow:0_1px_0_#6d1c28,0_2px_8px_rgba(0,0,0,0.55)]",
          )}
        >
          We Are Here!
        </p>

        {/* Hand on the curve, left side of the ring, tilted toward the button */}
        <span
          className={cn(
            "pointer-events-none absolute left-[6%] top-[44%] z-[5] select-none text-[1.35rem] leading-none drop-shadow-md",
            "origin-bottom-right -rotate-[26deg] sm:left-[7%] sm:text-[1.5rem]",
          )}
          aria-hidden
        >
          👋
        </span>

        <button
          type="button"
          onClick={onOpen}
          className={cn(
            "absolute left-1/2 top-[58%] z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white",
            "bg-[#8B2332] shadow-[0_6px_16px_-4px_rgba(139,35,50,0.45)] transition hover:scale-[1.05] hover:bg-[#7a1f2c] sm:h-[3.25rem] sm:w-[3.25rem]",
          )}
          aria-label="Open support chat"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full border border-white/25" />
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.35} aria-hidden />
        </button>
      </div>
    </div>
  )
}

/** On-site support chat — theme matches Deva Rentals (primary maroon, brand bubble). */
export function VisitorHelp() {
  const panelId = useId()
  const [chatOpen, setChatOpen] = useState(false)
  const [launcherMinimized, setLauncherMinimized] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const closeAll = useCallback(() => {
    setChatOpen(false)
    setMenuOpen(false)
    setComposerOpen(false)
    setInput("")
    setMessages([])
  }, [])

  const openChat = useCallback(() => {
    setChatOpen(true)
  }, [])

  useEffect(() => {
    if (!chatOpen) return
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, chatOpen])

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          id: newMsgId(),
          role: "support",
          text: "👋 Hi! How can we help?",
        },
      ])
    }
  }, [chatOpen, messages.length])

  const pushSupport = useCallback(
    (text: string, actions?: ActionLink[], sourceTopicId?: string) => {
      setMessages((m) => [
        ...m,
        { id: newMsgId(), role: "support", text, actions, sourceTopicId },
      ])
    },
    [],
  )

  const sendUserMessage = useCallback(() => {
    const t = input.trim()
    if (!t) return
    setInput("")
    setMessages((m) => [...m, { id: newMsgId(), role: "user", text: t }])

    const hit = findTopicByQuestion(t)
    if (hit) {
      pushSupport(hit.chatSummary, hit.actions, hit.id)
      return
    }
    pushSupport(defaultAutoReply.chatSummary, defaultAutoReply.actions)
  }, [input, pushSupport])

  const sendPreset = useCallback(
    (topic: HelpTopic) => {
      setMenuOpen(false)
      setMessages((m) => [...m, { id: newMsgId(), role: "user", text: topic.title }])
      pushSupport(topic.chatSummary, topic.actions, topic.id)
    },
    [pushSupport],
  )

  const lastTopicForSuggestions = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role === "support" && m.sourceTopicId) return m.sourceTopicId
    }
    return null
  }, [messages])

  const followUpTopics = useMemo(() => {
    if (!lastTopicForSuggestions) return []
    const t = topicById.get(lastTopicForSuggestions)
    if (!t?.suggestAfter?.length) return []
    const out: HelpTopic[] = []
    for (const id of t.suggestAfter) {
      const next = topicById.get(id)
      if (next && next.id !== t.id) out.push(next)
    }
    return out
  }, [lastTopicForSuggestions])

  const featuredTopics = useMemo(
    () => [
      { id: "fees", caption: "Setup + placement + monthly management", icon: <Coins className="h-4 w-4" /> },
      { id: "included", caption: "Photos, listings, showings, inspections, rent collection", icon: <ReceiptText className="h-4 w-4" /> },
      { id: "areas", caption: "Edmonton, Beaumont, Sherwood Park, St. Albert", icon: <MapPin className="h-4 w-4" /> },
      { id: "contact", caption: "Call, email, or forms in one place", icon: <Phone className="h-4 w-4" /> },
      { id: "reca", caption: "RECA-licensed support process", icon: <BadgeCheck className="h-4 w-4" /> },
    ],
    [],
  )

  const onlyWelcome =
    messages.length === 1 && messages[0]?.role === "support" && !messages[0]?.actions

  return (
    <div className="fixed bottom-3 right-2 z-40 flex flex-col items-end gap-2 sm:bottom-4 sm:right-4">
      {chatOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Customer support chat"
          className={cn(
            "flex w-[min(100vw-1.25rem,340px)] flex-col overflow-hidden rounded-xl border border-border shadow-2xl",
            "bg-card",
            "h-[min(500px,calc(100dvh-5rem))] max-h-[600px]",
          )}
        >
          <header className="flex shrink-0 items-center gap-1.5 bg-gradient-to-r from-primary to-[#8B2332] px-2 py-2.5 text-primary-foreground">
            <button
              type="button"
              onClick={closeAll}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
              aria-label="Close chat"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <h2 className="flex-1 text-center text-xs font-semibold tracking-tight pr-6 sm:text-sm">
              Customer Support
            </h2>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
              {menuOpen ? (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-10 cursor-default bg-transparent"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  />
                  <nav className="absolute right-0 top-full z-20 mt-1 min-w-[200px] rounded-lg border border-border bg-card py-1 text-sm shadow-lg">
                    <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Quick links
                    </p>
                    {quickTopics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => sendPreset(t)}
                        className="flex w-full px-3 py-2 text-left text-foreground hover:bg-muted/70"
                      >
                        {t.title}
                      </button>
                    ))}
                    <Link
                      href="/#contact"
                      className="block px-3 py-2 text-foreground hover:bg-muted/70"
                      onClick={() => {
                        setMenuOpen(false)
                        setChatOpen(false)
                      }}
                    >
                      Contact & forms
                    </Link>
                  </nav>
                </>
              ) : null}
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-card px-2.5 py-2.5">
            <div className="flex flex-col gap-3">
              {messages.map((msg) =>
                msg.role === "support" ? (
                  <div key={msg.id} className="flex max-w-[92%] gap-2">
                    <div className="shrink-0 pt-5">
                      <img
                        src="/rental-dv-logo.jpg?v=12"
                        alt=""
                        className="h-8 w-8 rounded-full border border-border object-cover"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs text-muted-foreground">Customer Support</p>
                      <div
                        className="rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm"
                        style={{ backgroundColor: BRAND.bubble }}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.actions?.length ? (
                          <BubbleActions
                            actions={msg.actions}
                            onNavigate={() => setChatOpen(false)}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-md border border-border/60 bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                      {msg.text}
                    </div>
                  </div>
                ),
              )}

              {onlyWelcome ? (
                <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] to-transparent px-3 py-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    Instant assistant topics
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {featuredTopics.map((item) => {
                      const topic = topicById.get(item.id)
                      if (!topic) return null
                      return (
                        <TopicCard
                          key={topic.id}
                          title={topic.title}
                          caption={item.caption}
                          icon={item.icon}
                          onPick={() => sendPreset(topic)}
                        />
                      )
                    })}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {quickTopics.slice(0, 6).map((t) => (
                      <SuggestionChip key={t.id} label={t.title} onPick={() => sendPreset(t)} />
                    ))}
                  </div>
                </div>
              ) : null}

              {followUpTopics.length > 0 ? (
                <div className="rounded-xl border border-border bg-muted/50 px-3 py-2.5">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    You might also ask
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {followUpTopics.map((t) => (
                      <SuggestionChip
                        key={t.id}
                        label={t.title}
                        onPick={() => sendPreset(t)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-muted/50 px-2 pt-1.5 pb-1">
            <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Quick suggestions
            </p>
            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
              {quickTopics.map((t) => (
                <SuggestionChip
                  key={`bar-${t.id}`}
                  label={t.title.replace(/\?$/, "")}
                  onPick={() => sendPreset(t)}
                />
              ))}
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-card px-2 py-1.5">
            {!composerOpen ? (
              <button
                type="button"
                onClick={() => setComposerOpen(true)}
                className="flex w-full items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.06] px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/[0.12]"
              >
                Ask a custom question
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendUserMessage()
                    }
                  }}
                  placeholder="Ask about fees, areas, what’s included, contact…"
                  className="min-h-10 flex-1 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
                  aria-label="Message"
                />
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                  aria-label="Hide custom question box"
                  title="Hide typing box"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
                <span className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg opacity-50"
                    title="Reactions"
                  >
                    <ThumbsUp className="h-5 w-5" aria-hidden />
                  </span>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg opacity-50"
                    title="Attachments not available in web chat"
                  >
                    <Paperclip className="h-5 w-5" aria-hidden />
                  </span>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg opacity-50"
                    title="Emoji"
                  >
                    <Smile className="h-5 w-5" aria-hidden />
                  </span>
                </span>
              </div>
            )}
          </div>

          <p className="border-t border-border bg-muted/40 px-2 py-1.5 text-center text-[10px] text-muted-foreground">
            Deva Rentals — quick answers from our flyer & site topics (keyword matching); suggestions send that
            question for you. A person can follow up by phone or email.
          </p>
        </div>
      ) : (
        <>
          <div className="md:hidden">
            <ChatFabButton onOpen={openChat} />
          </div>
          <div className="hidden md:block">
            <WeAreHereLauncher
              minimized={launcherMinimized}
              onMinimize={() => setLauncherMinimized(true)}
              onOpen={openChat}
            />
          </div>
        </>
      )}
    </div>
  )
}
