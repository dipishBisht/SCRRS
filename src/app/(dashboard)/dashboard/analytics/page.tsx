import Header from "@/components/dashboard/header";
import DashboardLayout from "@/components/dashboard/layout";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  complaintsByCategory,
  resolutionTrend,
  stats,
  statusDistribution,
} from "@/lib/mock-data";
import { CheckCircle2, Clock4, Inbox, Star, TrendingUp } from "lucide-react";

export default function Analytics() {
  const maxTrend = Math.max(
    ...resolutionTrend.flatMap((d) => [d.submitted, d.resolved]),
  );
  const maxCat = Math.max(...complaintsByCategory.map((c) => c.value));
  const totalDist = statusDistribution.reduce((s, d) => s + d.value, 0);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <Header
          title="Analytics"
          description="Trends, throughput, and insights across all departments."
          actions={
            <>
              <Button variant="outline" size="sm" className="h-9">
                Last 7 days
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                Export report
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            label="Total complaints"
            value={stats.total}
            delta={12}
            hint="vs last week"
            icon={Inbox}
          />
          <StatsCard
            label="Resolved"
            value={stats.resolved}
            delta={18}
            hint="this week"
            icon={CheckCircle2}
            tone="success"
          />
          <StatsCard
            label="Avg. resolution"
            value={stats.avgResolution}
            delta={-14}
            hint="improvement"
            icon={Clock4}
            tone="info"
          />
          <StatsCard
            label="Satisfaction"
            value={`${stats.satisfaction}%`}
            delta={4}
            hint="positive feedback"
            icon={Star}
            tone="warning"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Trend chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Submitted vs resolved
              </CardTitle>
              <CardDescription className="text-xs">
                Daily volume across the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[260px] items-end gap-3">
                {resolutionTrend.map((d) => (
                  <div
                    key={d.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-1/2 rounded-t-sm bg-primary/70 transition-all hover:bg-primary"
                        style={{ height: `${(d.submitted / maxTrend) * 100}%` }}
                        title={`${d.submitted} submitted`}
                      />
                      <div
                        className="w-1/2 rounded-t-sm bg-success transition-all hover:opacity-80"
                        style={{ height: `${(d.resolved / maxTrend) * 100}%` }}
                        title={`${d.resolved} resolved`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-primary/70" />{" "}
                  Submitted
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-success" /> Resolved
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status donut */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Status breakdown</CardTitle>
              <CardDescription className="text-xs">
                Current open & closed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusDistribution.map((s) => {
                  const pct = Math.round((s.value / totalDist) * 100);
                  const color =
                    s.name === "Pending"
                      ? "bg-warning"
                      : s.name === "In Progress"
                        ? "bg-info"
                        : "bg-success";
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground">
                          {s.name}
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                          {s.value} · {pct}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* By department */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Complaints by department
            </CardTitle>
            <CardDescription className="text-xs">
              Volume distribution across teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaintsByCategory.map((c) => (
                <div
                  key={c.category}
                  className="grid grid-cols-[100px_1fr_50px] items-center gap-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {c.category}
                  </span>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                      style={{ width: `${(c.value / maxCat) * 100}%` }}
                    />
                  </div>
                  <span className="text-right text-sm tabular-nums text-muted-foreground">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
