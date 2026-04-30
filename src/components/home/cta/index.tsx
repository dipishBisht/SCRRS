import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-[3rem] bg-foreground text-background p-12 text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-transparent opacity-50" />
        <h2 className="text-4xl font-bold tracking-tight mb-6 relative">Ready to streamline your facility?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-10 relative">
          Join 20+ institutions using SCRRS to manage over 10,000+ complaints monthly with 99% accuracy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
          <Button size="lg" className="bg-background text-foreground hover:bg-zinc-200 rounded-full px-10">Deploy Now</Button>
          <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800 rounded-full px-10">Talk to Sales</Button>
        </div>
      </div>
    </section>
  );
}