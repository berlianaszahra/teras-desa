const reports = [
  { id: "001", namaJalan: "Kerusakan Jalan Utama",    tanggal: "24 Maret 2026", status: "Selesai" },
  { id: "002", namaJalan: "Lampu Jalan Mati",          tanggal: "23 Maret 2026", status: "Selesai" },
  { id: "003", namaJalan: "Saluran Air Tersumbat",     tanggal: "12 Maret 2026", status: "Selesai" },
  { id: "004", namaJalan: "Fasilitas Posyandu Rusak",  tanggal: "10 Maret 2026", status: "Selesai" },
];
 
const columns = ["ID", "Nama Jalan", "Tanggal Laporan", "Status"];
 
function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center justify-center px-[30px] py-[5px] rounded-xl bg-[#E2E5DB] text-[#2F3E0C] text-sm font-semibold">
      {status}
    </span>
  );
}
 
export default function LaporanJD() {
  return (
    <section className="mx-[122px] bg-[#E6E5D9] rounded-[30px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-10 flex flex-col gap-4">
      <h2 className="text-[40px] font-bold text-[#1E1E1E] leading-[53px]">
        Laporan Terbaru
      </h2>
 
      {/* Tabel */}
      <div className="w-full rounded-[15px] overflow-hidden">
        {/* Header row */}
        <div className="flex flex-row">
          {columns.map((col) => (
            <div
              key={col}
              className={`flex items-center px-6 py-3 bg-[#3F5210] border-b border-[#252525]
                ${col === "ID"              ? "w-[111px]"  : ""}
                ${col === "Nama Jalan"      ? "flex-1"     : ""}
                ${col === "Tanggal Laporan" ? "w-[333px]"  : ""}
                ${col === "Status"          ? "w-[166px]"  : ""}
              `}
            >
              <span className="text-base font-semibold text-white">{col}</span>
            </div>
          ))}
        </div>
 
        {/* Data rows */}
        {reports.map((r, i) => (
          <div
            key={r.id}
            className={`flex flex-row border-b border-[#252525] last:border-b-0 ${
              i % 2 === 0 ? "bg-[#FDF5E3]" : "bg-[#F5F0DC]"
            }`}
          >
            <div className="w-[111px] flex items-center px-6 py-4">
              <span className="text-base font-semibold text-[#5E5151]">#{r.id}</span>
            </div>
            <div className="flex-1 flex items-center px-6 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{r.namaJalan}</span>
            </div>
            <div className="w-[333px] flex items-center px-6 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{r.tanggal}</span>
            </div>
            <div className="w-[166px] flex items-center px-6 py-4">
              <StatusBadge status={r.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
 