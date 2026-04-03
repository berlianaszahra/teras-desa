'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProjectById } from '@/lib/api'
import type { ProjectDetail } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroDP from '@/components/detailproyek/HeroDP'
import DeskripsiDP from '@/components/detailproyek/DeskripsiDP'
import TransparansiDP from '@/components/detailproyek/TransparansiDP'
import UpdateDP from '@/components/detailproyek/UpdateDP'

export default function DetailProyek() {
  const { id } = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getProjectById(id as string)
        .then((res) => setProject(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <p className="text-center py-20 font-poppins">Loading...</p>
  if (!project) return <p className="text-center py-20 font-poppins">Proyek tidak ditemukan</p>

  const durasi = Math.ceil(
    (new Date(project.endDate).getTime() - new Date(project.startDate).getTime())
    / (1000 * 60 * 60 * 24)
  )

  const tanggal = `${new Date(project.startDate).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })} - ${new Date(project.endDate).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })}`

  return (
    <main className="bg-[#F5F1E9] min-h-screen flex flex-col gap-10 pb-20">
      <Navbar />
      <HeroDP
        title={project.title}
        lokasi={project.location}
        images={project.images?.length ? project.images : ['/images/renovasi jalan.webp']}
        progress={project.progress}
        durasi={`${durasi} Hari`}
        tanggal={tanggal}
        anggaran={`Rp ${Number(project.totalBudget).toLocaleString('id-ID')}`}
      />
      <DeskripsiDP
        deskripsi={project.description}
        timelines={project.timelines}
      />
      <TransparansiDP
        expenses={project.expenses}
        totalBudget={project.totalBudget}
      />
      <UpdateDP
        projectId={project.id}
        comments={project.comments}
        updates={project.updates}
      />
      <Footer />
    </main>
  )
}