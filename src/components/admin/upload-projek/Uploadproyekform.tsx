'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/api"
import toast from "react-hot-toast"
import FormField from "./Formfield"
import TimelineInput, { TimelineStage } from "./Timelineinput"
import ExpensesInput, { ExpenseItem } from "./Expensesinput"
import FileUpload from "./Fileupload"

const STATUS_OPTIONS = [
  { value: "berjalan", label: "Berjalan" },
  { value: "selesai", label: "Selesai" },
  { value: "ditunda", label: "Ditunda" },
]

export default function UploadProyekForm() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [totalBudget, setTotalBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("berjalan")
  const [timeline, setTimeline] = useState<TimelineStage[]>([
    { stage_name: "", stage_date: "", status: "belum" },
  ])
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { expense_name: "", amount: 0, percentage: 0 },
  ])
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = "Judul proyek wajib diisi"
    if (!description.trim()) newErrors.description = "Deskripsi wajib diisi"
    if (!location.trim()) newErrors.location = "Lokasi wajib diisi"
    if (!totalBudget || isNaN(Number(totalBudget))) newErrors.totalBudget = "Anggaran wajib diisi"
    if (!startDate) newErrors.startDate = "Tanggal mulai wajib diisi"
    if (!endDate) newErrors.endDate = "Tanggal selesai wajib diisi"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const cleanTimeline = timeline.filter(t => t.stage_name && t.stage_date)
      const cleanExpenses = expenses.filter(ex => ex.expense_name && ex.amount)

      await createProject({
        title,
        description,
        location,
        total_budget: Number(totalBudget),
        start_date: startDate,
        end_date: endDate,
        status,
        timeline: cleanTimeline,
        expenses: cleanExpenses,
      })

      toast.success("Proyek berhasil dibuat!")
      router.push("/admin/dashboard")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Gagal membuat proyek"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E9] px-4 py-10 md:py-16 font-poppins">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-[64px] font-bold text-[#252525] text-center mb-10 md:mb-14">
          TerasDesa
        </h1>
        <div className="bg-[#E6E5D9] border border-[#3F5210] shadow-[0px_0px_50px_rgba(0,0,0,0.25)] rounded-[30px] md:rounded-[50px] px-6 md:px-14 py-10 md:py-14 flex flex-col gap-10">

          <div className="w-full bg-gradient-to-r from-[#A64A0D] to-[#401D05] rounded-[20px] md:rounded-[35px] py-5 flex items-center justify-center">
            <h2 className="text-[#3F5210] font-semibold text-xl md:text-[36px] tracking-wide">
              Tambah Proyek Desa
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <FormField label="Status Proyek">
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="border-2 border-[#1C2507] rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] focus:outline-none focus:border-[#556117] bg-transparent"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Judul Proyek">
              <input
                type="text"
                placeholder="Masukkan judul proyek"
                value={title}
                onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: "" })) }}
                className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.title ? 'border-red-500' : 'border-[#1C2507]'}`}
              />
              {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
            </FormField>
            <FormField label="Deskripsi Proyek">
              <textarea
                placeholder="Masukkan deskripsi proyek..."
                value={description}
                rows={5}
                onChange={e => { setDescription(e.target.value); setErrors(p => ({ ...p, description: "" })) }}
                className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] resize-none ${errors.description ? 'border-red-500' : 'border-[#1C2507]'}`}
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </FormField>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <FormField label="Tanggal Mulai">
                <input
                  type="date"
                  value={startDate}
                  onChange={e => { setStartDate(e.target.value); setErrors(p => ({ ...p, startDate: "" })) }}
                  className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] focus:outline-none focus:border-[#556117] ${errors.startDate ? 'border-red-500' : 'border-[#1C2507]'}`}
                />
                {errors.startDate && <span className="text-xs text-red-500">{errors.startDate}</span>}
              </FormField>
              <FormField label="Tanggal Selesai">
                <input
                  type="date"
                  value={endDate}
                  onChange={e => { setEndDate(e.target.value); setErrors(p => ({ ...p, endDate: "" })) }}
                  className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] focus:outline-none focus:border-[#556117] ${errors.endDate ? 'border-red-500' : 'border-[#1C2507]'}`}
                />
                {errors.endDate && <span className="text-xs text-red-500">{errors.endDate}</span>}
              </FormField>
            </div>

            <FormField label="Lokasi Proyek">
              <input
                type="text"
                placeholder="Masukkan lokasi proyek"
                value={location}
                onChange={e => { setLocation(e.target.value); setErrors(p => ({ ...p, location: "" })) }}
                className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.location ? 'border-red-500' : 'border-[#1C2507]'}`}
              />
              {errors.location && <span className="text-xs text-red-500">{errors.location}</span>}
            </FormField>

            <FormField label="Total Anggaran (Rp)">
              <input
                type="number"
                placeholder="Contoh: 120000000"
                value={totalBudget}
                onChange={e => { setTotalBudget(e.target.value); setErrors(p => ({ ...p, totalBudget: "" })) }}
                className={`border-2 rounded-[10px] px-3 py-3 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.totalBudget ? 'border-red-500' : 'border-[#1C2507]'}`}
              />
              {errors.totalBudget && <span className="text-xs text-red-500">{errors.totalBudget}</span>}
            </FormField>

            <FormField label="Timeline Proyek">
              <TimelineInput value={timeline} onChange={setTimeline} />
            </FormField>

            <FormField label="Rincian Pengeluaran">
              <ExpensesInput value={expenses} onChange={setExpenses} />
            </FormField>

            <FormField label="Unggah Bukti Proyek">
              <FileUpload file={file} onChange={setFile} />
            </FormField>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#556117] hover:bg-[#394A0E] disabled:opacity-60 text-white font-semibold text-xl md:text-2xl px-10 py-4 rounded-2xl font-poppins transition-colors"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}