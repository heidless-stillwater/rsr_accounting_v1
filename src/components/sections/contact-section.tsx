import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FinancialAdviceForm } from "@/components/ai/financial-advice-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "17 Colina Mews, Harringay Ladder, London N15 3HS",
    href: "https://www.google.com/maps/search/?api=1&query=17+Colina+Mews%2C+Harringay+Ladder%2C+London+N15+3HS"
  },
  {
    icon: Mail,
    label: "Email",
    value: "test@test.com",
    href: "mailto:test@test.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "07484 928 374",
    href: "tel:07484928374"
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help with all your accounting needs. Contact us today or ask our AI for quick advice.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="overflow-hidden shadow-xl mb-8">
              <CardContent className="p-0">
                <Image
                  src="https://storage.googleapis.com/rsr_accounting/rsr_accounting_team_live.jpg"
                  alt="RSR Accounting Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-[3/2] rounded-lg"
                  data-ai-hint="office people"
                />
              </CardContent>
            </Card>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">{item.label}:</span>
                    <Link href={item.href} target={item.label === "Address" ? "_blank" : undefined} rel={item.label === "Address" ? "noopener noreferrer" : undefined} className="block text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FinancialAdviceForm />
          </div>
        </div>
      </div>
    </section>
  );
}
