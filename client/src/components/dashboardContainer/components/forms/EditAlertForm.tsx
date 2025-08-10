import { z } from "zod";
import { alertFormSchema } from "./constants";
import type { Alert } from "@/components/types";
import AlertForm from "@/components/dashboardContainer/components/forms/AlertForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditAlertFormProps {
  alert: Alert;
}

const EditAlertForm = ({ alert }: EditAlertFormProps) => {
  const onSubmit = (formData: z.infer<typeof alertFormSchema>) => {
    console.log("Form submitted:", formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit alert for {alert.position}</DialogTitle>
          <DialogDescription className="mb-2">
            Modify the position query and filters for this alert.
          </DialogDescription>
          <AlertForm
            initAlert={alert}
            onSubmit={onSubmit}
            submitLabel="Save Changes"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditAlertForm;