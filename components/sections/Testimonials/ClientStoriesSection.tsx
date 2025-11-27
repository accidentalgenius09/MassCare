"use client";
import React, { useState } from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TestimonialsPageData } from "@/types/Testimonials.type";

const ClientStoriesSection = ({
  testimonialsData,
}: {
  testimonialsData: TestimonialsPageData;
}) => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handlePlayClick = (storyId: number) => {
    setPlayingVideo(storyId);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 max-w-2xl mx-30">
          <h2 className="text-5xl font-semibold text-black mb-4">
            <TTSWrapper
              text={testimonialsData.testimonial_cms.section3_title || ""}
            >
              {testimonialsData.testimonial_cms.section3_title || ""}
            </TTSWrapper>
          </h2>
          <p className="text-base font-normal text-black leading-relaxed">
            <TTSWrapper
              text={testimonialsData.testimonial_cms.section3_description || ""}
            >
              {testimonialsData.testimonial_cms.section3_description || ""}
            </TTSWrapper>
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className="overflow-x-auto scrollbar-hide pb-6">
          <div className="flex gap-4 sm:gap-6 min-w-max px-1">
            {testimonialsData.client_stories.map((story) => (
              <div
                key={story.id}
                className="relative flex-shrink-0 group cursor-pointer"
              >
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    story.media_type === "video"
                      ? "h-[300px] sm:h-[340px] lg:h-[400px] w-[300px] sm:w-[350px] lg:w-[350px]"
                      : "h-[250px] sm:h-[280px] lg:h-[320px] mt-10 items-center justify-between w-[300px] sm:w-[350px] lg:w-[400px]"
                  }`}
                >
                  {(story.video_thumbnail_image_value || story.image_value) && (
                    <Image
                      src={
                        story.image_value ||
                        story.video_thumbnail_image_value ||
                        ""
                      }
                      alt={story.image_alt_text_value || ""}
                      fill
                      className="object-cover object-center items-center group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Play Button Overlay for Video Stories */}
                  {story.media_type === "video" && !playingVideo && (
                    <div
                      onClick={() => handlePlayClick(story.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-20 h-20"
                          width="100"
                          height="100"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <path
                            d="M50 0C22.4283 0 0 22.4305 0 50C0 77.5695 22.4283 100 50 100C77.5717 100 100 77.5695 100 50C100 22.4305 77.5717 0 50 0ZM69.8772 51.7518L40.7105 70.5018C40.3688 70.7234 39.974 70.8334 39.5834 70.8334C39.2416 70.8334 38.8957 70.7478 38.5865 70.5791C37.915 70.2129 37.5 69.5129 37.5 68.75V31.25C37.5 30.4871 37.915 29.7871 38.5865 29.4209C39.2457 29.0588 40.0717 29.0811 40.7105 29.4982L69.8772 48.2482C70.4713 48.6307 70.8334 49.292 70.8334 50C70.8334 50.708 70.4713 51.3691 69.8772 51.7518Z"
                            fill="white"
                            fillOpacity="0.47"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Video Player */}
                  {story.media_type === "video" &&
                    playingVideo === story.id && (
                      <div className="absolute inset-0 z-10">
                        {story.video_value && (
                          <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden">
                            <video
                              controls
                              autoPlay
                              className="w-full h-full object-contain"
                              onEnded={handleCloseVideo}
                            >
                              <source
                                src={story.video_value}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              onClick={handleCloseVideo}
                              className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 z-20"
                            >
                              <svg
                                className="w-6 h-6 text-gray-900"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm">Swipe to see more</span>
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ClientStoriesSection;
