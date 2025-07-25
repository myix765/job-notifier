import { useState, useMemo } from "react";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FilterBadge from "../ui/filterBadge";

const DashboardContainer = () => {
  const [query, setQuery] = useState("");

  const alerts = [
    {
      id: 1,
      position: "Software Engineer",
      filters: ["United States", "Posted 24 hours ago"]
    },
    {
      id: 2,
      position: "Data Scientist",
      filters: ["Remote", "Posted 3 days ago"]
    },
    {
      id: 3,
      position: "Product Manager",
      filters: ["Canada", "Posted 1 week ago"]
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
        <div className="flex row justify-between items-center mb-6">
          <Search
            value={query}
            placeholder="Search alerts..."
            onSearch={(value) => setQuery(value)}
          />
          <Button>New</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-md">Position</TableHead>
              <TableHead>Filters</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.position}</TableCell>
                <TableCell className="inline-flex gap-2">
                  {alert.filters.map(filter =>
                    <FilterBadge filter={filter} type="location" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary">Edit</Button>
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