import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FilterBadge from "@/components/dashboardContainer/components/filterBadge";
import EditAlertForm from "./components/forms/EditAlertForm";
import type { Alert } from "@/components/dashboardContainer/types";

const AlertRow = ({ alert }: { alert: Alert }) => {
  return (
    <TableRow>
      <TableCell>{alert.position}</TableCell>
      <TableCell className="inline-flex gap-2 flex-wrap">
        {alert.filters.map((filter, i) =>
          <FilterBadge key={i} filter={filter} type="location" />
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-end">
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
                <EditAlertForm alert={alert} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="outline">Deactivate</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this alert for {alert.position}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default AlertRow;