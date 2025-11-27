"use client";

import { ClockOutline, MapPinOutline } from "@/components/helpers/svgs";
import FAQ from "@/components/sections/Common/FAQ";
import PageBanner from "@/components/sections/Common/PageBanner";
import JobDetailsModal from "@/components/ui/JobDetailsModal";
import ApplyNowModal from "@/components/ui/ApplyNowModal";
import TTSWrapper from "@/hooks/TTSWrapper";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FilterDropdown } from "@/components/sections/Common/FilterDropdown";
import restApiWrapper from "@/service/RestApiWrapper";
import { CareerDataType } from "@/types/Career.type";

interface CareerListData {
  careers: JobListing[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
interface JobListing {
  id: number;
  category?: string;
  title: string;
  postedTime?: string;
  description?: string;
  short_description?: string;
  location: string;
  employmentType: string;
  experience: string;
  requirements?: string[];
  fullDescription?: string;
  responsibilities?: string[];
  created_at?: string;
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

interface OptionItem {
  label: string;
  value: string | number;
}

// Helper function to convert ISO date to "X Days ago" format
const formatDaysAgo = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "1 Day ago";
  } else {
    return `${diffDays} Days ago`;
  }
};

function CareerOpportunitiesPage() {
  const [selectedRole, setSelectedRole] = useState<OptionItem | null>({
    label: "All Roles",
    value: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<OptionItem | null>({
    label: "All Locations",
    value: "",
  });
  const [selectedType, setSelectedType] = useState<OptionItem | null>({
    label: "All Departments",
    value: "",
  });
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] =
    useState<JobListing | null>(null);
  const [displayCount, setDisplayCount] = useState(6);
  const [careers, setCareers] = useState<CareerDataType>({} as CareerDataType);
  const [isLoading, setIsLoading] = useState(true);
  const handleClearFilters = () => {
    setSelectedRole({ label: "All Roles", value: "All Roles" });
    setSelectedLocation(
      locationOptionsForDropdown.length > 0
        ? locationOptionsForDropdown[0]
        : null
    );
    setSelectedType({ label: "All Departments", value: "All Departments" });
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
      // Called from JobDetailsModal with just the title (fallback for old code)
      const job =
        jobListings?.find((j) => j.title === jobOrTitle) ||
        jobListingsData?.careers?.find(
          (j: JobListing) => j.title === jobOrTitle
        );
      if (job) {
        setSelectedJobForApplication(job);
        setIsApplyModalOpen(true);
      }
    } else {
      // Called from job listing cards or JobDetailsModal with full job object
      setSelectedJobForApplication(jobOrTitle);
      setIsApplyModalOpen(true);
    }
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJobForApplication(null);
  };

  const handleViewMore = () => {
    setDisplayCount(displayCount + 6);
  };

  useEffect(() => {
    setDisplayCount(6);
  }, [selectedRole?.value, selectedLocation?.value, selectedType?.value]);

  useEffect(() => {
    if (
      selectedType?.value === "" ||
      selectedType?.value === "All Departments"
    ) {
      setSelectedRole({ label: "All Roles", value: "All Roles" });
      setDepartmentsOptionsForDropdown([{ label: "All Roles", value: "" }]);
    } else {
      restApiWrapper
        .get(`/department-roles?department=${selectedType?.value}`)
        .then((response) => {
          const options = [
            { label: "All Roles", value: "All Roles" },
            ...response.data.map((role: { title: string; id: number }) => ({
              label: role.title,
              value: role.id,
            })),
          ];
          setDepartmentsOptionsForDropdown(options);
          // Set default selection to "All Roles" when options change
          setSelectedRole(options[0]);
        })
        .catch((error) => {
          console.error("Error fetching department roles:", error);
        });
    }
  }, [selectedType]);

  const [jobListingsData, setJobListingsData] = useState<CareerListData | null>(
    null
  );
  // Fetch careers data from API
  useEffect(() => {
    const fetchCareersList = async () => {
      setIsLoading(true);
      try {
        const responseList = await restApiWrapper.get(
          `/career-list?department=${
            selectedType?.value === "All Departments" ||
            selectedType?.value === ""
              ? ""
              : selectedType?.value
          }&per_page=${displayCount}&role=${
            selectedRole?.value === "All Roles" || selectedRole?.value === ""
              ? ""
              : selectedRole?.value
          }&location=${
            selectedLocation?.value === "All Locations" ||
            selectedLocation?.value === ""
              ? ""
              : selectedLocation?.value
          }&page=1`
        );
        setJobListingsData(responseList.data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareersList();
  }, [selectedType, selectedRole, selectedLocation, displayCount]);

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        const response = await restApiWrapper.get("/careers");
        setCareers(response.data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Transform locations to FilterDropdown format {label, value}
  const [locationOptionsForDropdown, setLocationOptionsForDropdown] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [departmentsOptionsForDropdown, setDepartmentsOptionsForDropdown] =
    useState<{ label: string; value: string | number }[]>([
      { label: "All Roles", value: "All Roles" },
    ]);
  const [typesOptionsForDropdown, setTypesOptionsForDropdown] = useState<
    { label: string; value: string | number }[]
  >([]);

  useEffect(() => {
    if (careers?.locations && careers.locations.length > 0) {
      const options = [
        { label: "All Locations", value: "All Locations" },
        ...careers.locations.map((loc) => ({
          label: loc.name,
          value: loc.id,
        })),
      ];
      setLocationOptionsForDropdown(options);
      // Set default selection if not already set
      if (!selectedLocation) {
        setSelectedLocation(options[0]);
      }
    } else {
      setLocationOptionsForDropdown([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers?.locations]);

  useEffect(() => {
    if (careers?.departments && careers.departments.length > 0) {
      const options = [
        { label: "All Departments", value: "All Departments" },
        ...careers.departments.map((dept) => ({
          label: dept.title,
          value: dept.id,
        })),
      ];
      setTypesOptionsForDropdown(options);
      // Set default selection if not already se
      if (!selectedType) {
        setSelectedType(options[0]);
      }
    } else {
      setTypesOptionsForDropdown([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers?.departments]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[9999]">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Spinner */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#E8EFFF] rounded-full"></div>
              <div className="w-20 h-20 border-4 border-[#0A5BE0] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#0A5BE0] rounded-full animate-pulse"></div>
              </div>
            </div>
            {/* Loading Text */}
            <div className="text-center">
              <p className="text-[#0A5BE0] text-xl font-semibold animate-pulse">
                <TTSWrapper text="Loading Career Opportunities...">
                  Loading Career Opportunities...
                </TTSWrapper>
              </p>
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the latest opportunities">
                  Please wait while we fetch the latest opportunities
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
        <PageBanner
          title={careers?.banner?.banner_title}
          breadcrumb="Home / Career Opportunities"
          image="/common/dna-banner.png"
          description={careers?.banner?.banner_description}
        />

        <div className="min-h-screen bg-white pt-8 pb-2 sm:pt-12 sm:pb-6 md:pt-16 md:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-full px-4 sm:px-8 lg:px-20 mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 sm:mb-12">
              <div className="mb-6 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
                  <TTSWrapper text={careers?.career_cms?.section1_title}>
                    {careers?.career_cms?.section1_title}
                  </TTSWrapper>
                </h1>
              </div>

              {/* Filter Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <FilterDropdown
                    value={selectedType}
                    options={typesOptionsForDropdown}
                    onChange={(option) => setSelectedType(option)}
                    className="mt-1"
                    widthClass="w-48"
                  />
                  <FilterDropdown
                    value={selectedLocation}
                    options={locationOptionsForDropdown}
                    onChange={(option) => setSelectedLocation(option)}
                    className="mt-1"
                    widthClass="w-48"
                  />
                  <FilterDropdown
                    value={selectedRole}
                    options={departmentsOptionsForDropdown}
                    onChange={(option) => setSelectedRole(option)}
                    className="mt-1"
                    widthClass="w-48"
                    disabled={
                      selectedType?.value === "" ||
                      selectedType?.value === "All Departments" ||
                      departmentsOptionsForDropdown.length <= 1
                    }
                  />
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
              {jobListingsData?.careers?.map((job: JobListing, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 px-4 sm:px-6 pb-6 shadow-sm text-sm"
                >
                  {/* Category Tag */}
                  {job.department && (
                    <div className="mb-4">
                      <span className="inline-block bg-[#E8EFFF] text-black font-base px-3 rounded-b-lg">
                        <TTSWrapper text={job.department.title}>
                          {job.department.title}
                        </TTSWrapper>
                      </span>
                    </div>
                  )}

                  {/* Job Title */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-medium text-black">
                      <TTSWrapper text={job.title}>{job.title}</TTSWrapper>
                    </h3>

                    {/* Posted Time */}
                    {job.created_at && (
                      <p className="text-xs text-[#8F8F8F]">
                        <TTSWrapper text={formatDaysAgo(job.created_at)}>
                          {formatDaysAgo(job.created_at)}
                        </TTSWrapper>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="max-w-full sm:max-w-[85%]">
                    <p className="text-sm text-black mb-4 leading-relaxed">
                      <TTSWrapper text={job.short_description || ""}>
                        {job.short_description}
                      </TTSWrapper>
                    </p>

                    {/* Location */}
                    {job.city && job.state && (
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinOutline />
                        <span className="text-sm text-black">
                          <TTSWrapper
                            text={`${job.city.name}, ${job.state.name}`}
                          >
                            {`${job.city.name}, ${job.state.name}`}
                          </TTSWrapper>
                        </span>
                      </div>
                    )}

                    {/* Employment Type & Experience */}
                    <div className="flex items-center gap-2 mb-4">
                      <ClockOutline />
                      <span className="text-sm text-black">
                        <TTSWrapper
                          text={`${job.job_type?.title} • ${job.experience} years`}
                        >
                          {job.job_type?.title} • {job.experience} years
                        </TTSWrapper>
                      </span>
                    </div>

                    {/* Key Requirements */}
                    {job.job_tags && job.job_tags.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          <TTSWrapper text="Key Requirements:">
                            Key Requirements:
                          </TTSWrapper>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.job_tags
                            .slice(0, 2)
                            .map(
                              (
                                requirement: { title: string },
                                index: number
                              ) => (
                                <span
                                  key={index}
                                  className="inline-block text-black text-xs px-2 py-1 rounded-full border"
                                >
                                  <TTSWrapper text={requirement.title}>
                                    {requirement.title}
                                  </TTSWrapper>
                                </span>
                              )
                            )}
                          {job.job_tags.length > 2 && (
                            <span className="inline-block text-black text-xs px-2 py-1 rounded-full border">
                              <TTSWrapper
                                text={`+${job.job_tags.length - 2} more`}
                              >
                                +{job.job_tags.length - 2} more
                              </TTSWrapper>
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleViewDetails(job)}
                        className="flex gap-2 items-center justify-center px-4 py-3 border border-[#0A5BE0] text-[#0A5BE0] rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-700 hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                      >
                        <TTSWrapper text="View Details">
                          View Details
                        </TTSWrapper>
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
            {jobListingsData?.careers?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  <TTSWrapper text="No openings match your filters">
                    No openings match your filters
                  </TTSWrapper>
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  <TTSWrapper text="Try adjusting the role, location, or job type filters to discover more opportunities.">
                    Try adjusting the role, location, or job type filters to
                    discover more opportunities.
                  </TTSWrapper>
                </p>
              </div>
            )}
            {jobListingsData?.pagination &&
              jobListingsData.pagination.last_page >
                jobListingsData.pagination.current_page && (
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
                  <TTSWrapper text={careers?.career_cms?.section2_title}>
                    {careers?.career_cms?.section2_title}
                  </TTSWrapper>
                </h2>
                <TTSWrapper text={careers?.career_cms?.section2_description}>
                  <div
                    className="text-lg text-black max-w-2xl mx-auto leading-relaxed prose prose-lg"
                    dangerouslySetInnerHTML={{
                      __html: careers?.career_cms?.section2_description || "",
                    }}
                  />
                </TTSWrapper>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {careers?.values &&
                  careers.values.length > 0 &&
                  careers.values?.map((value, index) => (
                    <div
                      key={value.id}
                      className={`${
                        index === 0
                          ? "bg-[#E8EFFF] rounded-xl"
                          : "bg-blue-50 rounded-2xl"
                      } p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300`}
                    >
                      <h3 className="text-xl sm:text-2xl font-medium text-black mb-3 sm:mb-4">
                        <TTSWrapper text={value.title}>
                          {value.title}
                        </TTSWrapper>
                      </h3>
                      <TTSWrapper text={value.description}>
                        <div
                          className="text-black leading-relaxed prose prose-sm"
                          dangerouslySetInnerHTML={{
                            __html: value.description || "",
                          }}
                        />
                      </TTSWrapper>
                    </div>
                  ))}
              </div>
            </section>{" "}
          </div>
        </div>
        <section className="pt-16 pb-24 bg-[#E8EFFF]">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
              <TTSWrapper text={careers?.career_cms?.section3_title}>
                {careers?.career_cms?.section3_title}
              </TTSWrapper>
            </h2>
            <TTSWrapper text={careers?.career_cms?.section3_description || ""}>
              <div
                className="text-base text-black max-w-4xl mx-auto leading-relaxed prose prose-lg"
                dangerouslySetInnerHTML={{
                  __html: careers?.career_cms?.section3_description || "",
                }}
              />
            </TTSWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 sm:mx-8 lg:mx-24">
            {careers?.process?.map((step, index) => (
              <div
                key={step.id}
                className={`bg-white p-6 sm:p-8 relative rounded-xl lg:rounded-none ${
                  index === 0
                    ? "lg:rounded-l-xl"
                    : index === careers?.process?.length - 1
                    ? "lg:rounded-r-xl"
                    : ""
                }`}
              >
                {careers?.process?.length - 1 !== index && (
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
                  <TTSWrapper text={`0${index + 1}`}>{`0${
                    index + 1
                  }`}</TTSWrapper>
                </div>
                <h3 className="text-xl font-semibold text-[#111] mb-3 sm:mb-4">
                  <TTSWrapper text={step.title}>{step.title}</TTSWrapper>
                </h3>
                <div className="text-[#111] leading-relaxed">
                  <TTSWrapper text={step.description}>
                    <div
                      className="text-[#111] leading-relaxed prose prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: step.description || "",
                      }}
                    />
                  </TTSWrapper>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <FAQ
        title={careers?.career_cms?.section4_title}
        description={careers?.career_cms?.section4_description}
        faqList={careers?.faqs}
      />

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
