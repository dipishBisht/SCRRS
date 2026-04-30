import { ArrowRight, Cpu, MessageSquare, ShieldCheck } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      title: "Intelligent Intake",
      desc: "User submits a description. Our system parses keywords in real-time.",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Smart Analysis",
      desc: "Auto-detects department (IT, Maintenance, etc.) and sets priority levels.",
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Direct Routing",
      desc: "Instant notification to the relevant staff dashboard—no middleman.",
      icon: <ArrowRight className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Verified Resolution",
      desc: "Staff updates status. User provides feedback to close the loop.",
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <section id="workflow" className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mt-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-16 w-[calc(100%-4rem)] h-[1px] bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}