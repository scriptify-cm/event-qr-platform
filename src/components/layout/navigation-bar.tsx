"use client";

import { Translate } from "@/components/shared/translate";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

interface NavItemProps {
  href: string;
  text: string;
  isActive?: boolean;
}

function NavItem({ href, text, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive
          ? "text-primary"
          : "text-muted-foreground"
      }`}
    >
      <Translate text={text} />
    </Link>
  );
}

export function NavigationBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");  // In a real app, this would be determined by the router

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">
              <span className="text-primary">Event</span>QR
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <NavItem href="/" text="home" isActive={activePath === "/"} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavItem href="/reservations" text="reservations" isActive={activePath === "/reservations"} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavItem href="/tickets" text="myTickets" isActive={activePath === "/tickets"} />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setSheetOpen(false)}>
              <span className="font-bold text-xl">
                <span className="text-primary">Event</span>QR
              </span>
            </Link>
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setSheetOpen(false)}
              >
                <Translate text="home" />
              </Link>
              <Link
                href="/reservations"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setSheetOpen(false)}
              >
                <Translate text="reservations" />
              </Link>
              <Link
                href="/tickets"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setSheetOpen(false)}
              >
                <Translate text="myTickets" />
              </Link>
              <Link
                href="/auth/login"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setSheetOpen(false)}
              >
                <Translate text="login" />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <span className="font-bold text-xl">
                <span className="text-primary">Event</span>QR
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="hidden md:block">
              <Button variant="default" asChild>
                <Link href="/auth/login">
                  <Translate text="login" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
