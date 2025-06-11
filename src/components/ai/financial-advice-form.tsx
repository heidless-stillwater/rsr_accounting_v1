"use client"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFinancialAdvice, type GetFinancialAdviceInput, type GetFinancialAdviceOutput } from "@/ai/flows/financial-advice-chatbot";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const adviceSchema = z.object({
  query: z.string().min(10, "Query must be at least 10 characters long."),
});

export function FinancialAdviceForm() {
  const [result, setResult] = useState<GetFinancialAdviceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GetFinancialAdviceInput>({
    resolver: zodResolver(adviceSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit: SubmitHandler<GetFinancialAdviceInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await getFinancialAdvice(data);
      setResult(response);
    } catch (e) {
      setError("An error occurred while fetching financial advice. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Financial Advice Chatbot</CardTitle>
        <CardDescription>Ask our AI chatbot for advice on accounting and tax-related questions.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., What are the tax implications of becoming a sole trader?" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Advice
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <Alert>
            <AlertTitle className="font-semibold">AI Financial Advisor Says:</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap">{result.advice}</AlertDescription>
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
