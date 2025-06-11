"use client"
import { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateInvoice, type GenerateInvoiceInput, type GenerateInvoiceOutput } from "@/ai/flows/invoice-generation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(0.01, "Quantity must be positive"),
  unitPrice: z.coerce.number().min(0.01, "Unit price must be positive"),
});

const invoiceSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  customerEmail: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  companyEmail: z.string().email("Invalid company email"),
  companyPhone: z.string().min(1, "Company phone is required"),
  invoiceItems: z.array(invoiceItemSchema).min(1, "At least one invoice item is required"),
});

export function InvoiceForm() {
  const [result, setResult] = useState<GenerateInvoiceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GenerateInvoiceInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerName: "",
      customerAddress: "",
      customerEmail: "",
      companyName: "RSR Accounting",
      companyAddress: "17 Colina Mews, Harringay Ladder, London N15 3HS",
      companyEmail: "test@test.com",
      companyPhone: "07484928374",
      invoiceItems: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invoiceItems",
  });

  const onSubmit: SubmitHandler<GenerateInvoiceInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await generateInvoice(data);
      setResult(response);
    } catch (e) {
      setError("An error occurred while generating the invoice. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Invoice Generator</CardTitle>
        <CardDescription>Fill in the details below to generate an invoice.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="customerName" render={({ field }) => (<FormItem><FormLabel>Customer Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="customerEmail" render={({ field }) => (<FormItem><FormLabel>Customer Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="customerAddress" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Customer Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="companyEmail" render={({ field }) => (<FormItem><FormLabel>Company Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="companyAddress" render={({ field }) => (<FormItem><FormLabel>Company Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="companyPhone" render={({ field }) => (<FormItem><FormLabel>Company Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Invoice Items</h3>
              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 items-end mb-4 p-4 border rounded-md">
                  <FormField control={form.control} name={`invoiceItems.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`invoiceItems.${index}.quantity`} render={({ field }) => (<FormItem><FormLabel>Qty</FormLabel><FormControl><Input type="number" step="1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`invoiceItems.${index}.unitPrice`} render={({ field }) => (<FormItem><FormLabel>Unit Price</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label="Remove item" className="self-end mb-1">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
               {form.formState.errors.invoiceItems && !form.formState.errors.invoiceItems.root && typeof form.formState.errors.invoiceItems.message === 'string' && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.invoiceItems.message}</p>
               )}
              <Button type="button" variant="outline" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Invoice
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <Alert>
            <AlertTitle className="font-semibold">Generated Invoice</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap p-4 bg-muted rounded-md overflow-x-auto">{result.invoice}</AlertDescription>
          </Alert>
        </CardContent>
      )}
       {error && (
         <CardContent>
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
         </CardContent>
      )}
    </Card>
  );
}
