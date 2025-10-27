"use client";
import TTSWrapper from "@/hooks/TTSWrapper";
import { Plus } from "lucide-react";
import React, { useState } from "react";

function FAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const faqData = [
    {
      id: 1,
      question: "Are your caregivers trained and certified?",
      answer:
        "Yes, all our caregivers are fully trained and certified professionals. They undergo comprehensive background checks, complete specialized training programs, and maintain current certifications in healthcare and safety protocols.",
    },
    {
      id: 2,
      question: "How do I know if home care is right for my loved one?",
      answer:
        "Home care is ideal for individuals who need assistance with daily activities but prefer to remain in the comfort of their own home. We offer free consultations to assess your loved one's needs and determine if our services are the right fit.",
    },
    {
      id: 3,
      question: "Can I choose the caregiver for my loved one?",
      answer:
        "Absolutely! We work closely with you to match the right caregiver based on your loved one's specific needs, personality, and preferences. You have the final say in caregiver selection and can request changes if needed.",
    },
    {
      id: 4,
      question: "How is the cost of care determined?",
      answer:
        "Care costs are determined based on the level of care required, frequency of visits, and specific services needed. We provide transparent pricing with no hidden fees and offer flexible payment options to fit your budget.",
    },
    {
      id: 5,
      question: "Is Massscare's home care covered by insurance?",
      answer:
        "Many of our services may be covered by insurance, including Medicare, Medicaid, and private insurance plans. Our team will help you understand your coverage options and assist with insurance verification and claims processing.",
    },
  ];
  return (
    <section className="py-8 md:py-12 px-20 bg-white mb-20">
      <div className="max-w-full mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            <TTSWrapper text="Frequently Asked Questions">
              Frequently Asked Questions
            </TTSWrapper>
          </h2>
          <p className="text-gray-600 max-w-lg">
            <TTSWrapper text="Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of the printing and typesetting ndsince the 1500s, when an unknown printer took a galleytext of the printing and typesetting industry">
              Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of
              the printing and typesetting ndsince the 1500s, when an unknown
              printer took a galleytext of the printing and typesetting industry
            </TTSWrapper>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.slice(0, 3).map((faq) => (
              <div
                key={faq.id}
                className={`${
                  expandedFAQ === faq.id
                    ? "text-white bg-[#0A5BE0]"
                    : "bg-white text-black"
                } rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className={`text-md font-semibold pr-4`}>
                    <TTSWrapper text={faq.question}>{faq.question}</TTSWrapper>
                  </h3>
                  <button
                    className={`flex-shrink-0 w-8 h-8 ${
                      expandedFAQ === faq.id
                        ? "bg-white text-[#0A5BE0]"
                        : "bg-[#0A5BE0] text-white"
                    } rounded-full flex items-center justify-center transition-all duration-300`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 bg-[#0A5BE0] text-white">
                    <div className="border-gray-100">
                      <p className="leading-relaxed">
                        <TTSWrapper text={faq.answer}>{faq.answer}</TTSWrapper>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqData.slice(3).map((faq) => (
              <div
                key={faq.id}
                className={`${
                  expandedFAQ === faq.id
                    ? "text-white bg-[#0A5BE0]"
                    : "bg-white text-black"
                } rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="text-md font-semibold pr-4">
                    <TTSWrapper text={faq.question}>{faq.question}</TTSWrapper>
                  </h3>
                  <button
                    className={`flex-shrink-0 w-8 h-8 ${
                      expandedFAQ === faq.id
                        ? "bg-white text-[#0A5BE0]"
                        : "bg-[#0A5BE0] text-white"
                    } rounded-full flex items-center justify-center transition-all duration-300`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div>
                      <p className="text-white leading-relaxed">
                        <TTSWrapper text={faq.answer}>{faq.answer}</TTSWrapper>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
