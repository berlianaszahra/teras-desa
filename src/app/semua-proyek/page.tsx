import HeroSP        from "@/components/semua-proyek/HeroSP";
import FilterSP      from "@/components/semua-proyek/FilterSP";
import DaftarProyekSP from "@/components/semua-proyek/DaftarProyekSP";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
 
export default function SemuaProyek() {
const [search, setSearch] = useState('')
  const [tahun, setTahun] = useState('')

  function handleFilter(rw: string, tahun: string, search: string) {
    setSearch(search)
    setTahun(tahun === 'Semua Tahun' ? '' : tahun)
  }
  
  return (
    <main className="bg-[#F5F1E9] min-h-screen font-[Poppins] flex flex-col gap-10 pb-20">
      <Navbar />
      <HeroSP />
      <FilterSP />
      <DaftarProyekSP />
      <Footer />
    </main>
  );
}