import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { alertSchema } from "./constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LucideTrash2 } from "lucide-react";
import type { Alert } from "@/components/dashboardContainer/types";
import { FILTER_TYPES } from "@/components/dashboardContainer/constants";

interface AlertFormProps {
  initAlert: Alert;
  onSubmit: (data: z.infer<typeof alertSchema>) => void;
  submitLabel?: string;
}

const AlertForm = ({
  initAlert,
  onSubmit,
  submitLabel = "Submit",
}: AlertFormProps) => {
  const form = useForm<z.infer<typeof alertSchema>>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      position: initAlert.position,
      alertFreq: initAlert.alertFreq,
      filters: initAlert.filters,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alertFreq"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notification Frequency (in hours)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of hours"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filters"
          render={({ field }) => (
            <div>
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Filters</FormLabel>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => field.onChange([...field.value, { type: "", value: "" }])}
                >
                  Add Filter
                </Button>
              </div>
              {field.value.map((filter, idx) => (
                <FormField
                  key={idx}
                  control={form.control}
                  name={`filters.${idx}`}
                  render={() => (
                    <FormItem className="mb-2">
                      <div key={idx} className="flex gap-2 items-center">
                        <FormControl>
                          <Select
                            value={filter.type}
                            onValueChange={(value) => {
                              const updated = [...field.value];
                              updated[idx].type = value;
                              field.onChange(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {FILTER_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <Input
                            placeholder="Value"
                            value={filter.value}
                            onChange={e => {
                              const updated = [...field.value];
                              updated[idx].value = e.target.value;
                              field.onChange(updated);
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const updated = field.value.filter((_, i) => i !== idx);
                            field.onChange(updated);
                          }}
                        >
                          <LucideTrash2 size={16} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}
        />
        <Button type="submit" className="mt-1">{submitLabel}</Button>
      </form>
    </Form>
  )
}

export default AlertForm;