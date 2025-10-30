"use client";
import React, { useState } from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";

const ClientStoriesSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const clientStories = [
    {
      id: 1,
      image: "/testimonials/testimonial-5.jpg",
      hasVideo: false,
    },
    {
      id: 2,
      image: "/testimonials/testimonial-1.png",
      hasVideo: true,
      videoUrl: "/common/testimonials-video.mp4",
    },
    {
      id: 3,
      image: "/testimonials/testimonial-2.png",
      hasVideo: false,
    },
    {
      id: 4,
      image: "/testimonials/testimonial3.png",
      hasVideo: true,
      videoUrl: "/common/testimonials-video.mp4",
    },
    {
      id: 5,
      image: "/testimonials/testimonial-4.png",
      hasVideo: false,
    },
  ];

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
            <TTSWrapper text="Client Stories">Client Stories</TTSWrapper>
          </h2>
          <p className="text-base font-normal text-black leading-relaxed">
            <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s.">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&#39;s standard dummy text
              ever since the 1500s.
            </TTSWrapper>
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className="overflow-x-auto scrollbar-hide pb-6">
          <div className="flex gap-4 sm:gap-6 min-w-max px-1">
            {clientStories.map((story) => (
              <div
                key={story.id}
                className="relative flex-shrink-0 group cursor-pointer"
              >
                <div
                  className={`relative w-[300px] sm:w-[350px] lg:w-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    story.hasVideo
                      ? "h-[300px] sm:h-[340px] lg:h-[400px]"
                      : "h-[250px] sm:h-[280px] lg:h-[320px] items-center justify-center"
                  }`}
                >
                  <Image
                    src={story.image}
                    alt={`Client story ${story.id}`}
                    fill
                    className="object-cover object-center items-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay for Video Stories */}
                  {story.hasVideo && !playingVideo && (
                    <div
                      onClick={() => handlePlayClick(story.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Video Player */}
                  {story.hasVideo && playingVideo === story.id && (
                    <div className="absolute inset-0 z-10">
                      <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden">
                        <video
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                          onEnded={handleCloseVideo}
                        >
                          <source src={story.videoUrl} type="video/mp4" />
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
