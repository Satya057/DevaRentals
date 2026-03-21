import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react"

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#landlords", label: "For Landlords" },
  { href: "#tenants", label: "For Tenants" },
  { href: "#contact", label: "Contact" },
]

const services = [
  "Tenant Screening",
  "Rent Collection",
  "Property Maintenance",
  "Legal Compliance",
  "Marketing",
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="w-[90%] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground p-2 rounded">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-4 bg-secondary rounded-t-sm" />
                  ))}
                </div>
                <div className="w-6 h-1 bg-secondary mt-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-background tracking-tight">DEVA RENTALS</span>
                <span className="text-[10px] text-background/60 tracking-widest uppercase">Property Management</span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Edmonton{"'"}s trusted property management company. 10+ years of delivering 
              rock-solid results for property owners.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@devarentals.com"
                  className="flex items-center gap-3 text-background/70 hover:text-secondary transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  info@devarentals.com
                </a>
              </li>
              <li>
                <a
                  href="tel:780-984-1996"
                  className="flex items-center gap-3 text-background/70 hover:text-secondary transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  780-984-1996
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=4027+10+Ave+NW,+Edmonton,+AB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-background/70 hover:text-secondary transition-colors text-sm"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  4027 10 Ave NW, Edmonton, AB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Deva Rentals | All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-background/60 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-background/60 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
