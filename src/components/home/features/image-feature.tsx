import { Badge } from "@/components/ui/badge";

export default function ImageFeature() {
  return (
    <div className="p-8 rounded-3xl border bg-card/50 grid md:grid-cols-2 gap-12 items-center">
      <div className="relative group">
        <div className="rounded-2xl border overflow-hidden bg-slate-900 aspect-video relative">
           <div className="absolute inset-0 bg-linear-to-t from-blue-500/20 to-transparent" />
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_15px_#60a5fa] animate-scan" />
           {/* Mock "Image" content */}
           <div className="flex items-center justify-center h-full text-slate-500 text-sm italic font-mono">
             [ ANALYZING_VISUAL_INPUT... ]
           </div>
        </div>
      </div>
      <div>
        <Badge className="mb-4">Optional AI Module</Badge>
        <h3 className="text-3xl font-bold mb-4">Vision-Based Insights</h3>
        <p className="text-muted-foreground leading-relaxed">
          Upload a photo of the issue. Our system detects the type of damage—whether it&apos;s a cracked tile or a blown fuse—automatically.
        </p>
      </div>
    </div>
  );
}