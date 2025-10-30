import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

const TestimonialHero: React.FC = () => {
  return (
    <div className="mx-30">
      <div className="mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch h-full">
          {/* Left Content */}
          <div className="max-w-lg space-y-6 flex flex-col justify-center">
            <h1 className="text-5xl font-semibold text-black leading-tight">
              <TTSWrapper text="Real People.">Real People.</TTSWrapper> <br />{" "}
              <TTSWrapper text="Real Feedback.">Real Feedback.</TTSWrapper>
            </h1>

            <p className="text-base text-black font-normal max-w-lg leading-relaxed">
              <TTSWrapper text="Over the years, we&#39;ve had the privilege of working with clients from diverse backgrounds — each with unique goals, challenges, and visions. Their words reflect the impact we&#39;ve made together.">
                Over the years, we&#39;ve had the privilege of working with clients
                from diverse backgrounds — each with unique goals, challenges,
                and visions. Their words reflect the impact we&#39;ve made together.
              </TTSWrapper>
            </p>

            <div className="w-fit">
              <button className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-normal px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <TTSWrapper text="Contact Us">Contact Us</TTSWrapper>
                <TopRightArrowWhite />
              </button>
            </div>
          </div>

          {/* Right Content - Image with Overlays */}
          <div className="relative mx-auto">
            {/* Main Image Card */}
            <div className="absolute -top-20 -left-20">
              <Image
                src="/common/light-blue-bg.png"
                alt="Healthcare professional with elderly patient"
                width={700}
                height={540}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,255,255) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 50%)",
                }}
              />
            </div>
            <div className="relative rounded-3xl w-full h-full">
              <Image
                src="/common/testimonials-nurse.png"
                alt="Healthcare professional with elderly patient"
                width={700}
                height={540}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,255,255) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 50%)",
                }}
              />
            </div>

            {/* Avatar Circle - Bottom Left */}
            <div className="absolute bottom-20 -left-30 bg-white rounded-full p-2 shadow-xl flex items-center gap-1">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                  <Image
                    width={48}
                    height={48}
                    src="https://i.pravatar.cc/150?img=1"
                    alt="Client"
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center">
                  <Image
                    width={48}
                    height={48}
                    src="https://i.pravatar.cc/150?img=2"
                    alt="Client"
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                  <Image
                    width={48}
                    height={48}
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Client"
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+</span>
                </div>
              </div>
            </div>

            {/* Rating Card - Top Right */}
            <div className="absolute top-1/3 -right-20 bg-white rounded-2xl px-8 py-4 shadow-xl">
              <div className="text-sm text-gray-600">
                <TTSWrapper text="Trusted by">Trusted by</TTSWrapper>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-blue-600">
                  <TTSWrapper text="10K+">10K+</TTSWrapper>
                </span>
                <span className="text-sm text-gray-600">
                  <TTSWrapper text="people">people</TTSWrapper>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  <TTSWrapper text="4.8">4.8</TTSWrapper>
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -top-8 -left-8 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-60" />
            <div className="hidden lg:block absolute -bottom-12 -right-12 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialHero;
