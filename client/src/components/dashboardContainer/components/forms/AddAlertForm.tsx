import { useState } from "react";
import { z } from "zod";
import { alertFormSchema } from "./constants";
import type { Alert } from "@/types/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertForm from "@/components/dashboardContainer/components/forms/AlertForm";
import { Button } from "@/components/ui/button";
import { useAlerts } from "@/hooks/useAlerts";

const AddAlertForm = () => {
  const [open, setOpen] = useState(false);
  const { createAlert } = useAlerts();

  const onSubmit = async (formData: z.infer<typeof alertFormSchema>) => {
    await createAlert(formData);
    setOpen(false);
  }

  const newAlert: Alert = {
    id: "",
    position: "",
    filters: {
      alertFreq: 1,
      location: "",
      keywords: [],
    },
    isActive: true,
    createdAt: null,
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Alert</DialogTitle>
          <DialogDescription className="mb-2">
            Create a new alert by specifying the position and filters.
          </DialogDescription>
          <AlertForm
            initAlert={newAlert}
            onSubmit={onSubmit}
            submitLabel="Create"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddAlertForm;