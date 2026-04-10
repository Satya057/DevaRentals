export type ServiceRequestPayload = {
  tenantName: string
  email: string
  cell: string
  address: string
  city: string
  description: string
  authorization: "granted" | "not-granted"
}

function authLabel(v: ServiceRequestPayload["authorization"]): string {
  return v === "granted"
    ? "Permission granted to enter the premises in order to make repairs"
    : "Permission not granted — please contact prior to entry; 24 hour notice required"
}

export function formatServiceRequestEmailBody(d: ServiceRequestPayload): string {
  return [
    "Service Request (website)",
    "",
    `Tenant Name: ${d.tenantName}`,
    `Email: ${d.email}`,
    `Cell: ${d.cell}`,
    `Address: ${d.address}`,
    `City: ${d.city}`,
    "",
    "Description:",
    d.description,
    "",
    "Authorization:",
    authLabel(d.authorization),
    "",
    "---",
    "Reply to this email to contact the tenant.",
  ].join("\n")
}

export function formatServiceRequestEmailHtml(d: ServiceRequestPayload): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>")

  return `<div style="font-family:system-ui,Segoe UI,sans-serif;font-size:14px;color:#333;line-height:1.5">
<p style="margin:0 0 12px;font-weight:700;color:#8B2332">Service Request</p>
<table style="border-collapse:collapse;max-width:560px">
<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">Tenant</td><td style="padding:4px 0">${esc(d.tenantName)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">Email</td><td style="padding:4px 0">${esc(d.email)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">Cell</td><td style="padding:4px 0">${esc(d.cell)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">Address</td><td style="padding:4px 0">${esc(d.address)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">City</td><td style="padding:4px 0">${esc(d.city)}</td></tr>
</table>
<p style="margin:16px 0 4px;font-weight:600">Description</p>
<p style="margin:0">${esc(d.description)}</p>
<p style="margin:16px 0 4px;font-weight:600">Authorization</p>
<p style="margin:0">${esc(authLabel(d.authorization))}</p>
</div>`
}
