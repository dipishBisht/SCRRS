"use client";
import { useMemo, useState } from "react";
import { Search, PlusCircle, Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  complaints,
  type ComplaintStatus,
  type Department,
} from "@/lib/mock-data";
import DashboardLayout from "@/components/dashboard/layout";
import Header from "@/components/dashboard/header";
import Link from "next/link";
import { ComplaintsTable } from "@/components/dashboard/complaints-table";

const TABS: { label: string; value: "all" | ComplaintStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

export default function Complaints() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | ComplaintStatus>("all");
  const [department, setDepartment] = useState<"all" | Department>("all");
  const [priority, setPriority] = useState<string>("all");

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      if (tab !== "all" && c.status !== tab) return false;
      if (department !== "all" && c.department !== department) return false;
      if (priority !== "all" && c.priority !== priority) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !c.title.toLowerCase().includes(q) &&
          !c.id.toLowerCase().includes(q) &&
          !c.location.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, tab, department, priority]);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <Header
          title="Complaints"
          description="Browse, filter, and manage every ticket in one place."
          actions={
            <>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button asChild size="sm" className="h-9 gap-1.5 shadow-sm">
                <Link href="/dashboard/submit-complaint">
                  <PlusCircle className="h-4 w-4" />
                  New complaint
                </Link>
              </Button>
            </>
          }
        />

        <Card>
          <div className="flex flex-col gap-3 border-b border-border/60 p-4 md:flex-row md:items-center md:justify-between">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {TABS.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="text-xs"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tickets…"
                  className="h-9 w-full pl-9 sm:w-[240px]"
                />
              </div>
              <Select
                value={department}
                onValueChange={(v) => setDepartment(v as typeof department)}
              >
                <SelectTrigger className="h-9 w-[150px]">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CardContent className="px-0 pb-0">
            <ComplaintsTable data={filtered} />
            <div className="flex items-center justify-between border-t border-border/60 px-6 py-3 text-xs text-muted-foreground">
              <span>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filtered.length}
                </span>{" "}
                of {complaints.length} complaints
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  disabled
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  disabled
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
