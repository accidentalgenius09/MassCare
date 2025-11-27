"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import { X, ArrowUpRight } from "lucide-react";
import React from "react";
import { ClockOutline, MapPinOutline } from "../helpers/svgs";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyNow?: (jobTitle: string) => void;
  job: {
    id: number;
    category?: string;
    title: string;
    postedTime?: string;
    description?: string;
    location?: string;
    employmentType?: string;
    experience?: string;
    requirements?: string[];
    fullDescription?: string;
    responsibilities?: string[];
    department?: {
      id: number;
      title: string;
    };
    job_type?: {
      title: string;
    };
    city?: {
      name: string;
    };
    state?: {
      name: string;
    };
    job_tags?: Array<{
      title: string;
    }>;
  };
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  onApplyNow,
  job,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0000004f]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        <div className="px-20">
          <span className="inline-block bg-[#E8EFFF] text-[#111] text-base font-medium px-4 py-1 rounded-b-xl">
            <TTSWrapper text={job.department?.title ?? ""}>{job.department?.title ?? ""}</TTSWrapper>
          </span>
        </div>
        {/* Modal Content */}
        <div className="px-20 pt-6 pb-14">
          {/* Job Title */}
          <h2 className="text-4xl font-medium text-black mb-4">
            <TTSWrapper text={job.title}>{job.title}</TTSWrapper>
          </h2>

          {/* Basic Job Information */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-8">
              {(job.job_type || job.experience) && (
                <div className="flex items-center gap-2 text-black">
                  <ClockOutline />
                  <span className="text-sm">
                    <TTSWrapper
                      text={`${job.job_type?.title || job.employmentType || ""} • ${job.experience || ""} ${job.experience ? "years" : ""}`}
                    >
                      {job.job_type?.title || job.employmentType || ""} • {job.experience || ""} {job.experience ? "years" : ""}
                    </TTSWrapper>
                  </span>
                </div>
              )}
              {job.city && job.state && (
                <div className="flex items-center gap-2 text-black">
                  <MapPinOutline />
                  <span className="text-sm">
                    <TTSWrapper text={`${job.city.name}, ${job.state.name}`}>{`${job.city.name}, ${job.state.name}`}</TTSWrapper>
                  </span>
                </div>
              )}
              {!job.city && !job.state && job.location && (
                <div className="flex items-center gap-2 text-black">
                  <MapPinOutline />
                  <span className="text-sm">
                    <TTSWrapper text={job.location}>{job.location}</TTSWrapper>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Responsibilities */}
          {((job.job_tags && job.job_tags.length > 0) || (job.requirements && job.requirements.length > 0)) && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                <TTSWrapper text="Key Responsibilities:">
                  Key Responsibilities:
                </TTSWrapper>
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.job_tags && job.job_tags.length > 0
                  ? job.job_tags.map((requirement: { title: string }, index: number) => (
                      <span
                        key={index}
                        className="inline-block text-black text-sm px-3 py-1 rounded-full border border-black"
                      >
                        <TTSWrapper text={requirement.title}>{requirement.title}</TTSWrapper>
                      </span>
                    ))
                  : job.requirements?.map((requirement: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block text-black text-sm px-3 py-1 rounded-full border border-black"
                      >
                        <TTSWrapper text={requirement}>{requirement}</TTSWrapper>
                      </span>
                    ))}
              </div>
            </div>
          )}

          {/* Job Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              <TTSWrapper text="Job Description:">Job Description:</TTSWrapper>
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <div>
                <TTSWrapper text={job.description || ""}>
                  <div
                    className="text-black leading-relaxed prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: job.description || ""
                    }}
                  />
                </TTSWrapper>
              </div>
            </div>
          </div>

          {/* Apply Now Button */}
          <div className="flex">
            <button
              onClick={() => {
                onApplyNow?.(job.title);
                onClose();
              }}
              className="bg-[#0A5BE0] text-white px-5 py-3 rounded-full flex items-center gap-2 font-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              <TTSWrapper text="Apply Now">Apply Now</TTSWrapper>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
