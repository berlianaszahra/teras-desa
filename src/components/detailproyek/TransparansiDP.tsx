"use client";

const dana = [
  { label: "Material Jalan", nilai: "Rp 60.000.000", persen: 50, warna: "#9F490E" },
  { label: "Tenaga Kerja", nilai: "Rp 30.000.000", persen: 25, warna: "#3F5210" },
  { label: "Alat Operational", nilai: "Rp 18.000.000", persen: 15, warna: "#E3AB55" },
  { label: "Administrasi", nilai: "Rp 12.000.000", persen: 15, warna: "#BA9563" },
];

// Pie Chart
function PieChart() {
  const stops: string[] = [];
  let cumulative = 0;

  dana.forEach((d) => {
    stops.push(`${d.warna} ${cumulative}% ${cumulative + d.persen}%`);
    cumulative += d.persen;
  });

  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px]">
      <div className="w-full h-full rounded-full" style={{ background: gradient }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#E6E5D9]" />
      </div>
    </div>
  );
}

export default function TransparansiDP() {
  return (
    <section className="px-4 md:px-12 lg:px-[128px]">
      
      <div className="bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-6">
        
        {/* Title */}
        <h2 className="text-lg md:text-2xl font-semibold text-[#252525]">
          Transparansi Dana
        </h2>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          
          {/* Pie + Total */}
          <div className="flex flex-col items-center gap-4">
            <PieChart />

            <div className="text-center">
              <span className="block text-sm md:text-lg font-semibold text-[#252525]">
                Total Anggaran
              </span>
              <span className="text-sm md:text-base text-[#252525]">
                Rp120.000.000
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {dana.map((d) => (
              <div key={d.label} className="flex items-center gap-4">
                
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-full flex-shrink-0"
                  style={{ background: d.warna }}
                />

                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-semibold text-[#252525]">
                    {d.label}
                  </span>
                  <span className="text-sm md:text-lg text-[#252525]">
                    {d.nilai}
                  </span>
                  <span className="text-sm font-bold text-[#252525]">
                    {d.persen}%
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}