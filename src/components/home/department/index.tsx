export default function Department() {
  const depts = [
    { name: "IT Support", keywords: ["WiFi", "Login", "Software"], color: "bg-blue-500" },
    { name: "Electrical", keywords: ["Power", "Lights", "Wiring"], color: "bg-yellow-500" },
    { name: "Cleaning", keywords: ["Sanitation", "Waste", "Spill"], color: "bg-green-500" },
    { name: "Maintenance", keywords: ["Leak", "Furniture", "Doors"], color: "bg-orange-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12">
      {depts.map((d) => (
        <div key={d.name} className="group p-6 rounded-3xl border bg-card/50 hover:shadow-xl transition-all">
          <div className={`w-2 h-2 rounded-full ${d.color} mb-4 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
          <h3 className="font-bold mb-2">{d.name}</h3>
          <div className="flex flex-wrap gap-1">
            {d.keywords.map(k => (
              <span key={k} className="text-[10px] px-2 py-0.5 rounded-full border bg-background">{k}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}