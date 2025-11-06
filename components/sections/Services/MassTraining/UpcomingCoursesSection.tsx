import React from "react";
import TTSWrapper from "@/hooks/TTSWrapper";
import {
  TopRightArrowWhite,
} from "@/components/helpers/svgs";
import {
  CalendarSVG,
  ClockSVG,
  MapPinSVG,
  PeopleSVG,
} from "@/components/helpers/svgs2";

interface Course {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  enrolled: string;
  instructor: string;
}

function UpcomingCoursesSection() {
  const courses: Course[] = [
    {
      id: 1,
      title: "Dementia Care Fundamentals",
      description:
        "Essential training for care home staff on understanding and supporting residents with dementia.",
      date: "Friday, August 15, 2025",
      time: "09:00",
      duration: "6 hours",
      location: "Training Center A",
      enrolled: "18/25 enrolled",
      instructor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      title: "Medication Management & Safety",
      description:
        "Essential training for care home staff on understanding and supporting residents with dementia.",
      date: "Friday, August 15, 2025",
      time: "09:00",
      duration: "6 hours",
      location: "Training Center A",
      enrolled: "18/25 enrolled",
      instructor: "Dr. Sarah Johnson",
    },
    {
      id: 3,
      title: "Emergency Response Training",
      description:
        "Essential training for care home staff on understanding and supporting residents with dementia.",
      date: "Friday, August 15, 2025",
      time: "09:00",
      duration: "6 hours",
      location: "Training Center A",
      enrolled: "18/25 enrolled",
      instructor: "Dr. Sarah Johnson",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <TTSWrapper text="Upcoming Course Dates">
              Upcoming Course Dates
            </TTSWrapper>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto">
            <TTSWrapper text="Mass Care Momentous represents the proud milestones, meaningful connections, and impactful moments we’ve achieved on our journey in healthcare staffing.">
              Mass Care Momentous represents the proud milestones, meaningful
              connections, and impactful moments we’ve achieved on our journey
              in healthcare staffing.
            </TTSWrapper>
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#E8EFFF] rounded-2xl flex flex-col ps-10 pe-6 py-12 max-w-md mx-auto"
            >
              {/* Course Title */}
              <h3 className="text-xl font-medium text-black mb-5">
                <TTSWrapper text={course.title}>{course.title}</TTSWrapper>
              </h3>

              {/* Description */}
              <p className="text-sm text-black mb-6 font-normal flex-grow max-w-sm">
                <TTSWrapper text={course.description}>
                  {course.description}
                </TTSWrapper>
              </p>

              {/* Course Details */}
              <div className="space-y-3 mb-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-black font-normal">
                  <CalendarSVG />
                  <span>{course.date}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-black font-normal">
                  <div className="text-gray-600">
                    <ClockSVG />
                  </div>
                  <span>
                    {course.time} • {course.duration}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-black font-normal">
                  <div className="text-gray-600">
                    <MapPinSVG />
                  </div>
                  <span>{course.location}</span>
                </div>

                {/* Enrollment */}
                <div className="flex items-center gap-2 text-sm text-black font-normal">
                  <PeopleSVG />
                  <span>{course.enrolled}</span>
                </div>
              </div>

              {/* Instructor */}
              <p className="text-sm text-black mb-8 font-semibold">
                Instructor:{" "}
                <span className="font-normal">{course.instructor}</span>
              </p>

              {/* Enroll Button */}
              <button className="lg:w-2/3 md:w-2/3 w-2/3 bg-[#0A5BE0] text-white font-medium py-3 px-5 rounded-full flex items-center justify-center gap-2 hover:bg-[#084CC0] transition-colors">
                <TTSWrapper
                  text="Enroll Now"
                  className="text-white font-medium"
                >
                  Enroll Now
                </TTSWrapper>
                <div className="pe-1">
                  {" "}
                  <TopRightArrowWhite />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingCoursesSection;
