
"use client"
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";

const navLinks = [
  { href: "#about-us", label: "About Us" },
  { href: "#contact", label: "Contact" },
  { href: "#services", label: "Services" },
  { href: "#ai-tools", label: "AI Tools" },
];

export function Header() {
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[calc(100px+2rem)] max-w-[95%] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center self-center gap-3" aria-label="RSR Accounting Home">
          <Image
            src="https://storage.googleapis.com/rsr_accounting/rsr_accounting_logo_live.png"
            alt="RSR Accounting Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
            data-ai-hint="company logo"
          />
        </Link>

        <nav className="hidden md:flex items-center self-center gap-6 text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center self-center gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4" aria-label="RSR Accounting Home">
                  <Image
                    src="https://storage.googleapis.com/rsr_accounting/rsr_accounting_logo_live.png"
                    alt="RSR Accounting Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                    data-ai-hint="company logo"
                  />
                </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
