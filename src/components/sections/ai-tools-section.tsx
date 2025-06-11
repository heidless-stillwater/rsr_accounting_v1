"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TerminologyForm } from "@/components/ai/terminology-form";
import { BookkeepingForm } from "@/components/ai/bookkeeping-form";
import { InvoiceForm } from "@/components/ai/invoice-form";
import { Lightbulb, BookText, Receipt, Bot } from "lucide-react";

export function AiToolsSection() {
  return (
    <section id="ai-tools" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
            AI-Powered Accounting Tools
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Leverage our intelligent tools for quick assistance with common accounting tasks.
          </p>
        </div>
        <Tabs defaultValue="terminology" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 h-auto sm:h-12 mb-8">
            <TabsTrigger value="terminology" className="py-2 sm:py-0 text-base">
              <BookText className="w-5 h-5 mr-2" /> Terminology Lookup
            </TabsTrigger>
            <TabsTrigger value="bookkeeping" className="py-2 sm:py-0 text-base">
              <Lightbulb className="w-5 h-5 mr-2" /> Bookkeeping Guide
            </TabsTrigger>
            <TabsTrigger value="invoice" className="py-2 sm:py-0 text-base">
              <Receipt className="w-5 h-5 mr-2" /> Invoice Generator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="terminology">
            <TerminologyForm />
          </TabsContent>
          <TabsContent value="bookkeeping">
            <BookkeepingForm />
          </TabsContent>
          <TabsContent value="invoice">
            <InvoiceForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
