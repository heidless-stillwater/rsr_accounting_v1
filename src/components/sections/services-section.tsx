import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Briefcase, Users, Landmark, Calculator, BarChart3 } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Tax Preparation & Filing",
    description: "Expert tax services for individuals and businesses, ensuring compliance and maximizing returns.",
  },
  {
    icon: BookOpen,
    title: "Bookkeeping Services",
    description: "Accurate and reliable bookkeeping to keep your financial records organized and up-to-date.",
  },
  {
    icon: BarChart3,
    title: "Financial Consulting",
    description: "Strategic financial advice to help you make informed decisions and achieve your financial objectives.",
  },
  {
    icon: Briefcase,
    title: "Business Accounting",
    description: "Comprehensive accounting solutions tailored for small to medium-sized enterprises.",
  },
  {
    icon: Users,
    title: "Personal Tax Services",
    description: "Personalized tax planning and assistance for individuals to manage their tax liabilities effectively.",
  },
  {
    icon: Landmark,
    title: "VAT Returns",
    description: "Efficient handling of VAT registration, preparation, and submission of VAT returns.",
  },
  {
    icon: Calculator,
    title: "Payroll Services",
    description: "Reliable payroll processing services to ensure your employees are paid accurately and on time.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
            Our Comprehensive Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We offer a wide range of accounting services to meet all your financial needs.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <service.icon className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
