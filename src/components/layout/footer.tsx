"use client";

import Link from "next/link";
import { Translate } from "@/components/shared/translate";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} EventQR. <Translate text="allRights" />
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link
            href="/terms"
            className="hover:underline underline-offset-4 hover:text-primary transition-colors"
          >
            <Translate text="terms" />
          </Link>
          <Link
            href="/privacy"
            className="hover:underline underline-offset-4 hover:text-primary transition-colors"
          >
            <Translate text="privacy" />
          </Link>
          <Link
            href="/contact"
            className="hover:underline underline-offset-4 hover:text-primary transition-colors"
          >
            <Translate text="contact" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
