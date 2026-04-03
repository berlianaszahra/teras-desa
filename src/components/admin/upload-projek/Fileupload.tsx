'use client'

import { useRef, useState } from "react"

interface FileUploadProps {
  onChange: (file: File | null) => void
  file: File | null
}

export default function FileUpload({ onChange, file }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) onChange(dropped)
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        w-full min-h-[200px] md:min-h-[280px]
        border-2 border-dashed rounded-[10px]
        flex flex-col items-center justify-center gap-4
        cursor-pointer transition-colors
        ${dragging ? 'border-[#556117] bg-[#556117]/5' : 'border-[#1C2507] hover:border-[#556117] hover:bg-[#556117]/5'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={e => onChange(e.target.files?.[0] || null)}
      />

      <svg className="w-12 h-12 text-[#767676]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>

      {file ? (
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#1C2507] font-poppins font-medium text-sm">{file.name}</p>
          <p className="text-[#767676] font-poppins text-xs">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      ) : (
        <p className="text-[#767676] font-poppins font-light text-base md:text-xl text-center px-4">
          Taruh atau Unggah Bukti Proyek disini
        </p>
      )}
    </div>
  )
}