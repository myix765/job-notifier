import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addPhoneSchema } from "./constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { PRIVATE_ROUTES } from "@/routes/constants";

const AddPhone = () => {
  const form = useForm<z.infer<typeof addPhoneSchema>>({
    resolver: zodResolver(addPhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleAddPhone = async (formData: z.infer<typeof addPhoneSchema>) => {
    console.log("Adding phone number:", formData);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Phone Number</CardTitle>
        <CardDescription>
          Enter your phone number if you want to receive notifications (US only).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddPhone)}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 mt-6">
              <Button type="submit">Add</Button>
              <Button type="button" variant="secondary" asChild>
                <Link to={PRIVATE_ROUTES.DASHBOARD}>Skip</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};

export default AddPhone;