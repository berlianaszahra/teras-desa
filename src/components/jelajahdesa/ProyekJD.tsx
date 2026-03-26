import ProjectCard from "./ProjectCardJD";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Pembangunan Jalan",
    status: "Selesai",
    anggaran: "Rp. 120.000.000",
    progress: 100,
    image: "/images/renovasi jalan.webp",
  },
  {
    id: 2,
    title: "Lampu Jalan Desa",
    status: "Perencanaan",
    anggaran: "Rp. 45.000.000",
    progress: 10,
    image: "/images/lampu jalan.webp",
  },
  {
    id: 3,
    title: "Renovasi Balai Desa",
    status: "Berjalan",
    anggaran: "Rp. 85.000.000",
    progress: 65,
    image: "/images/balai desa.webp",
  },
  {
    id: 4,
    title: "Perbaikan Jembatan",
    status: "Berjalan",
    anggaran: "Rp. 95.000.000",
    progress: 55,
    image: "/images/jembatan.webp",
  },
];

export default function ProyekJD() {
  return (
    <section className="px-4 md:px-10 lg:px-[122px] flex flex-col gap-4 md:gap-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">

        <h2 className="text-xl md:text-3xl lg:text-[40px] font-bold text-[#252525]">
          Proyek Desa
        </h2>

        <Link
          href="/semua-proyek"
          className="text-sm md:text-lg font-medium text-[#3F5210] hover:underline"
        >
          Lihat Semua Proyek
        </Link>

      </div>

      {/* Cards */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">

        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            status={p.status}
            anggaran={p.anggaran}
            progress={p.progress}
            image={p.image}
          />
        ))}

      </div>

    </section>
  );
}