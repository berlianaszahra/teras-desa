'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { addComment } from '@/lib/api'
import type { ProjectUpdate, Comment } from '@/types'

interface UpdateDPProps {
  projectId: string
  updates: ProjectUpdate[]
  comments: Comment[]
}

export default function UpdateDP({ projectId, updates, comments }: UpdateDPProps) {
  const [komentar, setKomentar] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleKirim = async () => {
    if (!komentar.trim()) return
    setSubmitting(true)
    try {
      // is_anonymous bisa dibuat toggleable nanti, untuk sementara selalu false
      await addComment(projectId, { comment: komentar, is_anonymous: false })
      setKomentar('')
      router.refresh() // muat ulang data halaman dari server
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";
      alert(`Gagal mengirim komentar: ${errorMessage}`);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="px-4 md:px-12 lg:px-[128px] flex flex-col lg:flex-row gap-4 md:gap-6">

      <div className="flex-1 bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Update Proyek
        </h2>

        <div className="flex gap-3">
          <div className="flex flex-col items-center w-6 md:w-10 flex-shrink-0">
            {updates.map((u, i) => (
              <div key={u.id} className="flex flex-col items-center">
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                  <Image src="/images/logoupdate.webp" alt="update icon" fill className="object-contain" />
                </div>
                {i < updates.length - 1 && (
                  <div className="w-px h-12 md:h-[84px] bg-[#3F5210]" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {updates.map((u) => (
              <div key={u.id} className="flex flex-col gap-1">
                <span className="text-sm md:text-xl font-semibold text-[#252525]">
                  {new Date(u.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
                <p className="text-xs md:text-lg text-[#252525] leading-relaxed text-justify">
                  {u.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[385px] bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Komentar Warga
        </h2>

        <div className="flex flex-col gap-4">
          {comments.map((k) => {
            const nama = typeof k.author === 'string'
              ? k.author
              : k.author.name
            const inisial = nama.charAt(0).toUpperCase()

            return (
              <div key={k.id} className="flex gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#556117] flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] md:text-xs font-bold text-white">
                    {inisial}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-lg font-medium text-[#252525]">
                    {nama}
                  </span>
                  <p className="text-xs md:text-sm text-[#252525] leading-relaxed text-justify">
                    {k.comment}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Tulis Komentar..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="w-full h-10 pl-3 pr-24 md:pr-32 bg-[#C3C9B5] border border-[#2B3537] rounded-lg text-xs md:text-sm text-[#252525] placeholder-[#252525] focus:outline-none"
          />
          <button
            onClick={handleKirim}
            disabled={submitting}
            className="absolute right-0 top-0 h-10 px-4 md:px-6 bg-[#556117] rounded-lg text-xs md:text-sm font-semibold text-white hover:bg-[#3f4a12] disabled:opacity-50"
          >
            {submitting ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
    </div>
  )
}