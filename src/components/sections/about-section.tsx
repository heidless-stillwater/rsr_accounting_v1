import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutUsSection() {
  return (
    <section id="about-us" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-6">
              About RSR Accounting
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              RSR Accounting is dedicated to providing top-tier accounting services to individuals and businesses. With years of experience in the industry, we pride ourselves on our professionalism, expertise, and client-focused approach.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our mission is to help you navigate the complexities of finance with ease and confidence. Whether you need assistance with tax planning, bookkeeping, or financial consulting, our team is here to support your financial goals.
            </p>
            <p className="text-lg text-muted-foreground">
              Located in Harringay Ladder, London, we serve clients across various sectors, offering personalized solutions to meet their unique needs.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="https://storage.googleapis.com/rsr_accounting/rsr_about_live.jpg"
                  alt="About RSR Accounting"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-[3/2] rounded-lg"
                  data-ai-hint="office team"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
