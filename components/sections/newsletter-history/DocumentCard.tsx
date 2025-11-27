"use client";
import React from "react";
import { Download } from "lucide-react";
import TTSWrapper from "@/hooks/TTSWrapper";

interface Document {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  description: string;
  document_value: string;
}

export interface NewsletterList {
  newsletters?: Document[];
  pagination?: {
    last_page: number;
    current_page: number;
  };
}

const DocumentCard: React.FC<{ doc: Document }> = ({ doc }) => {
  return (
    <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium truncate">
          <TTSWrapper text={doc.title}>{doc.title}</TTSWrapper>
        </h3>
        <p className="text-base font-normal truncate mt-0.5">
          <TTSWrapper text={doc.description}>{doc.description}</TTSWrapper>
        </p>
      </div>
      <button
        className="ml-4 p-2 cursor-pointer"
        aria-label="Download document"
        onClick={() => window.open(doc.document_value, "_blank")}
      >
        <Download className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default function DocumentList({
  newsletterList,
  setDisplayCount,
  displayCount,
}: {
  newsletterList: NewsletterList | null;
  setDisplayCount: (count: number) => void;
  displayCount: number;
}) {
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsletterList?.newsletters?.map((doc: Document) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>

        {/* View More Button */}
        {newsletterList?.pagination &&
          newsletterList.pagination.last_page >
            newsletterList.pagination.current_page && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setDisplayCount(displayCount + 12)}
              className="px-8 py-3 bg-[#0A5BE0] text-white font-medium rounded-full flex items-center gap-2 hover:bg-[#084CC0] transition-colors"
            >
              <TTSWrapper text="View More" className="text-white font-medium">
                View More
              </TTSWrapper>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
