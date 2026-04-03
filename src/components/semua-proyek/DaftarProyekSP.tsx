'use client'

import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/axios'
import ProyekCardSP from './ProyekCardSP'

interface Project {
  id: string
  title: string
  status: string
  totalBudget: string
  progress: number
  location: string
}

interface DaftarProyekSPProps {
  search?: string
  tahun?: string
}

const statusLabel: Record<string, string> = {
  perencanaan: 'Perencanaan',
  berjalan: 'Berjalan',
  selesai: 'Selesai',
}

const imageMap: Record<string, string> = {
  'Pembangunan Jalan': '/images/renovasi jalan.webp',
  'Renovasi Balai Desa': '/images/balai desa.webp',
  'Perbaikan Jembatan': '/images/jembatan.webp',
  'Pembangunan Drainase': '/images/drainase.webp',
  'Perbaikan Jalan Tani': '/images/jalan tani.webp',
  'Pembangunan Posyandu': '/images/posyandu.webp',
  'Perbaikan Irigasi Sawah': '/images/irigasi.webp',
  'Pembangunan Taman': '/images/taman.webp',
  'Perbaikan Masjid': '/images/masjid.webp',
  'Renovasi Mushola': '/images/mushola.webp',
  'Pembangunan Sumur Bor': '/images/sumur.webp',
  'Perbaikan Perairan': '/images/perairan.webp',
}

export default function DaftarProyekSP({ search, tahun }: DaftarProyekSPProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  getProjects({ search, tahun })
    .then((data) => {
      setProjects(data.items)
    })
    .catch(() => {})
    .finally(() => setLoading(false))
}, [search, tahun])

  if (loading) return <p className="text-center py-10 font-poppins">Loading...</p>

  return (
    <section className="px-4 md:px-12 lg:px-[122px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      {projects.map((p) => (
        <ProyekCardSP
          key={p.id}
          id={p.id}
          title={p.title}
          status={statusLabel[p.status] || p.status}
          anggaran={`Rp. ${Number(p.totalBudget).toLocaleString('id-ID')}`}
          progress={p.progress}
          image={imageMap[p.title] || '/images/default-project.jpg'}
        />
      ))}
    </section>
  )
}