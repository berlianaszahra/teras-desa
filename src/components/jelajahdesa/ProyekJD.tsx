'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjects, formatRupiah, PROJECT_STATUS_LABEL } from '@/lib/api';
import type { ProjectListItem } from '@/types';

/** Fallback thumbnail if the project has no images */
const FALLBACK_IMAGE = '/images/renovasi jalan.webp';

export default function ProyekJD() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects({ page: 1, limit: 4 })
      .then((res) => setProjects(res.data.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 md:px-10 lg:px-[122px] flex flex-col gap-4 md:gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-xl md:text-3xl lg:text-[40px] font-bold text-[#252525]">
          Proyek Desa
        </h2>
        <Link
          href="/users/semua-proyek"
          className="text-sm md:text-lg font-medium text-[#3F5210] hover:underline"
        >
          Lihat Semua Proyek
        </Link>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full sm:w-[350px] lg:w-[497px] flex-shrink-0 h-[400px] bg-[#E6E5D9] rounded-2xl md:rounded-[32px] animate-pulse"
              />
            ))
          : projects.map((project) => (
              <Link
                key={project.id}
                href={`/users/detail-proyek/${project.id}`}
                className="w-full sm:w-[350px] lg:w-[497px] flex-shrink-0 flex flex-col items-center pb-6 md:pb-10 gap-4 md:gap-6 bg-[#E6E5D9] rounded-2xl md:rounded-[32px] shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-[200px] md:h-[250px] lg:h-[296px] rounded-t-2xl md:rounded-t-[32px] overflow-hidden">
                  <Image
                    src={project.images[0] ?? FALLBACK_IMAGE}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized={!!project.images[0]}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full px-4 md:px-6">
                  <h3 className="text-lg md:text-2xl lg:text-[32px] font-semibold text-[#2F3E0C] leading-tight">
                    {project.title}
                  </h3>

                  <span className="inline-flex w-fit items-center justify-center px-4 py-1 rounded-xl bg-[#E2E5DB] text-[#2F3E0C] text-xs md:text-sm font-semibold">
                    {PROJECT_STATUS_LABEL[project.status] ?? project.status}
                  </span>

                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#999999]">
                      {formatRupiah(project.totalBudget)}
                    </span>
                    <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#999999]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 md:h-5 lg:h-[30px] bg-[#C3C9B5] rounded-xl overflow-hidden">
                    <div
                      className="h-full rounded-xl transition-all duration-500"
                      style={{
                        width: `${project.progress}%`,
                        background: 'linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)',
                      }}
                    />
                  </div>

                  <button className="w-full flex items-center justify-center py-2 md:py-3 lg:py-4 bg-[#2F3E0C] rounded-xl mt-1 hover:bg-[#3d5010] transition-colors">
                    <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#C3C9B5]">
                      Lihat Detail
                    </span>
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}