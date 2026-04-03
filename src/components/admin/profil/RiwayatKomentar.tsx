'use client';

// Komponen ini siap diintegrasikan saat endpoint riwayat komentar user tersedia di backend.

export default function RiwayatKomentar() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Riwayat Komentar</h2>

      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="bg-[#FDF5E3] flex items-center justify-center py-10">
          <span className="text-base font-semibold text-[#5E5151]">Belum ada komentar</span>
        </div>
      </div>
    </div>
  );
}