'use client';

interface KomentarItem {
  id: string;
  namaProyek: string;
  tanggal: string;
  isi: string;
}

// Ganti dengan fetch dari API sesuai user yang login
const dummyKomentar: KomentarItem[] = [];

export default function RiwayatKomentar() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Komentar</h2>

      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {dummyKomentar.length === 0 ? (
          <div className="bg-[#FDF5E3] flex items-center justify-center py-10">
            <span className="text-base font-semibold text-[#5E5151]">Belum ada komentar</span>
          </div>
        ) : (
          <>
            <div className="flex flex-row">
              {["Nama Proyek", "Tanggal", "Komentar"].map((col) => (
                <div
                  key={col}
                  className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                    ${col === "Nama Proyek" ? "w-[200px]" : ""}
                    ${col === "Tanggal"     ? "w-[150px]" : ""}
                    ${col === "Komentar"    ? "flex-1"    : ""}
                  `}
                >
                  {col}
                </div>
              ))}
            </div>
            {dummyKomentar.map((row) => (
              <div
                key={row.id}
                className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]"
              >
                <div className="w-[200px] flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151]">{row.namaProyek}</span>
                </div>
                <div className="w-[150px] flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151]">{row.tanggal}</span>
                </div>
                <div className="flex-1 flex items-center px-4 py-4">
                  <span className="text-base font-semibold text-[#5E5151]">{row.isi}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}