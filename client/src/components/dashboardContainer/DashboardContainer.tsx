import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import Search from "@/components/ui/search";
import FilterBadge from "@/components/dashboardContainer/components/filterBadge";
import EditAlertForm from "./components/forms/EditAlertForm";
import AddAlertForm from "./components/forms/AddAlertForm";

const DashboardContainer = () => {
  const [query, setQuery] = useState("");

  const alerts = [
    {
      id: 1,
      position: "Software Engineer",
      filters: [{ type: "location", value: "United States" }, { type: "time posted", value: "Posted 24 hours ago" }]
    },
    {
      id: 2,
      position: "Data Scientist",
      filters: [{ type: "location", value: "Remote" }, { type: "time posted", value: "Posted 3 days ago" }]
    },
    {
      id: 3,
      position: "Product Manager",
      filters: [{ type: "location", value: "Canada" }, { type: "time posted", value: "Posted 1 week ago" }]
    },
  ];

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert =>
      alert.position.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, alerts]);

  return (
    <>
      <div className="rounded-lg py-4 px-[1.125rem] shadow-[0px_1px_10px_1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <Search
            value={query}
            placeholder="Search alerts..."
            onSearch={(value) => setQuery(value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>New</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Alert</DialogTitle>
                <DialogDescription className="mb-2">
                  Create a new alert by specifying the position and filters.
                </DialogDescription>
                <AddAlertForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-xs">Position</TableHead>
              <TableHead>Filters</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id}>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default DashboardContainer;