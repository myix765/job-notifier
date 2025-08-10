import { z } from "zod";

export const alertFormSchema = z.object({
  position: z.string().nonempty("Position is required"),
  filters: z.object({
    alertFreq: z.number().min(1, "Scrape frequency must be at least 1 hour"),
    location: z
      .union([z.string(), z.null()])
      .transform(val => (val && val.trim() !== "" ? val : null)),
    keywords: z
      .union([z.array(z.string()), z.null()])
      .transform(val => {
        const transformed = (val ?? []).filter(kw => kw.trim() !== "");
        return transformed.length > 0 ? transformed : null;
      }),
  })
});

export const FILTER_CONFIG = {
  alertFreq: {
    label: "Notification Frequency (hours)",
    placeholder: "ex: 24",
    single: true,
    type: "number",
  },
  location: {
    label: "Location",
    placeholder: "ex: United States",
    single: true,
    type: "text",
  },
  keywords: {
    label: "Keywords",
    placeholder: "ex: Entry level",
    single: false,
    type: "text",
  },
};