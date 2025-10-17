"use client";
import React from "react";
import { Download } from "lucide-react";
import TTSWrapper from "@/hooks/TTSWrapper";

interface Document {
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "2",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "3",
    title: "Year in Review - 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "4",
    title: "Year in Review - 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "5",
    title: "Holiday Special Edition",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "6",
    title: "Holiday Special Edition",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "7",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "8",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "9",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "10",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "11",
    title: "Year in Review - 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "12",
    title: "Year in Review - 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "13",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
  {
    id: "14",
    title: "Monthly Roundup - December 2024",
    subtitle: "Monthly Roundup - December 2024",
    link: "/common/file-sample.pdf",
  },
];

const DocumentCard: React.FC<{ doc: Document }> = ({ doc }) => {
  return (
    <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">
          <TTSWrapper text={doc.title}>{doc.title}</TTSWrapper>
        </h3>
        <p className="text-xs truncate mt-0.5">
          <TTSWrapper text={doc.subtitle}>{doc.subtitle}</TTSWrapper>
        </p>
      </div>
      <button
        className="ml-4 p-2 cursor-pointer"
        aria-label="Download document"
        onClick={() => window.open(doc.link, "_blank")}
      >
        <Download className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default function DocumentList() {
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
