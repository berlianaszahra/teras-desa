'use client'

import type { ExpensePayload } from "@/types"

// Di-re-export dengan alias lokal agar komponen pemanggil tetap bisa mengimpornya dari sini.
export type ExpenseItem = ExpensePayload

interface ExpensesInputProps {
  value: ExpenseItem[]
  onChange: (expenses: ExpenseItem[]) => void
}

export default function ExpensesInput({ value, onChange }: ExpensesInputProps) {
  const addExpense = () => {
    onChange([...value, { expense_name: "", amount: 0, percentage: 0 }])
  }

  const removeExpense = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateExpense = (index: number, field: keyof ExpenseItem, val: string) => {
    const updated = value.map((exp, i) =>
      i === index
        ? { ...exp, [field]: field === "expense_name" ? val : Number(val) }
        : exp
    )
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {value.map((exp, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            placeholder="Nama Pengeluaran"
            value={exp.expense_name}
            onChange={e => updateExpense(i, "expense_name", e.target.value)}
            className="flex-1 border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117]"
          />
          <input
            type="number"
            placeholder="Jumlah (Rp)"
            value={exp.amount || ""}
            onChange={e => updateExpense(i, "amount", e.target.value)}
            className="flex-1 border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117]"
          />
          <input
            type="number"
            placeholder="% Persentase"
            value={exp.percentage || ""}
            onChange={e => updateExpense(i, "percentage", e.target.value)}
            min={0}
            max={100}
            className="w-32 border-2 border-[#1C2507] rounded-[10px] px-3 py-2 text-sm font-poppins text-[#252525] placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117]"
          />
          <button
            type="button"
            onClick={() => removeExpense(i)}
            className="text-red-500 hover:text-red-700 font-poppins text-sm px-2"
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addExpense}
        className="self-start text-[#556117] hover:text-[#394A0E] font-poppins text-sm font-semibold underline"
      >
        + Tambah Pengeluaran
      </button>
    </div>
  )
}