import React from "react"

interface FormFieldProps {
  label: string
  children: React.ReactNode
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[#1C2507] font-poppins font-normal text-base md:text-lg lg:text-xl tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}