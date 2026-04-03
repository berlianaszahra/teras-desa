"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Proyek Desa", href: "/admin/proyek" },
  { label: "Monitoring Dana", href: "/admin/monitoring-dana" },
  { label: "Edit Profil", href: "/admin/profil" },
];

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 bg-[#3F5210] text-[#ECEEE7] px-3 py-1.5 rounded-md text-xs font-poppins font-bold"
      >
        Menu
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50
          w-[200px] md:w-[220px] lg:w-[240px] min-h-screen
          bg-[#3F5210] rounded-r-[30px]
          flex flex-col pt-8 md:pt-10 gap-10
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-2 px-5 md:px-7">
          <div className="w-8 md:w-9 h-8 md:h-9 relative flex-shrink-0">
            <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
          </div>
          <span className="text-lg md:text-xl font-bold text-[#ECEEE7] font-poppins tracking-tight">
            TerasDesa
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 pr-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center 
                  px-5 md:px-7 h-[42px] md:h-[46px] 
                  text-sm md:text-base font-bold font-poppins 
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#F5F1E9] text-[#252525] rounded-r-[30px] shadow-md"
                      : "text-[#ECEEE7] hover:bg-white/5 rounded-r-[30px]"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}