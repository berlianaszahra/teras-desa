'use client'

import type { Expense } from "@/types"

interface TransparansiDPProps {
  expenses: Expense[]
  totalBudget: string
}

const COLORS = ['#9F490E', '#3F5210', '#E3AB55', '#BA9563', '#556117', '#C2570F']

function PieChart({ expenses }: { expenses: Expense[] }) {
  const stops: string[] = []
  let cumulative = 0

  expenses.forEach((d, i) => {
    const persen = parseFloat(d.percentage)
    stops.push(`${COLORS[i % COLORS.length]} ${cumulative}% ${cumulative + persen}%`)
    cumulative += persen
  })

  return (
    <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[238px] lg:h-[238px]">
      <div
        className="w-full h-full rounded-full"
        style={{ background: `conic-gradient(${stops.join(', ')})` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#E6E5D9]" />
      </div>
    </div>
  )
}

export default function TransparansiDP({ expenses, totalBudget }: TransparansiDPProps) {
  return (
    <section className="px-4 md:px-12 lg:px-[128px]">
      <div className="bg-[#E6E5D9] shadow-md rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-6">
        <h2 className="text-lg md:text-2xl font-semibold text-[#252525]">
          Transparansi Dana
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <div className="flex flex-col items-center gap-4">
            <PieChart expenses={expenses} />
            <div className="text-center">
              <span className="block text-sm md:text-lg font-semibold text-[#252525]">
                Total Anggaran
              </span>
              <span className="text-sm md:text-base text-[#252525]">
                Rp {Number(totalBudget).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {expenses.map((d, i) => (
              <div key={d.id ?? i} className="flex items-center gap-4">
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-full flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-semibold text-[#252525]">
                    {d.expenseName}
                  </span>
                  <span className="text-sm md:text-lg text-[#252525]">
                    Rp {Number(d.amount).toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm font-bold text-[#252525]">
                    {parseFloat(d.percentage)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}