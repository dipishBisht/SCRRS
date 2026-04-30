import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Building2,
  MessageSquare,
  CheckCircle2,
  Clock4,
  PlusCircle,
} from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  StatusBadge,
  PriorityBadge,
} from "@/components/dashboard/status-badge";
import { complaints, timeline } from "@/lib/mock-data";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const TYPE_ICON = {
  created: PlusCircle,
  assigned: User,
  updated: Clock4,
  resolved: CheckCircle2,
  comment: MessageSquare,
} as const;

export default async function ComplaintDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = complaints.find((c) => c.id === id);

  if (!complaint) return notFound();

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/complaints">
            <Button variant="ghost" size="sm" className="h-8 -ml-2 gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <span>·</span>
          <span className="font-mono text-xs">{complaint.id}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {complaint.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {complaint.department}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Reassign
            </Button>
            <Button size="sm" className="gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Mark resolved
            </Button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{complaint.description}</p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activity timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-5 pl-2">
                  <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />

                  {timeline.map((event) => {
                    const Icon = TYPE_ICON[event.type];

                    return (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{event.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(event.timestamp)}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {event.actor}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Comment */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">
                    Add a comment
                  </label>
                  <Textarea placeholder="Write an update…" />
                  <div className="flex justify-end">
                    <Button size="sm">Post update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <DetailRow
                icon={Building2}
                label="Department"
                value={complaint.department}
              />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={complaint.location}
              />
              <DetailRow
                icon={User}
                label="Submitted by"
                value={complaint.submittedBy}
              />
              <DetailRow
                icon={User}
                label="Assigned to"
                value={complaint.assignedTo ?? "Unassigned"}
              />
              <DetailRow
                icon={Calendar}
                label="Submitted"
                value={formatDateTime(complaint.date)}
              />
              <Separator />
              <p className="text-sm">{complaint.category}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DetailRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
