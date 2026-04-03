'use client';

type StatusType = "Diproses" | "Diterima" | "Selesai";

interface LaporanItem {
  id: string;
  namaJalan: string;
  tanggal: string;
  status: StatusType;
}

// Ganti dengan fetch dari API sesuai user yang login
const dummyLaporan: LaporanItem[] = [
  { id: "#001", namaJalan: "Kerusakan Jalan Utama",   tanggal: "24 Maret 2026", status: "Selesai"  },
  { id: "#002", namaJalan: "Lampu Jalan Mati",         tanggal: "23 Maret 2026", status: "Diproses" },
  { id: "#003", namaJalan: "Saluran Air Tersumbat",    tanggal: "12 Maret 2026", status: "Diterima" },
  { id: "#004", namaJalan: "Fasilitas Posyandu Rusak", tanggal: "10 Maret 2026", status: "Diproses" },
];

const statusColor: Record<StatusType, string> = {
  Diproses: "#E3AB55",
  Diterima: "#9F490E",
  Selesai:  "#3F5210",
};

const columns = ["ID", "Nama Jalan", "Tanggal Laporan", "Status"];

export default function RiwayatLaporan() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Laporan</h2>

      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row">
          {columns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === "ID"               ? "w-[80px]"  : ""}
                ${col === "Nama Jalan"       ? "flex-1"    : ""}
                ${col === "Tanggal Laporan"  ? "w-[166px]" : ""}
                ${col === "Status"           ? "w-[120px]" : ""}
              `}
            >
              {col}
            </div>
          ))}
        </div>
        {dummyLaporan.map((row) => (
          <div
            key={row.id}
            className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]"
          >
            <div className="w-[80px] flex items-center justify-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.id}</span>
            </div>
            <div className="flex-1 flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.namaJalan}</span>
            </div>
            <div className="w-[166px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.tanggal}</span>
            </div>
            <div className="w-[120px] flex items-center justify-center px-4 py-4">
              <span
                className="px-3 py-1 rounded-lg text-sm font-semibold text-[#FDF5E3]"
                style={{ background: statusColor[row.status] }}
              >
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}