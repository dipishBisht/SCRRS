"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/layout";
import Header from "@/components/dashboard/header";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Header
          title="Settings"
          description="Manage your profile, notifications, and workspace preferences."
        />

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-6">
            <ProfileCard />
            <PasswordCard />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationsCard />
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <AppearanceCard />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ProfileCard() {
  const [name, setName] = useState("Aarav Mehta");
  const [email, setEmail] = useState("aarav@scrrs.app");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Profile</CardTitle>
        <CardDescription className="text-xs">
          Update your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-lg font-semibold text-primary-foreground">
            AM
          </div>
          <div className="space-y-1">
            <Button size="sm" variant="outline">
              Change photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG or PNG, max 2MB.
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Administrator" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dept">Department</Label>
            <Input id="dept" defaultValue="IT" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="sm" onClick={() => toast.success("Profile updated")}>
            Save changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PasswordCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Password</CardTitle>
        <CardDescription className="text-xs">
          Change your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" placeholder="••••••••" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Password changed")}
          >
            Update password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Notifications</CardTitle>
        <CardDescription className="text-xs">
          Choose what you&apos;d like to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border/60">
        <ToggleRow
          title="New complaints"
          desc="Get notified when a new complaint is submitted."
          defaultChecked
        />
        <ToggleRow
          title="Assignments"
          desc="When a complaint is routed to you."
          defaultChecked
        />
        <ToggleRow
          title="Status changes"
          desc="Updates on tickets you're following."
        />
        <ToggleRow
          title="Weekly summary"
          desc="A weekly digest of activity and trends."
          defaultChecked
        />
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function AppearanceCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Appearance</CardTitle>
        <CardDescription className="text-xs">
          Customize how SCRRS looks on your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Compact mode</p>
            <p className="text-xs text-muted-foreground">
              Reduce spacing in tables and cards.
            </p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dark mode</p>
            <p className="text-xs text-muted-foreground">
              Use a darker theme across the app.
            </p>
          </div>
          <Switch
            onCheckedChange={(v) => {
              document.documentElement.classList.toggle("dark", v);
              toast.success(v ? "Dark mode on" : "Light mode on");
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
