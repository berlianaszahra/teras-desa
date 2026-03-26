import HeroJD from "@/components/jelajahdesa/HeroJD";
import ProjectCard from "@/components/jelajahdesa/ProjectCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { CTA } from "@/components/sections/CTA";
import Stats from "@/components/sections/Stats";

export default function JelajahDesa() {

  const projects = [
    {
      title: "Pembangunan Jalan",
      status: "Selesai",
      progress: 100,
      dana: "Rp. 120.000.000",
    },
    {
      title: "Lampu Jalan Desa",
      status: "Perencanaan",
      progress: 10,
      dana: "Rp. 45.000.000",
    },
    {
      title: "Renovasi Balai Desa",
      status: "Berjalan",
      progress: 65,
      dana: "Rp. 85.000.000",
    },
  ];

  return (
    <>
      <Navbar />
      <HeroJD />
      <Stats />

      {/* PROYEK */}
      <section className="w-full flex justify-center py-16">
        <div className="w-[1196px] flex flex-col gap-6">

          <div className="flex justify-between items-center">
            <h2 className="text-[40px] font-bold text-[#252525]">
              Proyek Desa
            </h2>

            <button className="text-[#3F5210] text-[20px] font-medium">
              Lihat Semua Proyek
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {projects.map((item, index) => (
              <ProjectCard key={index} {...item} />
            ))}
          </div>

        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}