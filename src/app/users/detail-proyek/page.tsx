'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProjectById } from '@/lib/axios'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroDP from '@/components/detailproyek/HeroDP'
import DeskripsiDP from '@/components/detailproyek/DeskripsiDP'
import TransparansiDP from '@/components/detailproyek/TransparansiDP'
import UpdateDP from '@/components/detailproyek/UpdateDP'

interface Timeline {
  id: string
  stageName: string
  stageDate: string
  status: 'selesai' | 'diproses' | 'belum'
}

interface Expense {
  id: string
  expenseName: string
  amount: string
  percentage: string
}

interface Update {
  id: string
  progress: number
  description: string
  createdAt: string
}

interface Author {
  id: string
  name: string
  username: string
}

interface Comment {
  id: string
  comment: string
  isAnonymous: boolean
  createdAt: string
  author: Author | string
}

interface Project {
  id: string
  title: string
  description: string
  location: string
  totalBudget: string
  status: string
  progress: number
  startDate: string
  endDate: string
  timelines: Timeline[]
  expenses: Expense[]
  updates: Update[]
  comments: Comment[]
}

export default function DetailProyek() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getProjectById(id as string)
        .then(setProject)
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
        images={['/images/renovasi jalan.webp']}
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
        comments={project.comments}
        updates={project.updates}
      />
      <Footer />
    </main>
  )
}