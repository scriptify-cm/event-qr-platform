"use client";

import { NavigationBar } from "@/components/layout/navigation-bar";
import { Footer } from "@/components/layout/footer";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
