import { ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge";
import EmptyState from "@/components/dashboard/empty-state";
import { Inbox } from "lucide-react";
import type { Complaint } from "@/lib/mock-data";
import Link from "next/link";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ComplaintsTable({ data }: { data: Complaint[] }) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No complaints found"
        description="Try adjusting your filters or search query."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border/60 hover:bg-transparent">
          <TableHead className="pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Ticket
          </TableHead>
          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Department
          </TableHead>
          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Priority
          </TableHead>
          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Status
          </TableHead>
          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Submitted
          </TableHead>
          <TableHead className="pr-6" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.id} className="border-border/60 group">
            <TableCell className="pl-6 py-3">
              <Link href={`/dashboard/complaints/${c.id}`} className="flex flex-col">
                <span className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary">
                  {c.title}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {c.id} · {c.location}
                </span>
              </Link>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground">{c.department}</span>
            </TableCell>
            <TableCell>
              <PriorityBadge priority={c.priority} />
            </TableCell>
            <TableCell>
              <StatusBadge status={c.status} />
            </TableCell>
            <TableCell className="text-xs text-muted-foreground tabular-nums">
              {formatDate(c.date)}
            </TableCell>
            <TableCell className="pr-6 text-right">
              <Link
                href={`/complaints/${c.id}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-accent hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
