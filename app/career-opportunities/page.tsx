"use client";

import { ClockOutline, MapPinOutline } from "@/components/helpers/svgs";
import FAQ from "@/components/sections/Common/FAQ";
import PageBanner from "@/components/sections/Common/PageBanner";
import JobDetailsModal from "@/components/ui/JobDetailsModal";
import ApplyNowModal from "@/components/ui/ApplyNowModal";
import TTSWrapper from "@/hooks/TTSWrapper";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

interface JobListing {
  id: number;
  category: string;
  title: string;
  postedTime: string;
  description: string;
  location: string;
  employmentType: string;
  experience: string;
  requirements: string[];
  fullDescription?: string;
  responsibilities?: string[];
}

interface ApplicationStep {
  id: number;
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    category: "Critical Care",
    title: "ICU Nurse",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "Medical License",
      "MBBS degree",
    ],
    fullDescription:
      "We are seeking a highly skilled and compassionate ICU Nurse to join our growing medical team. The ideal candidate will specialize in the prevention, diagnosis, and treatment of musculeletal conditions, including bones, joints, ligaments, tendons, and muscles. This role involves performing surgical and non-surgical interventions, providing patient-centered care, and collaborating with a multidisciplinary team to achieve the best outcomes.",
    responsibilities: [
      "Provide direct patient care in ICU setting",
      "Monitor and assess patient conditions",
      "Administer medications and treatments",
      "Collaborate with healthcare team",
      "Maintain patient records and documentation",
    ],
  },
  {
    id: 2,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
    ],
  },
  {
    id: 3,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Part-time",
    experience: "2+ years",
    requirements: ["BSC degree", "Current RN license", "BLS certification"],
  },
  {
    id: 4,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Part-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
    ],
  },
  {
    id: 5,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
  {
    id: 6,
    category: "Critical Care",
    title: "Registered Nurse - ICU",
    postedTime: "2 Days ago",
    description:
      "Join our dynamic ICU team providing critical care to patients in our state-of-the-art facility.",
    location: "New York, NY",
    employmentType: "Full-time",
    experience: "2+ years",
    requirements: [
      "BSC degree",
      "Current RN license",
      "BLS certification",
      "ALS certification",
      "OSCE/CBT prep",
      "NVQ Level 2",
      "NVQ Level 3",
      "NVQ Level 4",
      "NVQ Level 5",
    ],
  },
];

const applicationSteps: ApplicationStep[] = [
  {
    id: 1,
    number: "01",
    title: "Submit Application",
    description:
      "Complete our online application form with your qualifications, experience, and preferences. Upload your resume and any relevant certifications.",
    isLast: false,
  },
  {
    id: 2,
    number: "02",
    title: "Initial Review & Interview",
    description:
      "Our HR team will review your application and schedule a phone or video interview to discuss your background and career goals.",
    isLast: false,
  },
  {
    id: 3,
    number: "03",
    title: "Skills Assessment",
    description:
      "Depending on the role, you may complete a skills assessment or participate in a panel interview with department supervisors.",
    isLast: false,
  },
  {
    id: 4,
    number: "04",
    title: "Final Decision & Onboarding",
    description:
      "Once selected, we'll extend an offer and begin the onboarding process including background checks, orientation, and training.",
    isLast: true,
  },
];

function CareerOpportunitiesPage() {
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] =
    useState<JobListing | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  const handleClearFilters = () => {
    setSelectedRole("All Roles");
    setSelectedLocation("All Locations");
    setSelectedType("All Types");
  };

  const handleViewDetails = (job: JobListing) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApplyNow = (jobOrTitle: JobListing | string) => {
    if (typeof jobOrTitle === "string") {
      // Called from JobDetailsModal with just the title
      const job = jobListings.find((j) => j.title === jobOrTitle);
      if (job) {
        setSelectedJobForApplication(job);
        setIsApplyModalOpen(true);
      }
    } else {
      // Called from job listing cards with full job object
      setSelectedJobForApplication(jobOrTitle);
      setIsApplyModalOpen(true);
    }
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJobForApplication(null);
  };

  const handleViewMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  return (
    <>
      <PageBanner
        title="Career Opportunities"
        breadcrumb="Home / Career Opportunities"
        image="/common/dna-banner.png"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />

      <div className="min-h-screen bg-white pt-8 pb-2 sm:pt-12 sm:pb-6 md:pt-16 md:pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full px-4 sm:px-8 lg:px-20 mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 sm:mb-12">
            <div className="mb-6 sm:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
                <TTSWrapper text="Career Openings">Career Openings</TTSWrapper>
              </h1>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {/* Role Filter */}
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Critical Care">Critical Care</option>
                    <option value="Home Care">Home Care</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="London, UK">London, UK</option>
                    <option value="Manchester, UK">Manchester, UK</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Type Filter */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg w-full sm:w-36 px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-[#E8EFFF] rounded-full text-sm font-medium text-gray-700 bg-[#E8EFFF] hover:bg-gray-50 hover:shadow-md transition-all duration-300"
              >
                <TTSWrapper text="Clear Filters">Clear Filters</TTSWrapper>
              </button>
            </div>
          </div>
          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
            {jobListings.slice(0, displayCount).map((job,i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-300 px-4 sm:px-6 pb-6 hover:shadow-sm transition-shadow text-sm duration-300"
              >
                {/* Category Tag */}
                <div className="mb-4">
                  <span className="inline-block bg-[#E8EFFF] text-black font-base px-3 rounded-b-lg">
                    <TTSWrapper text={job.category}>{job.category}</TTSWrapper>
                  </span>
                </div>

                {/* Job Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-medium text-black">
                    <TTSWrapper text={job.title}>{job.title}</TTSWrapper>
                  </h3>

                  {/* Posted Time */}
                  <p className="text-xs text-[#8F8F8F]">
                    <TTSWrapper text={job.postedTime}>
                      {job.postedTime}
                    </TTSWrapper>
                  </p>
                </div>

                {/* Description */}
                <div className="max-w-full sm:max-w-[85%]">
                  <p className="text-sm text-black mb-4 leading-relaxed">
                    <TTSWrapper text={job.description}>
                      {job.description}
                    </TTSWrapper>
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinOutline />
                    <span className="text-sm text-black">
                      <TTSWrapper text={job.location}>
                        {job.location}
                      </TTSWrapper>
                    </span>
                  </div>

                  {/* Employment Type & Experience */}
                  <div className="flex items-center gap-2 mb-4">
                    <ClockOutline />
                    <span className="text-sm text-black">
                      <TTSWrapper
                        text={`${job.employmentType} • ${job.experience}`}
                      >
                        {job.employmentType} • {job.experience}
                      </TTSWrapper>
                    </span>
                  </div>

                  {/* Key Requirements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      <TTSWrapper text="Key Requirements:">
                        Key Requirements:
                      </TTSWrapper>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements
                        .slice(0, 2)
                        .map((requirement, index) => (
                          <span
                            key={index}
                            className="inline-block text-black text-xs px-2 py-1 rounded-full border"
                          >
                            <TTSWrapper text={requirement}>
                              {requirement}
                            </TTSWrapper>
                          </span>
                        ))}
                      {job.requirements.length > 2 && (
                        <span className="inline-block text-black text-xs px-2 py-1 rounded-full border">
                          <TTSWrapper
                            text={`+${job.requirements.length - 2} more`}
                          >
                            +{job.requirements.length - 2} more
                          </TTSWrapper>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleViewDetails(job)}
                      className="flex gap-2 items-center justify-center px-4 py-3 border border-[#0A5BE0] text-[#0A5BE0] rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-700 hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                    >
                      <TTSWrapper text="View Details">View Details</TTSWrapper>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleApplyNow(job)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0A5BE0] text-white rounded-full text-sm font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      <TTSWrapper text="Apply Now">Apply Now</TTSWrapper>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {displayCount < jobListings.length && (
            <div className="flex items-center justify-center mt-10">
              <button 
                onClick={handleViewMore}
                className="bg-[#0A5BE0] text-white cursor-pointer px-4 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              >
                <TTSWrapper text="View More">View More</TTSWrapper>
              </button>
            </div>
          )}
          {/* Our Culture & Values Section */}
          <section className="py-16 sm:py-20 md:py-24">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                <TTSWrapper text="Our Culture & Values">
                  Our Culture & Values
                </TTSWrapper>
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto leading-relaxed">
                <TTSWrapper text="We've built a workplace where healthcare professionals can thrive, grow, and make a meaningful impact every day.">
                  We&apos;ve built a workplace where healthcare professionals
                  can thrive, grow, and make a meaningful impact every day.
                </TTSWrapper>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Compassionate Care */}
              <div className="bg-[#E8EFFF] rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-medium text-black mb-3 sm:mb-4">
                  <TTSWrapper text="Compassionate Care">
                    Compassionate Care
                  </TTSWrapper>
                </h3>
                <p className="text-black leading-relaxed">
                  <TTSWrapper text="We believe in treating every patient with dignity, respect, and empathy">
                    We believe in treating every patient with dignity, respect,
                    and empathy
                  </TTSWrapper>
                </p>
              </div>

              {/* Team Collaboration */}
              <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-medium text-black mb-3 sm:mb-4">
                  <TTSWrapper text="Team Collaboration">
                    Team Collaboration
                  </TTSWrapper>
                </h3>
                <p className="text-black leading-relaxed">
                  <TTSWrapper text="We work together as one team, supporting each other to deliver the best outcomes">
                    We work together as one team, supporting each other to
                    deliver the best outcomes
                  </TTSWrapper>
                </p>
              </div>

              {/* Continuous Learning */}
              <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-medium text-black mb-3 sm:mb-4">
                  <TTSWrapper text="Continuous Learning">
                    Continuous Learning
                  </TTSWrapper>
                </h3>
                <p className="text-black leading-relaxed">
                  <TTSWrapper text="We encourage growth and innovation through ongoing education and training">
                    We encourage growth and innovation through ongoing education
                    and training
                  </TTSWrapper>
                </p>
              </div>

              {/* Work-Life Balance */}
              <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-medium text-black mb-3 sm:mb-4">
                  <TTSWrapper text="Work-Life Balance">
                    Work-Life Balance
                  </TTSWrapper>
                </h3>
                <p className="text-black leading-relaxed">
                  <TTSWrapper text="We understand the importance of personal well-being and family time">
                    We understand the importance of personal well-being and
                    family time
                  </TTSWrapper>
                </p>
              </div>
            </div>
          </section>{" "}
        </div>
      </div>
      <section className="pt-16 pb-24 bg-[#E8EFFF]">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
            <TTSWrapper text="Application Process">
              Application Process
            </TTSWrapper>
          </h2>
          <p className="text-base text-black max-w-4xl mx-auto leading-relaxed">
            <TTSWrapper text="We've streamlined our hiring process to be transparent and efficient. Here's what you can expect when you apply.">
              We&apos;ve streamlined our hiring process to be transparent and
              efficient. Here&apos;s what you can expect when you apply.
            </TTSWrapper>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 sm:mx-8 lg:mx-24">
          {applicationSteps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-white p-6 sm:p-8 relative rounded-xl lg:rounded-none ${
                index === 0
                  ? "lg:rounded-l-xl"
                  : index === applicationSteps.length - 1
                  ? "lg:rounded-r-xl"
                  : ""
              }`}
            >
              {!step.isLast && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "15%",
                    height: "70%",
                    borderRight: "1px solid #000",
                  }}
                ></div>
              )}
              <div className="text-4xl font-medium text-[#012367] mb-4">
                <TTSWrapper text={step.number}>{step.number}</TTSWrapper>
              </div>
              <h3 className="text-xl font-semibold text-[#111] mb-3 sm:mb-4">
                <TTSWrapper text={step.title}>{step.title}</TTSWrapper>
              </h3>
              <p className="text-[#111] leading-relaxed">
                <TTSWrapper text={step.description}>
                  {step.description}
                </TTSWrapper>
              </p>
            </div>
          ))}
        </div>
      </section>
      <FAQ />

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApplyNow={handleApplyNow}
          job={selectedJob}
        />
      )}

      {/* Apply Now Modal */}
      {selectedJobForApplication && (
        <ApplyNowModal
          isOpen={isApplyModalOpen}
          onClose={handleCloseApplyModal}
          jobTitle={selectedJobForApplication.title}
        />
      )}
    </>
  );
}

export default CareerOpportunitiesPage;
