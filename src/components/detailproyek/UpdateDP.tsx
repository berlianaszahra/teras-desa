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


import Image from "next/image";
export default function UpdateDP() {
  return (
    <div className="px-4 md:px-12 lg:px-[128px] flex flex-col lg:flex-row gap-4 md:gap-6">
      
      {/* ── Update Proyek ── */}
      <div className="flex-1 bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-4">
        
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Update Proyek
        </h2>

        <div className="flex gap-3">
          
          {/* Timeline icon */}
          <div className="flex flex-col items-center w-6 md:w-10 flex-shrink-0">
            {updates.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                  <Image
                    src="/images/logoupdate.webp"
                    alt="update icon"
                    fill
                    className="object-contain"
                  />
                </div>

                {i < updates.length - 1 && (
                  <div className="w-px h-12 md:h-[84px] bg-[#3F5210]" />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 flex-1">
            {updates.map((u, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-sm md:text-xl font-semibold text-[#252525]">
                  {u.tanggal}
                </span>
                <p className="text-xs md:text-lg text-[#252525] leading-relaxed text-justify">
                  {u.isi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Komentar ── */}
      <div className="w-full lg:w-[385px] bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-4">
        
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Komentar Warga
        </h2>

        {/* List */}
        <div className="flex flex-col gap-4">
          {komentar.map((k, i) => (
            <div key={i} className="flex gap-3">
              
              {/* Avatar */}
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#556117] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] md:text-xs font-bold text-white">
                  {k.inisial}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <span className="text-sm md:text-lg font-medium text-[#252525]">
                  {k.nama}
                </span>
                <p className="text-xs md:text-sm text-[#252525] leading-relaxed text-justify">
                  {k.teks}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Tulis Komentar..."
            className="w-full h-10 pl-3 pr-24 md:pr-32 bg-[#C3C9B5] border border-[#2B3537] rounded-lg text-xs md:text-sm text-[#252525] placeholder-[#252525] focus:outline-none"
          />
          <button className="absolute right-0 top-0 h-10 px-4 md:px-6 bg-[#556117] rounded-lg text-xs md:text-sm font-semibold text-white hover:bg-[#3f4a12]">
            Kirim
          </button>
        </div>

      </div>
    </div>
  );
}