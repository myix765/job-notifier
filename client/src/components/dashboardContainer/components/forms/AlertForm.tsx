import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { alertFormSchema, FILTER_CONFIG } from "./constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LucideTrash2 } from "lucide-react";
import type { Alert } from "@/components/dashboardContainer/types";

interface AlertFormProps {
  initAlert: Alert;
  onSubmit: (data: z.infer<typeof alertFormSchema>) => void;
  submitLabel?: string;
}

const AlertForm = ({
  initAlert,
  onSubmit,
  submitLabel = "Submit",
}: AlertFormProps) => {
  const form = useForm<z.infer<typeof alertFormSchema>>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: {
      position: initAlert.position,
      filters: initAlert.filters,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="ex: Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filters"
          render={({ field }) => {
            const filters = field.value || {};
            const keys = Object.keys(FILTER_CONFIG) as (keyof typeof FILTER_CONFIG)[];

            const updateFilter = (
              key: keyof typeof FILTER_CONFIG,
              value: string | number | string[] | number[]
            ) => {
              field.onChange({ ...filters, [key]: value });
            };

            const addKeyword = () => {
              const currentKeywords = filters.keywords || [];
              updateFilter("keywords", [...currentKeywords, ""]);
            };

            const removeKeyword = (index: number) => {
              const currentKeywords = filters.keywords || [];
              const updatedKeywords = currentKeywords.filter((_, i) => i !== index);
              updateFilter("keywords", updatedKeywords);
            };

            return (
              <div className="*:mb-4">
                {keys.map((key) => {
                  const config = FILTER_CONFIG[key];
                  const value = filters[key];

                  if (config.single) {
                    // Single-value input
                    return (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`filters.${key}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{config.label}</FormLabel>
                            <FormControl>
                              <Input
                                type={config.type}
                                placeholder={config.placeholder}
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                  const newVal = config.type === "number" ? Number(e.target.value) : e.target.value;
                                  field.onChange(newVal);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  } else {
                    // Multi-value input
                    const keywords: string[] = Array.isArray(value) ? (value as string[]) : [];
                    return (
                      <FormField
                        key={key}
                        control={form.control}
                        name="filters.keywords"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <FormLabel>{config.label}</FormLabel>
                              <Button variant="secondary" type="button" size="sm" onClick={addKeyword}>
                                Add Keyword
                              </Button>
                            </div>

                            {keywords.map((_, idx) => (
                              <div key={idx} className="flex gap-2 items-center mb-2">
                                <FormControl>
                                  <Input
                                    value={field.value?.[idx] ?? ""}
                                    placeholder="Keyword"
                                    onChange={(e) => {
                                      const updated = [...(field.value || [])];
                                      updated[idx] = e.target.value;
                                      field.onChange(updated);
                                    }}
                                  />
                                </FormControl>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeKeyword(idx)}
                                >
                                  <LucideTrash2 size={16} />
                                </Button>
                              </div>
                            ))}

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  }
                })}
              </div>
            );
          }}
        />
        <div className="flex gap-2 mt-1">
          <Button type="submit">{submitLabel}</Button>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => form.reset()}>Reset</Button>
        </div>
      </form>
    </Form>
  )
}

export default AlertForm;