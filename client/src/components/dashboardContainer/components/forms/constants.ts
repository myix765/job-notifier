import { z } from "zod";

export const alertSchema = z.object({
  position: z.string().nonempty("Position is required"),
  alertFreq: z.number().min(1, "Scrape frequency must be at least 1 hour"),
  filters: z.array(
    z.object({
      type: z.string().nonempty("Type is required"),
      value: z.string().nonempty("Value is required"),
    }).refine(
      (data) => data.type.trim() !== "" && data.value.trim() !== "",
      { message: "Type and value are required" }
    )
  )
});
