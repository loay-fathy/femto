import { NextResponse } from "next/server";
import { getResend, audienceId, isEmail, isBot, clean } from "@/lib/mail";

/**
 * Newsletter sign-up endpoint. Adds the email as a contact in a Resend Audience
 * (real list storage). Resend upserts, so re-subscribing the same address is
 * idempotent — an "already exists" style error is treated as success.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (isBot(body.hp)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 }
    );
  }

  const id = audienceId();
  if (!id) {
    console.error("[newsletter] RESEND_AUDIENCE_ID is not set");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  try {
    // `audienceId` is the legacy (deprecated-but-supported) contacts API; it maps
    // to POST /audiences/:id/contacts. Kept because we address the list by ID.
    const { error } = await getResend().contacts.create({
      audienceId: id,
      email,
      unsubscribed: false,
    });

    if (error && !/already/i.test(error.message ?? "")) {
      console.error("[newsletter] resend error:", error);
      return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] handler error:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
