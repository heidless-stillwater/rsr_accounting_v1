import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section
        id="home"
        className="py-20 md:py-32 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image
            src="https://storage.googleapis.com/rsr_accounting/rsr_accounting_about_live.jpg"
            alt="RSR Accounting Office"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="container px-4 sm:px-6 lg:px-8 text-center md:text-left relative z-10">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Expert Accounting Services for Your Success
          </h1>
          <p className="mt-6 text-lg sm:text-xl">
            RSR Accounting offers comprehensive financial solutions, from tax preparation to bookkeeping, tailored to meet your personal and business needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="#services">Our Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div> {/* Removed the image div */}
        </div>
      </section>
    </div>
  );
}
