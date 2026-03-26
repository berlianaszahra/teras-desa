import ProyekCardSP from "./ProyekCardSP";
 
const projects = [
  { id: 1,  title: "Pembangunan Jalan",      status: "Selesai",      anggaran: "Rp. 120.000.000", progress: 100, image: "/images/renovasi jalan.webp"},
  { id: 2,  title: "Renovasi Balai Desa",    status: "Diproses",     anggaran: "Rp. 85.000.000",  progress: 65,  image: "/images/balai desa.webp"},
  { id: 3,  title: "Perbaikan Jembatan",     status: "Diproses",     anggaran: "Rp. 95.000.000",  progress: 55,  image: "/images/jembatan.webp" },
  { id: 4,  title: "Pembangunan Drainase",   status: "Diproses",     anggaran: "Rp. 70.000.000",  progress: 45,  image: "/images/drainase.webp"},
  { id: 5,  title: "Perbaikan Jalan Tani",   status: "Diproses",     anggaran: "Rp. 60.000.000",  progress: 50,  image: "/images/jalan tani.webp" },
  { id: 6,  title: "Pembangunan Posyandu",   status: "Diproses",     anggaran: "Rp. 75.000.000",  progress: 35,  image: "/images/posyandu.webp" },
  { id: 7,  title: "Perbaikan Irigasi Sawah",status: "Diproses",     anggaran: "Rp. 110.000.000", progress: 45,  image: "/images/irigasi.webp" },
  { id: 8,  title: "Pembangunan Taman",      status: "Diterima",     anggaran: "Rp. 70.000.000",  progress: 10,  image: "/images/taman.webp" },
  { id: 9,  title: "Perbaikan Masjid",       status: "Diproses",     anggaran: "Rp. 95.000.000",  progress: 55,  image: "/images/masjid.webp"  },
  { id: 10, title: "Renovasi Mushola",       status: "Diproses",     anggaran: "Rp. 45.000.000",  progress: 20,  image: "/images/mushola.webp"},
  { id: 11, title: "Pembangunan Sumur Bor",  status: "Diproses",     anggaran: "Rp. 55.000.000",  progress: 25,  image: "/images/sumur.webp" },
  { id: 12, title: "Perbaikan Perairan",     status: "Diproses",     anggaran: "Rp. 95.000.000",  progress: 55,  image: "/images/perairan.webp" },
];
 
export default function DaftarProyekSP() {
  return (
    <section className="px-[122px] grid grid-cols-2 gap-[32px]">
      {projects.map((p) => (
        <ProyekCardSP
          key={p.id}
          title={p.title}
          status={p.status}
          anggaran={p.anggaran}
          progress={p.progress}
          image={p.image}
        />
      ))}
    </section>
  );
}
 