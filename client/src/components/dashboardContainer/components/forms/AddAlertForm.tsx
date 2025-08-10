import { z } from "zod";
import { alertFormSchema } from "./constants";
import type { Alert } from "@/components/dashboardContainer/types";
import AlertForm from "@/components/dashboardContainer/components/forms/AlertForm";

const AddAlertForm = () => {
  const onSubmit = (formData: z.infer<typeof alertFormSchema>) => {
    console.log("Add alert", formData);
  }

  const newAlert: Alert = {
    id: NaN,
    position: "",
    filters: {
      alertFreq: 1,
      location: "",
      keywords: [],
    },
    isActive: true,
  }

  return (
    <AlertForm
      initAlert={newAlert}
      onSubmit={onSubmit}
      submitLabel="Create"
    />
  )
}

export default AddAlertForm;