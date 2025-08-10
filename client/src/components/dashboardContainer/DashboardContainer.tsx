import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Search from "@/components/ui/search";
import AddAlertForm from "./components/forms/AddAlertForm";
import AlertRow from "@/components/dashboardContainer/AlertRow";
import type { Alert } from "../types";
import { useAlerts } from "@/hooks/useAlerts";

const DashboardContainer = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [query, setQuery] = useState("");
  const { getUsersAlerts } = useAlerts();

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await getUsersAlerts();
      console.log(res);
      setAlerts(res.data ?? []);
    }

    fetchAlerts();
  }, [getUsersAlerts])
  
  // const fakeAlerts = [
  //   {
  //     id: 1,
  //     position: "Software Engineer",
  //     filters: {
  //       alertFreq: 24,
  //       location: "United States",
  //       keywords: null
  //     },
  //     isActive: true,
  //   },
  //   {
  //     id: 2,
  //     position: "Data Scientist",
  //     filters: {
  //       alertFreq: 12,
  //       location: null,
  //       keywords: null
  //     },
  //     isActive: false,
  //   },
  //   {
  //     id: 3,
  //     position: "Product Manager",
  //     filters: {
  //       alertFreq: 6,
  //       location: null,
  //       keywords: [
  //         "Entry",
  //         "Junior"
  //       ]
  //     },
  //     isActive: true,
  //   },
  // ];

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
          <AddAlertForm />
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
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default DashboardContainer;