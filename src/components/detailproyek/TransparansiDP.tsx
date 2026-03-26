"use client";
 
const dana = [
  { label: "Material Jalan",   nilai: "Rp 60.000.000",  persen: 50, warna: "#9F490E" },
  { label: "Tenaga Kerja",     nilai: "Rp 30.000.000",  persen: 25, warna: "#3F5210" },
  { label: "Alat Operational", nilai: "Rp 18.000.000",  persen: 15, warna: "#E3AB55" },
  { label: "Administrasi",     nilai: "Rp 12.000.000",  persen: 15, warna: "#BA9563" },
];
 
// Simple pie chart pakai SVG conic-gradient
function PieChart() {
  // Buat conic-gradient dari data
  const stops: string[] = [];
  let cumulative = 0;
  dana.forEach((d) => {
    stops.push(`${d.warna} ${cumulative}% ${cumulative + d.persen}%`);
    cumulative += d.persen;
  });
  const gradient = `conic-gradient(${stops.join(", ")})`;
 
  return (
    <div className="relative flex-shrink-0" style={{ width: 238, height: 238 }}>
      <div
        className="w-full h-full rounded-full"
        style={{ background: gradient }}
      />
      {/* Label persentase di atas pie — simplified */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#E6E5D9]" />
      </div>
    </div>
  );
}
 
export default function TransparansiDP() {
  return (
    <div className="mx-[128px] bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[30px] relative overflow-hidden" style={{ height: 469 }}>
      <span className="absolute left-8 top-8 text-2xl font-semibold text-[#252525]">
        Transparansi Dana
      </span>
 
      {/* Total Anggaran */}
      <div className="absolute left-8 bottom-[60px] flex flex-col gap-2">
        <span className="text-2xl font-semibold text-[#252525]">Total Anggaran</span>
        <span className="text-base text-[#252525]">Rp120.000.000</span>
      </div>
 
      {/* Pie chart */}
      <div className="absolute left-8 top-[100px]">
        <PieChart />
      </div>
 
      {/* Legend */}
      <div className="absolute left-[369px] top-[100px] flex flex-col justify-center gap-6" style={{ width: 299, height: 240 }}>
        {dana.map((d) => (
          <div key={d.label} className="flex flex-row items-center gap-6">
            <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: d.warna }} />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-[#252525]">{d.label}</span>
              <span className="text-xl text-[#252525]">{d.nilai}</span>
              <span className="text-base font-bold text-[#252525]">{d.persen}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 