"use client";

import { useState } from "react";

export default function FAQ() {
    return (
        <section className="w-full flex justify-center py-24 bg-[#F9F9F9]">
      
      <div className="w-[1196px] flex flex-col gap-12">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-[40px] font-bold text-[#252525]">
            Pertanyaan Umum
          </h2>

          <div className="w-[200px] h-[8px] mx-auto mt-4 rounded-full 
                          bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />
        </div>

        {/* List FAQ */}
        <div className="flex flex-col gap-4">
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
    )
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
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition"
      onClick={() => setOpen(!open)}
    >
      
      {/* Question */}
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] font-semibold text-[#26310A]">
          {question}
        </h3>

        <span className="text-xl">
          {open ? "-" : "+"}
        </span>
      </div>

      {/* Answer */}
      {open && (
        <p className="mt-4 text-[18px] text-[#252525] leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export { FAQItem };