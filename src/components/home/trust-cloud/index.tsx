export default function TrustCloud() {
  const names = ["IIT Delhi", "BITS Pilani", "Manipal University", "VIT Vellore", "SRM Institute"];
  return (
    <div className="py-10 border-y border-border/40 bg-muted/10 overflow-hidden whitespace-nowrap">
      <div className="flex gap-16 animate-marquee">
        {[...names, ...names].map((name, i) => (
          <span key={i} className="text-xl font-bold text-muted-foreground/30 uppercase tracking-tighter">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}