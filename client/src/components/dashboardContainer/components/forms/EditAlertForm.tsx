import { z } from "zod";
import { alertFormSchema } from "./constants";
import type { Alert } from "@/components/dashboardContainer/types";
import AlertForm from "@/components/dashboardContainer/components/forms/AlertForm";

interface EditAlertFormProps {
  alert: Alert;
}

const EditAlertForm = ({ alert }: EditAlertFormProps) => {
  const onSubmit = (formData: z.infer<typeof alertFormSchema>) => {
    console.log("Form submitted:", formData);
  }

  return (
    <AlertForm
      initAlert={alert}
      onSubmit={onSubmit}
      submitLabel="Save Changes"
    />
  )
}

export default EditAlertForm;