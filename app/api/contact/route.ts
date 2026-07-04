import { NextResponse } from "next/server";
import {
  getResend,
  fromEmail,
  inboxEmail,
  isEmail,
  isBot,
  clean,
} from "@/lib/mail";

/**
 * Contact-form endpoint. Validates the submission, drops honeypot hits, and
 * emails the enquiry to the company inbox via Resend with the sender set as
 * reply-to. The client (ContactMain.tsx) renders localized success/error copy
 * from the JSON response's ok flag, so this handler stays locale-agnostic.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: report success without sending so bots don't learn they were caught.
  if (isBot(body.hp)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const org = clean(body.org, 160);
  const message = clean(body.message, 5000);
  const inquiryLabel = clean(body.inquiryLabel, 60) || "General";

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 }
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: fromEmail(),
      to: inboxEmail(),
      replyTo: email,
      subject: `[${inquiryLabel}] enquiry from ${name}`,
      text:
        `Name: ${name}\n` +
        `Organisation: ${org || "—"}\n` +
        `Email: ${email}\n` +
        `Inquiry: ${inquiryLabel}\n\n` +
        `${message}\n`,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Missing key (getResend throws) or a network fault lands here.
    console.error("[contact] handler error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
