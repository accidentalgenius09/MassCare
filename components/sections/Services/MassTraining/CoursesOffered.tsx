import React from "react";
import { GreenCheckmark } from "@/components/helpers/svgs";
import Image from "next/image";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";
import TTSWrapper from "@/hooks/TTSWrapper";

const CoursesOffered: React.FC<{
  MCMData: McmNursingCareAgencyServiceDetail;
}> = ({ MCMData }) => {
  return (
    <>
      <div className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-32">
          {/* Courses Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              <TTSWrapper
                text={MCMData?.service_detail_cms?.courses_offered_title}
              >
                {MCMData?.service_detail_cms?.courses_offered_title}
              </TTSWrapper>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MCMData.offered_courses.map((course, index) => (
                <div key={course.id} className="rounded-lg overflow-hidden">
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src={course.image_value}
                      fill
                      alt={course.image_alt_text_value}
                      className="w-full h-full object-cover rounded-2xl"
                      loading={index < 4 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="py-4 w-full sm:w-2/3">
                    <h3 className="text-base sm:text-lg font-medium text-black leading-tight">
                      <TTSWrapper text={course.title}>
                        {course.title}
                      </TTSWrapper>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* Who Can Apply Section */}
      <section className="relative bg-[#E8EFFF]">
        <div className="hidden lg:block absolute top-5 right-5">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="523"
            height="599"
            viewBox="0 0 523 599"
            fill="none"
          >
            <path
              d="M332.27 404.261C345.191 409.799 365.497 427.153 365.497 454.102C365.497 487.329 359.959 498.405 348.884 526.094C340.404 547.294 310.118 581.472 310.118 587.01C310.118 591.44 302.735 596.239 299.043 598.085C278.738 587.009 238.127 552.675 238.127 503.942C238.127 455.21 267.662 439.334 282.43 437.488C278.738 446.718 271.354 466.284 271.354 470.715C271.354 476.253 260.278 515.017 271.354 531.631C280.213 544.921 286.12 551.936 287.967 553.782L299.043 537.169V454.102C302.735 437.488 314.549 404.261 332.27 404.261ZM420.875 326.731C431.951 315.656 443.026 304.581 459.64 310.118C476.253 315.656 492.866 332.269 498.404 343.345C502.835 352.205 515.018 380.264 520.556 393.186C522.402 398.723 524.986 410.907 520.556 415.337C515.017 420.875 487.329 443.026 465.178 443.026C443.026 443.026 387.648 443.026 376.572 415.337C365.497 387.648 359.959 365.497 359.959 359.959V343.345C369.189 358.112 390.971 388.755 404.262 393.186C420.875 398.723 443.026 415.336 476.253 404.261C502.834 395.4 479.945 385.802 465.178 382.11L420.875 371.034L382.11 343.345C391.34 341.499 412.015 335.592 420.875 326.731ZM177.21 204.899C194.931 204.899 210.437 208.592 215.975 210.438L221.513 215.976C210.437 217.822 186.071 222.621 177.21 227.051C166.134 232.589 160.596 243.665 166.134 254.74C170.564 263.601 190.132 254.74 199.361 249.202C204.899 247.356 217.083 242.557 221.513 238.127C227.051 232.589 249.201 232.588 243.663 243.664C238.125 254.74 221.512 271.354 227.05 276.892C232.588 282.429 232.588 293.505 238.126 293.505C243.664 293.505 249.202 287.967 254.739 293.505L271.353 310.118C275.783 314.548 284.274 311.964 287.966 310.118C291.658 304.58 297.934 292.397 293.504 287.967C289.074 283.536 280.583 263.97 276.891 254.74L282.429 243.664L287.966 249.202C289.812 254.74 294.612 268.031 299.042 276.892C304.58 287.968 332.268 326.732 332.269 332.27C332.269 337.807 337.807 354.421 321.193 371.034L293.504 398.724C287.966 404.261 254.739 415.337 249.201 404.262C243.663 393.186 238.126 376.572 232.588 371.034C227.05 365.496 215.974 359.959 210.437 365.496C204.899 371.034 182.747 365.497 182.747 337.808C182.747 315.656 190.131 306.426 193.823 304.58L221.513 271.354C223.359 265.816 225.942 254.741 221.513 254.74C215.975 254.74 204.899 254.74 199.361 265.815C194.931 274.676 179.056 302.735 171.672 315.656C162.442 326.732 142.877 347.774 138.445 343.346C132.907 337.808 127.369 332.269 127.369 326.731C127.369 321.194 121.832 315.657 116.294 315.656C110.756 315.656 99.6805 321.194 94.1426 315.656C88.6048 310.118 83.0667 299.043 88.6045 293.505C93.0348 289.075 94.1426 284.275 94.1426 282.429C94.1427 269.507 97.4652 241.449 110.756 232.589C127.369 221.513 155.059 204.899 177.21 204.899ZM387.648 127.37C409.8 127.37 437.49 121.832 443.027 138.445C447.458 151.736 452.257 162.443 454.103 166.135C461.486 169.827 476.254 178.318 476.254 182.748C476.254 188.286 481.792 243.664 459.641 249.202C437.489 254.74 415.338 271.353 415.338 287.967C415.338 304.58 382.111 326.731 365.497 321.193C348.883 315.655 310.119 276.891 304.581 260.277C299.043 243.664 287.968 221.513 299.044 221.513C307.904 221.513 313.811 232.588 315.657 238.126C324.887 249.202 345.561 268.03 354.422 254.74C363.282 241.45 358.114 234.435 354.422 232.589C354.422 227.051 355.53 217.082 359.96 221.513C365.498 227.05 382.111 232.588 393.187 227.051C404.262 221.513 398.724 204.899 393.187 199.361C388.756 194.931 372.881 193.823 365.497 193.823C367.343 186.439 368.82 171.673 359.96 171.673C351.099 171.673 326.733 182.748 315.657 188.286C311.965 188.248 305.689 187.086 310.119 182.748C328.578 164.289 369.927 127.371 387.648 127.37ZM105.219 132.908C100.789 124.048 114.448 125.524 121.832 127.37V143.983L127.37 155.06H199.361C210.437 155.06 249.202 171.672 265.815 182.748C279.106 191.609 271.353 204.9 265.815 210.438C261.385 214.868 256.586 215.975 254.74 215.976L238.127 204.899L171.673 171.673C160.598 169.827 137.339 166.135 132.908 166.135C128.478 166.135 116.295 169.827 110.757 171.673V182.748C110.757 186.44 109.649 193.824 105.219 193.824C99.6809 193.824 99.6803 193.824 94.1426 188.286C88.6054 182.749 94.143 182.748 99.6807 177.211L105.219 171.673C105.219 169.827 104.111 166.135 99.6807 166.135C94.1431 166.135 94.143 171.673 88.6055 171.673H83.0674V193.824C83.0674 199.362 83.0671 199.362 77.5293 199.362H66.4541C60.9163 199.362 66.4544 188.286 71.9922 188.286C77.5292 188.286 71.9921 182.748 77.5293 182.748C81.9594 182.748 75.6841 179.057 71.9922 177.211H60.916L49.8408 182.748C47.9949 184.594 44.3027 189.394 44.3027 193.824V199.362C46.1487 203.054 49.8408 211.545 49.8408 215.976C49.8408 221.513 49.8402 221.514 38.7646 221.514C33.2271 221.514 33.2269 215.976 27.6895 215.976H11.0752C5.5382 215.975 11.0754 210.437 5.53809 199.362C1.10782 194.932 0 186.44 0 182.748H5.53809L11.0752 177.211V160.597C11.0756 151.737 22.1517 153.214 27.6895 155.06V177.211H49.8408C54.2709 177.211 59.0701 173.519 60.916 171.673V166.135C60.9159 164.289 59.808 160.597 55.3779 160.597C49.8405 160.597 49.8408 160.597 49.8408 155.06C49.8408 149.522 49.8401 149.521 55.3779 143.983C59.8082 139.553 60.916 145.83 60.916 149.521C62.762 149.521 66.4541 150.629 66.4541 155.06C66.4544 159.49 73.8374 164.289 77.5293 166.135L83.0674 160.597H94.1426L88.6055 155.06C86.7595 155.06 81.9596 152.844 77.5293 143.983C73.0994 135.123 83.0677 132.908 88.6055 132.908L94.1426 143.983L99.6807 155.06L110.757 160.597L116.294 155.06C116.294 151.368 114.079 141.769 105.219 132.908ZM382.11 0C398.724 0 404.262 22.1509 404.262 33.2266C404.262 44.3022 409.8 55.3779 420.876 55.3779C431.951 55.3789 426.413 94.1432 409.8 105.219C393.186 116.294 359.959 132.908 348.884 138.445C337.808 143.983 315.657 171.672 304.581 177.21C295.721 181.64 300.889 167.98 304.581 160.597C308.932 149.521 343.346 105.219 348.884 99.6807C354.421 94.143 343.347 88.6048 337.809 88.6045C332.271 88.6045 321.195 99.6809 315.657 105.219C310.119 110.757 310.119 105.218 304.581 99.6807C299.043 94.1428 287.968 99.6809 282.43 105.219C276.892 110.758 282.429 160.596 276.892 155.059C271.354 149.519 265.816 88.6044 265.816 71.9912C265.817 55.3779 282.43 49.84 287.968 33.2266C293.506 16.6131 315.657 16.6135 326.732 22.1514C337.808 27.6891 337.808 27.6888 348.884 16.6133C359.959 5.53772 365.497 9.32484e-05 382.11 0ZM177.211 5.53809C182.749 5.5386 204.9 16.6142 210.438 16.6143C215.975 16.6143 210.438 11.0764 232.589 16.6143C254.74 22.1522 249.202 60.9168 249.202 77.5303C249.202 90.8213 256.586 127.371 260.278 143.984V149.521L254.74 143.984C245.511 127.371 225.943 91.9279 221.513 83.0674C215.975 71.9923 204.9 71.9925 193.824 77.5303C182.749 83.0681 199.362 110.757 210.438 121.833C219.298 130.694 232.589 147.676 238.127 155.06C236.281 153.214 230.373 149.521 221.513 149.521C210.436 149.521 166.135 132.909 149.521 121.833C132.908 110.758 127.37 83.0688 127.37 77.5303C127.37 71.9925 138.445 60.9168 143.983 55.3789C149.521 49.8411 143.983 44.3029 143.983 27.6895C143.983 11.076 171.673 5.53809 177.211 5.53809Z"
              fill="#D9E2F8"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-32">
          <div className="grid lg:grid-cols-2 items-start gap-8 lg:gap-0">
            {/* Left Column - Requirements */}
            <div className="bg-[#F5F8FF] p-6 sm:p-8 max-w-lg mx-auto lg:mx-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                <TTSWrapper
                  text={MCMData?.service_detail_cms?.who_can_apply_title}
                >
                  {MCMData?.service_detail_cms?.who_can_apply_title}
                </TTSWrapper>
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {MCMData?.who_can_applies?.map((req, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center">
                        <GreenCheckmark />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl sm:text-2xl text-black mb-1">
                        <TTSWrapper text={req.title}>{req.title}</TTSWrapper>
                      </h3>
                      <p className="text-sm text-black leading-relaxed">
                        <TTSWrapper text={req.subtitle}>
                          {req.subtitle}
                        </TTSWrapper>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Images and Tagline */}
            <div className="hidden lg:block relative h-full">
              {/* Desktop Images */}
              <div className="overflow-hidden lg:-ms-30">
                <Image
                  src={MCMData?.service_detail_cms?.apply_section_img_one_value}
                  width={350}
                  height={400}
                  alt={
                    MCMData?.service_detail_cms
                      ?.apply_section_img_one_alt_text_value
                  }
                  className="object-cover"
                  loading="lazy"
                  sizes="350px"
                />
              </div>
              <div className="lg:-ms-32 lg:absolute lg:mt-20">
                <Image
                  src="/services/MassHomeCare-Typo.png"
                  width={300}
                  height={300}
                  alt="Care is Home"
                  className="object-cover"
                  loading="lazy"
                  sizes="300px"
                />
              </div>
              <div className="overflow-hidden lg:ms-72 lg:-mt-65">
                <Image
                  src={MCMData?.service_detail_cms?.apply_section_img_two_value}
                  width={400}
                  height={500}
                  alt={
                    MCMData?.service_detail_cms
                      ?.apply_section_img_two_alt_text_value
                  }
                  className="object-cover"
                  loading="lazy"
                  sizes="400px"
                />
              </div>
            </div>

            {/* Mobile Images */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={MCMData?.service_detail_cms?.apply_section_img_one_value}
                  width={350}
                  height={400}
                  alt={
                    MCMData?.service_detail_cms
                      ?.apply_section_img_one_alt_text_value
                  }
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={MCMData?.service_detail_cms?.apply_section_img_two_value}
                  width={400}
                  height={500}
                  alt={
                    MCMData?.service_detail_cms
                      ?.apply_section_img_two_alt_text_value
                  }
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-center">
                <Image
                  src="/services/MassHomeCare-Typo.png"
                  width={250}
                  height={250}
                  alt="Care is Home"
                  className="object-cover"
                  loading="lazy"
                  sizes="250px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesOffered;
