'use client'

import { useState } from "react"

export interface TimelineStage {
  stage_name: string
  stage_date: string
  status: "selesai" | "belum"
}

interface TimelineInputProps {
  value: TimelineStage[]
  onChange: (stages: TimelineStage[]) => void
}

export default function TimelineInput({ value, onChange }: TimelineInputProps) {
  const addStage = () => {
    onChange([...value, { stage_name: "", stage_date: "", status: "belum" }])
  }

  const removeStage = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateStage = (index: number, field: keyof TimelineStage, val: string) => {
    const updated = value.map((stage, i) =>
      i === index ? { ...stage, [field]: val } : stage
    )
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {value.map((stage, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="Nama Tahap"
            value={stage.stage_name}
            onChange={e => updateStage(i, "stage_name", e.target.value)}
            className="flex-1 border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117]"
          />
          <input
            type="date"
            value={stage.stage_date}
            onChange={e => updateStage(i, "stage_date", e.target.value)}
            className="flex-1 border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] focus:outline-none focus:border-[#556117]"
          />
          <select
            value={stage.status}
            onChange={e => updateStage(i, "status", e.target.value)}
            className="border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] focus:outline-none focus:border-[#556117]"
          >
            <option value="belum">Belum</option>
            <option value="selesai">Selesai</option>
          </select>
          <button
            type="button"
            onClick={() => removeStage(i)}
            className="text-red-500 hover:text-red-700 font-poppins text-sm px-2"
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addStage}
        className="self-start text-[#556117] hover:text-[#394A0E] font-poppins text-sm font-semibold underline"
      >
        + Tambah Tahap
      </button>
    </div>
  )
}