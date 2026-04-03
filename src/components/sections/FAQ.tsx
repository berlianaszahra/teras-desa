"use client";

import { useState } from "react";

export default function FAQ() {
  return (
    <section className="w-full flex justify-center py-12 md:py-20 lg:py-24 bg-[#F5F1E9]">

      <div className="w-full max-w-[1196px] px-4 md:px-10 flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#252525]">
            Pertanyaan Umum
          </h2>

          <div className="w-[120px] md:w-[200px] h-[6px] md:h-[8px] mx-auto mt-3 md:mt-4 rounded-full 
                          bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <FAQItem 
            question="Apa itu TerasDesa?"
            answer="TerasDesa adalah platform transparansi anggaran desa yang membantu masyarakat memahami penggunaan dana desa secara terbuka."
          />

          <FAQItem 
            question="Apakah data yang ditampilkan akurat?"
            answer="Data yang ditampilkan berasal langsung dari pemerintah desa dan diperbarui secara berkala."
          />

          <FAQItem 
            question="Apakah masyarakat bisa ikut berpartisipasi?"
            answer="Ya, masyarakat dapat memberikan laporan dan masukan terkait pembangunan desa melalui platform ini."
          />

          <FAQItem 
            question="Apakah layanan ini gratis?"
            answer="Ya, TerasDesa dapat diakses secara gratis oleh seluruh masyarakat."
          />
        </div>

      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-6 cursor-pointer transition hover:shadow-lg"
      onClick={() => setOpen(!open)}
    >

      <div className="flex justify-between items-center">
        <h3 className="text-sm md:text-lg lg:text-[20px] font-semibold text-[#26310A]">
          {question}
        </h3>

        <span className="text-lg md:text-xl">
          {open ? "-" : "+"}
        </span>
      </div>

      {open && (
        <p className="mt-3 md:mt-4 text-sm md:text-base lg:text-[18px] text-[#252525] leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}