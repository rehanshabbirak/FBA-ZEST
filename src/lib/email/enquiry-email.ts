import { site } from "@/lib/site";

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
};

/**
 * Brand palette, duplicated from globals.css as literals. Email clients strip
 * <style> blocks and do not resolve CSS custom properties, so every colour has
 * to be inlined at the point of use.
 */
const C = {
  ink: "#111417",
  muted: "#5b6268",
  subtle: "#8a9297",
  line: "#e4e8ea",
  surface: "#f7f9f9",
  panel: "#f1f3f4",
  white: "#ffffff",
  teal: "#0d8290",
  tealSoft: "#5cc0c9",
  tealTint: "#eaf6f7",
} as const;

/**
 * Strapline in the email header. Deliberately not `site.tagline` — the website
 * introduces the company by what it is ("Amazon Account Management Agency"),
 * while a lead notification reads better framed by what the relationship is.
 */
const STRAPLINE = "Amazon Brand Growth Partner";

/** Webfonts do not load in most clients; this is the safe system stack. */
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const TIMESTAMP = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Karachi",
});

/** Every value below is visitor-supplied, so it is escaped before interpolation. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/**
 * Icons are glyphs in a coloured circle rather than SVG or <img>. Gmail strips
 * inline SVG outright, and remote images can be blocked before they load —
 * text always renders.
 */
function badge(glyph: string, size: number, bg: string, color: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td align="center" valign="middle" width="${size}" height="${size}" style="width:${size}px;height:${size}px;background-color:${bg};border-radius:${size}px;font-family:${FONT};font-size:${Math.round(size * 0.46)}px;line-height:${size}px;color:${color};text-align:center;">${glyph}</td>
  </tr></table>`;
}

/** Teal circle, uppercase title, short rule beneath — the section marker. */
function sectionHeading(glyph: string, title: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="middle" style="padding-right:12px;">${badge(glyph, 34, C.teal, C.white)}</td>
    <td valign="middle">
      <div style="font-family:${FONT};font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.ink};">${title}</div>
      <div style="margin-top:6px;width:52px;height:3px;background-color:${C.teal};font-size:0;line-height:0;">&nbsp;</div>
    </td>
  </tr></table>`;
}

function detailRow(
  glyph: string,
  label: string,
  valueHtml: string,
  isLast: boolean,
): string {
  const edge = isLast ? "" : `border-bottom:1px solid ${C.line};`;
  return `<tr>
    <td width="210" style="width:210px;padding:13px 16px;${edge}border-right:1px solid ${C.line};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding-right:11px;">${badge(glyph, 30, C.tealTint, C.teal)}</td>
        <td valign="middle" style="font-family:${FONT};font-size:14px;font-weight:600;color:${C.ink};">${label}</td>
      </tr></table>
    </td>
    <td style="padding:13px 18px;${edge}font-family:${FONT};font-size:14px;line-height:1.5;color:${C.muted};">${valueHtml}</td>
  </tr>`;
}

function buildHtml(enquiry: Enquiry, receivedAt: Date): string {
  const name = escapeHtml(enquiry.name);

  const rows: { glyph: string; label: string; value: string }[] = [
    { glyph: "&#128100;", label: "Name", value: name },
    {
      glyph: "&#9993;",
      label: "Email",
      value: `<a href="mailto:${encodeURI(enquiry.email)}" style="color:${C.teal};text-decoration:none;font-weight:500;">${escapeHtml(enquiry.email)}</a>`,
    },
  ];

  if (enquiry.company) {
    rows.push({
      glyph: "&#127970;",
      label: "Company",
      value: escapeHtml(enquiry.company),
    });
  }
  if (enquiry.phone) {
    rows.push({
      glyph: "&#128222;",
      label: "Phone",
      value: `<a href="tel:${encodeURI(enquiry.phone.replace(/\s+/g, ""))}" style="color:${C.muted};text-decoration:none;">${escapeHtml(enquiry.phone)}</a>`,
    });
  }
  if (enquiry.service) {
    rows.push({
      glyph: "&#127991;",
      label: "Service Interested In",
      // Pill, so the requested service reads as a tag rather than more prose.
      value: `<span style="display:inline-block;background-color:${C.teal};color:${C.white};border-radius:6px;padding:6px 12px;font-family:${FONT};font-size:13px;font-weight:600;">${escapeHtml(enquiry.service)}</span>`,
    });
  }

  const rowsHtml = rows
    .map((row, i) =>
      detailRow(row.glyph, row.label, row.value, i === rows.length - 1),
    )
    .join("");

  // Escape first, then convert newlines, so a typed "<br>" cannot become markup.
  const message = escapeHtml(enquiry.message).replace(/\r?\n/g, "<br />");

  const replyHref = `mailto:${encodeURI(enquiry.email)}?subject=${encodeURIComponent(
    `Re: your enquiry to ${site.name}`,
  )}`;

  // Shown in the inbox list beside the subject, then hidden in the body.
  const preheader = escapeHtml(
    singleLine(
      [enquiry.company, enquiry.service, enquiry.message]
        .filter(Boolean)
        .join(" · "),
    ).slice(0, 140),
  );

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>New lead from ${site.url.replace("https://", "")}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${C.surface};">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.surface};">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:640px;max-width:100%;background-color:${C.white};border:1px solid ${C.line};border-radius:12px;overflow:hidden;">

        <tr>
          <td style="background-color:${C.ink};padding:20px 30px;">
            <span style="font-family:${FONT};font-size:17px;font-weight:700;letter-spacing:-0.01em;color:${C.white};">${site.name}</span>
            <span style="font-family:${FONT};font-size:12px;color:${C.tealSoft};">&nbsp;&nbsp;|&nbsp;&nbsp;${STRAPLINE}</span>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 30px 22px;">
            ${sectionHeading("&#128100;", "Lead Information")}
          </td>
        </tr>

        <tr>
          <td style="padding:0 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${C.line};border-radius:10px;border-collapse:separate;">
              ${rowsHtml}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 30px 20px;">
            ${sectionHeading("&#128172;", "Message")}
          </td>
        </tr>

        <tr>
          <td style="padding:0 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.panel};border-radius:10px;">
              <tr>
                <td style="padding:18px 20px;font-family:${FONT};font-size:14px;line-height:1.7;color:${C.ink};">${message}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:30px 30px 10px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background-color:${C.teal};border-radius:8px;">
                  <a href="${replyHref}" style="display:inline-block;padding:15px 34px;font-family:${FONT};font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.white};text-decoration:none;">&#8594;&nbsp;&nbsp;Reply to Lead</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:0 30px 30px;">
            <p style="margin:0;font-family:${FONT};font-size:12.5px;line-height:1.6;color:${C.subtle};text-align:center;">Reply directly to this email to get in touch with the lead.</p>
          </td>
        </tr>

        <tr>
          <td style="background-color:${C.surface};border-top:1px solid ${C.line};padding:16px 30px;">
            <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.subtle};">
              Sent from the contact form at ${site.url.replace("https://", "")} &middot; ${TIMESTAMP.format(receivedAt)} PKT
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildText(enquiry: Enquiry, receivedAt: Date): string {
  const line = (label: string, value: string) =>
    value ? `${label.padEnd(22)}${value}` : "";

  return [
    `NEW LEAD — ${site.name}`,
    "".padEnd(52, "="),
    "",
    "LEAD INFORMATION",
    "".padEnd(52, "-"),
    line("Name", enquiry.name),
    line("Email", enquiry.email),
    line("Company", enquiry.company),
    line("Phone", enquiry.phone),
    line("Service Interested In", enquiry.service),
    "",
    "MESSAGE",
    "".padEnd(52, "-"),
    enquiry.message,
    "",
    "".padEnd(52, "-"),
    `Reply directly to this email to get in touch with the lead.`,
    `Sent from the contact form at ${site.url.replace("https://", "")} · ${TIMESTAMP.format(receivedAt)} PKT`,
  ]
    .filter((entry) => entry !== "")
    .join("\n");
}

/**
 * Renders the lead notification as both HTML and plain text. Clients that
 * refuse HTML — and spam filters, which score HTML-only mail worse — get the
 * plain part, so both are always sent together.
 */
export function renderEnquiryEmail(enquiry: Enquiry): {
  subject: string;
  html: string;
  text: string;
} {
  const receivedAt = new Date();

  return {
    subject: `New lead — ${singleLine(enquiry.name)}${
      enquiry.company ? ` (${singleLine(enquiry.company)})` : ""
    }`,
    html: buildHtml(enquiry, receivedAt),
    text: buildText(enquiry, receivedAt),
  };
}
