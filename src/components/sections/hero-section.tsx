import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="py-20 md:py-32 bg-background">
      <div className="container max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          Expert Accounting Services for Your Success
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
          RSR Accounting offers comprehensive financial solutions, from tax preparation to bookkeeping, tailored to meet your personal and business needs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
