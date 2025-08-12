import { useState } from "react";
import { z } from "zod";
import { alertFormSchema } from "./constants";
import type { Alert } from "@/types/alert";
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
import { useAlerts } from "@/hooks/useAlerts";

interface EditAlertFormProps {
  alert: Alert;
}

const EditAlertForm = ({ alert }: EditAlertFormProps) => {
  const [open, setOpen] = useState(false);
  const { editAlert } = useAlerts();

  const onSubmit = async (formData: z.infer<typeof alertFormSchema>) => {
    const edits = {
      ...alert,
      ...formData,
    }
    await editAlert(edits);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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