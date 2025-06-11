"use client"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookkeepingAssistance, type BookkeepingAssistanceInput, type BookkeepingAssistanceOutput } from "@/ai/flows/bookkeeping-assistance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const bookkeepingSchema = z.object({
  task: z.string().min(1, "Task description cannot be empty."),
  details: z.string().optional(),
});

export function BookkeepingForm() {
  const [result, setResult] = useState<BookkeepingAssistanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookkeepingAssistanceInput>({
    resolver: zodResolver(bookkeepingSchema),
    defaultValues: {
      task: "",
      details: "",
    },
  });

  const onSubmit: SubmitHandler<BookkeepingAssistanceInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await bookkeepingAssistance(data);
      setResult(response);
    } catch (e) {
      setError("An error occurred while fetching bookkeeping guidance. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Bookkeeping Assistance</CardTitle>
        <CardDescription>Describe a bookkeeping task you need help with, and our AI will provide guidance.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bookkeeping Task</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., How to record a new asset" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide more context if needed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Guidance
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <Alert>
            <AlertTitle className="font-semibold">Guidance</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap">{result.guidance}</AlertDescription>
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
