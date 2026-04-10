export type ScheduleViewingPayload = {
  fullName: string
  phone: string
  email: string
  adults: string
  kids: string
  pets: string
  moveInDate: string
  leaseTerm: string
  vehicles: string
  propertyAddress: string
}

function line(label: string, value: string): string {
  return `${label}: ${value.trim()}`
}

export function formatScheduleViewingEmailBody(d: ScheduleViewingPayload): string {
  return [
    line("Full Name", d.fullName),
    line("Phone Number", d.phone),
    line("Email", d.email),
    line("Number of Adults - moving in", d.adults),
    line("Number of Kids - moving in", d.kids),
    line("Pets", d.pets),
    line("Desired Move-In Date", d.moveInDate),
    line(
      "Desired Lease Term (e.g., 6 months, 1 year, long-term)",
      d.leaseTerm,
    ),
    line("Number of Vehicles", d.vehicles),
    line("Property You're Interested In", d.propertyAddress),
  ].join("\n")
}
