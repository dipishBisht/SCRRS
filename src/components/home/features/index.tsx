export default function FeaturesGrid() {
  const features = [
    {
      title: "Smart Routing",
      desc: "Automatic assignment to IT, Maintenance, or Cleaning based on content.",
      className: "md:col-span-2",
    },
    {
      title: "Real-time Tracking",
      desc: "End-to-end visibility from submission to resolution.",
      className: "md:col-span-1",
    },
    {
      title: "Priority Detection",
      desc: "Urgent issues like leakages or outages are escalated immediately.",
      className: "md:col-span-1",
    },
    {
      title: "Deep Analytics",
      desc: "Identify recurring hotspots in your facility with heatmap technology.",
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for accountability.</h2>
        <p className="mt-4 text-muted-foreground">Everything you need to manage institutional operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className={`p-8 rounded-3xl border bg-card/50 hover:bg-card transition-colors flex flex-col justify-between min-h-[240px] ${f.className}`}>
            <div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
            <div className="mt-4 h-2 w-12 bg-primary/20 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}