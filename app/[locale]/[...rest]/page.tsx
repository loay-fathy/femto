import { notFound } from "next/navigation";

// Any in-locale path that matches no real route falls through to the
// localized 404 (app/[locale]/not-found.tsx).
export default function CatchAllPage() {
  notFound();
}
