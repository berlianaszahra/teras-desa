interface Props {
  title: string;
  status: string;
  progress: number;
  dana: string;
}

export default function ProjectCard({
  title,
  status,
  progress,
  dana,
}: Props) {
  return (
    <div className="w-[497px] rounded-[32px] bg-[#E6E5D9] shadow-md overflow-hidden">

      <div className="w-full h-[296px] bg-gray-300"></div>

      <div className="p-6 flex flex-col gap-4">

        <h3 className="text-[32px] font-semibold text-[#2F3E0C]">
          {title}
        </h3>

        <span className="bg-[#C3C9B5] px-4 py-1 rounded-[12px] w-fit text-[#2F3E0C] font-semibold">
          {status}
        </span>

        <div className="flex justify-between text-gray-500 text-[24px] font-semibold">
          <p>{dana}</p>
          <p>{progress}%</p>
        </div>

        <div className="w-full h-[29px] bg-[#C3C9B5] rounded-[12px]">
          <div
            className="h-full rounded-[12px] bg-gradient-to-r from-[#3F1D05] to-[#C2570F]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button className="w-full h-[64px] bg-[#2F3E0C] text-[#C3C9B5] rounded-[12px] text-[24px] font-semibold">
          Lihat Detail
        </button>

      </div>
    </div>
  );
}