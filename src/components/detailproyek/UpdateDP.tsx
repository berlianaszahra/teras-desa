const updates = [
  {
    tanggal: "10 Maret 2026",
    isi: "Saat ini pekerjaan memasuki tahap pengecoran bagian tengah jalan sepanjang 150 meter.",
  },
  {
    tanggal: "1 Maret 2026",
    isi: "Tahap persiapan dan perataan tanah telah selesai. Material utama seperti batu dan pasir juga sudah tersedia di lokasi proyek.",
  },
];
 
const komentar = [
  {
    nama: "Bayu Nugroho",
    teks: "Semoga proyek ini cepat selesai karena jalan ini sangat penting bagi warga untuk membawa hasil panen ke pasar.",
    inisial: "BN",
  },
  {
    nama: "Siti Aisyah",
    teks: "Terima kasih kepada pemerintah desa yang sudah memperhatikan kondisi jalan di dusun kami.",
    inisial: "SA",
  },
  {
    nama: "N****",
    teks: "Progres pembangunan sudah terlihat bagus. Semoga pengerjaan selanjutnya tetap berjalan lancar sampai selesai.",
    inisial: "N",
  },
  {
    nama: "s****",
    teks: "Semoga proses pembangunan tetap transparan dan informasi progresnya terus diperbarui di website ini.",
    inisial: "S",
  },
];
 
export default function UpdateDP() {
  return (
    <div className="px-[128px] flex flex-row gap-6">
      {/* ── Update Proyek ── */}
      <div className="flex-1 bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[30px] p-6 flex flex-col gap-[18px]">
        <h2 className="text-2xl font-bold text-[#252525]">Update Proyek</h2>
 
        <div className="flex flex-row gap-3">
          {/* Ikon + garis */}
          <div className="flex flex-col items-center w-12 flex-shrink-0">
            {updates.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
                  <path d="M2 11l7 7L22 2" stroke="#556117" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {i < updates.length - 1 && (
                  <div className="w-px flex-1 min-h-[84px] border-l border-[#3F5210]" />
                )}
              </div>
            ))}
          </div>
 
          {/* Konten update */}
          <div className="flex flex-col gap-4 flex-1">
            {updates.map((u, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-2xl font-semibold text-[#252525]">{u.tanggal}</span>
                <p className="text-xl font-normal text-[#252525] leading-[131.8%] text-justify">{u.isi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Komentar Warga ── */}
      <div className="w-[385px] bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[30px] p-9 flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-[#252525]">Komentar Warga</h2>
 
        {/* Daftar komentar */}
        {komentar.map((k, i) => (
          <div key={i} className="flex flex-row gap-4">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#556117] flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">{k.inisial}</span>
            </div>
            {/* Teks */}
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium text-[#252525]">{k.nama}</span>
              <p className="text-[15px] font-normal text-[#252525] leading-[131.8%] text-justify">{k.teks}</p>
            </div>
          </div>
        ))}
 
        {/* Input komentar */}
        <div className="relative flex flex-row items-center mt-2">
          <input
            type="text"
            placeholder="Tulis Komentar..."
            className="w-full h-10 pl-4 pr-[150px] bg-[#C3C9B5] border border-[#2B3537] rounded-xl text-xs text-[#252525] placeholder-[#252525] focus:outline-none"
          />
          <button className="absolute right-0 h-10 px-12 bg-[#556117] rounded-xl text-[15px] font-semibold text-white hover:bg-[#3f4a12] transition-colors">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
 