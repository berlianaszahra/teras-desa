export default function Stats() {
    return (
        <section className="w-full flex justify-center -mt-24 z-10 relative bg-[#F5F1E9]">
            <div className="w-[1196px] flex justify-center gap-[50px]
                            px-2 py-[60px] rounded-[30px] 
                            bg-gradient-to-r from from-[#391A05] to-[#9F490E] shadow-md">

                <StatsCard title="Total Anggaran" value="28" />
                <StatsCard title="Proyek Aktif" value="28" />
                <StatsCard title="Proyek Selesai" value="28" />
                <StatsCard title="Laporan" value="28" />
            </div>
        </section>
    )
}

interface StatsCardProps {
    title: string;
    value: string;
}

function StatsCard({title, value}: StatsCardProps) {
    return (
        <div className="w-[213px] h-[165px]
                    flex flex-col items-center justify-center
                    bg-[#391A05]
                    border border-[#E46612]
                    rounded-[30px]
                    shadow-md
                    p-2
                    hover:scale-105 transition">
            <h1 className="text-[40px] font-bold text-[#ECEEE7]">
            {value}
            </h1>

            <p className="text-[20px] font-semibold text-[#ECEEE7] text-center">
            {title}
            </p>
        </div>
    )
}