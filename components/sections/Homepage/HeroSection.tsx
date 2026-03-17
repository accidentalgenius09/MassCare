"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TTSWrapper from "@/hooks/TTSWrapper";
import { HomeData } from "@/types/Home.type";
import restApiWrapper from "@/service/RestApiWrapper";
import { FooterData } from "@/types/Footer.type";
import Image from "next/image";
import { usePathname } from "next/navigation";

const HeroSection = ({ homeData }: { homeData: HomeData }) => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const clickedButtonRef = useRef<boolean>(false);
  const lastProcessedClickRef = useRef<number | null>(null);

  // Find default slider (is_default === 1)
  const defaultSlider = homeData?.sliders?.find(
    (slider) => slider.is_default === 1
  );

  // Find slider by service ID when button is clicked
  const getSliderByServiceId = (serviceId: number | null) => {
    if (!serviceId) return defaultSlider;
    return homeData?.sliders?.find(
      (slider) => slider.service?.id === serviceId
    );
  };

  // Get current slider based on active button
  const currentSlider = activeButton
    ? getSliderByServiceId(activeButton)
    : defaultSlider;

  // Reset activeButton when pathname changes to home page
  useEffect(() => {
    if (pathname === "/") {
      setActiveButton(null);
    }
  }, [pathname]);

  // Listen for logo click event to reset state
  useEffect(() => {
    const handleLogoClick = () => {
      if (pathname === "/") {
        setActiveButton(null);
      }
    };

    // Listen for custom event from Header
    window.addEventListener("logo-click", handleLogoClick);
    return () => {
      window.removeEventListener("logo-click", handleLogoClick);
    };
  }, [pathname]);

  // Preload critical images
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadImage = (src: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    };

    // Preload default slider images
    if (defaultSlider?.image_value) {
      preloadImage(defaultSlider.image_value);
    }
    if (defaultSlider?.image_mobile_value) {
      preloadImage(defaultSlider.image_mobile_value);
    }

    // Fallback to default hero image
    if (!defaultSlider?.image_value) {
      preloadImage("/hero-banner.png");
    }
  }, [defaultSlider]);

  // Get all unique services from sliders for buttons
  const serviceSliders =
    homeData?.sliders?.filter((slider) => slider.service !== null) || [];

  const hasMoreThanThreeServices = serviceSliders.length > 3;
  const hasThreeServices = serviceSliders.length === 3;

  // Handle button click - always allow switching between buttons
  const handleButtonClick = (serviceId: number) => {
    // Always process the click - if clicking the active button, set to null to show default slider
    // Otherwise, switch to the clicked button (allows switching between buttons)
    setActiveButton((prev) => {
      // If clicking the active button, show default slider
      if (prev === serviceId) {
        return null;
      }
      // Otherwise, switch to the clicked button
      return serviceId;
    });
  };

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasMoreThanThreeServices || !scrollContainerRef.current) return;
    // Don't start dragging if clicking on a button
    const target = e.target as HTMLElement;
    const button = target.closest("button");
    if (button) {
      e.stopPropagation();
      // Reset all drag state when clicking buttons to allow subsequent clicks
      clickedButtonRef.current = true;
      setIsDragging(false);
      return;
    }
    // Only start dragging if not clicking a button
    clickedButtonRef.current = false;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMoreThanThreeServices || !scrollContainerRef.current) return;
    // Don't start dragging if touching on a button
    const target = e.target as HTMLElement;
    if (target.closest("button")) {
      clickedButtonRef.current = true;
      setIsDragging(false);
      return;
    }
    clickedButtonRef.current = false;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasMoreThanThreeServices || !scrollContainerRef.current) return;
    // Don't drag if clicking on a button - check both target and if button was clicked
    const target = e.target as HTMLElement;
    const button = target.closest("button");
    if (button || clickedButtonRef.current) {
      // Reset drag state when over buttons to allow clicks
      setIsDragging(false);
      // Don't prevent default when over buttons - let clicks work
      return;
    }
    // Only prevent default and drag if we're actually dragging
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMoreThanThreeServices || !scrollContainerRef.current) return;
    // If we clicked a button, don't drag
    if (clickedButtonRef.current) {
      setIsDragging(false);
      return;
    }
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    // Don't interfere if clicking on a button
    if (e) {
      const target = e.target as HTMLElement;
      if (target.closest("button")) {
        // Reset drag state when clicking buttons to allow subsequent clicks
        setIsDragging(false);
        clickedButtonRef.current = false;
        return; // Let the button handle its own click
      }
    }
    setIsDragging(false);
    // Reset button click tracking immediately to allow rapid button switching
    clickedButtonRef.current = false;
  };

  const [footerData, setFooterData] = useState<FooterData | null>(null);
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const siteSettings = await restApiWrapper.get("/site-settings");
        setFooterData(siteSettings.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const desktopImage = currentSlider?.image_value || "/hero-banner.png";
  const mobileImage = currentSlider?.image_mobile_value || "/hero-banner.png";

  console.log(currentSlider?.is_default);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Image */}
        <div className="hidden md:block w-full h-[98%] relative">
          <Image
            src={desktopImage}
            alt="Hero Banner"
            fill
            priority
            className="object-cover transition-opacity duration-500 ease-in-out"
            sizes="100vw"
            quality={85}
          />
        </div>
        {/* Mobile Background Image */}
        <div className="block md:hidden w-full h-[98%] relative">
          <Image
            src={mobileImage}
            alt="Hero Banner"
            fill
            priority
            className="object-cover transition-opacity duration-500 ease-in-out"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="absolute inset-0" />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <TTSWrapper
            text={currentSlider?.pre_title || ""}
            className="justify-start text-white text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-extralight"
          >
            <div className="justify-start text-white text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-extralight transition-all duration-500">
              {currentSlider?.pre_title || ""}
            </div>
          </TTSWrapper>
          {currentSlider?.is_default === 0 && (
            <div className="my-4 flex justify-center">
              <Image
                width={1000}
                height={1000}
                loading="lazy"
                src={"/bigLogo.png"}
                alt={"Hero Banner"}
                className="w-auto h-auto max-w-[700px] sm:max-w-[700px] md:max-w-[700px] object-contain"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          )}
          <TTSWrapper text={currentSlider?.title || ""}>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold transition-all duration-500">
              {currentSlider?.title || ""}
            </h1>
          </TTSWrapper>

          <TTSWrapper text={currentSlider?.description || ""}>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal mb-6 sm:mb-8 md:mb-10 mx-auto mt-2 px-4 transition-all duration-500">
              {currentSlider?.description || ""}
            </p>
          </TTSWrapper>

          {/* CTA Button */}
          {currentSlider?.action_url && (
            <div
              className="inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full 
                border border-white/20 bg-[rgba(212,212,212,0.1)] backdrop-blur-xl 
                text-white text-sm sm:text-base md:text-lg font-medium transition-all"
            >
              <Link href={currentSlider.action_url}>
                <div className="flex items-center text-sm sm:text-base gap-2 sm:gap-3 font-light">
                  <TTSWrapper text={currentSlider.action_title || ""}>
                    {currentSlider.action_title || ""}
                  </TTSWrapper>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      className="w-2 h-2 sm:w-3 sm:h-3"
                    >
                      <path
                        d="M8.99987 3.41386L1.61201 10.8017L0.19781 9.38752L7.58474 2.00013H0V0H11V11H8.99987V3.41386Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Service Cards - Bottom of Background */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 z-1 px-1">
        <div className="max-w-full mx-auto">
          <div
            ref={scrollContainerRef}
            onMouseDown={hasMoreThanThreeServices ? handleMouseDown : undefined}
            onMouseMove={hasMoreThanThreeServices ? handleMouseMove : undefined}
            onMouseUp={hasMoreThanThreeServices ? (e) => handleMouseUp(e) : undefined}
            onMouseLeave={hasMoreThanThreeServices ? () => handleMouseUp() : undefined}
            onTouchStart={hasMoreThanThreeServices ? handleTouchStart : undefined}
            onTouchMove={hasMoreThanThreeServices ? handleTouchMove : undefined}
            onTouchEnd={hasMoreThanThreeServices ? () => handleMouseUp() : undefined}
            className={`flex items-center ${
              hasMoreThanThreeServices ? "justify-start" : "justify-center"
            } ${
              hasThreeServices ? "lg:justify-center justify-start" : ""
            } gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-2 sm:px-4 ${
              hasMoreThanThreeServices
                ? "cursor-grab active:cursor-grabbing"
                : ""
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {serviceSliders.map((slider) => {
              if (!slider.service) return null;
              const serviceId = slider.service.id;
              const isActive = activeButton === serviceId;

              return (
                <button
                  key={slider.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    clickedButtonRef.current = true;
                    setIsDragging(false);
                    // Process click immediately on mousedown to bypass any drag interference
                    if (lastProcessedClickRef.current !== serviceId) {
                      lastProcessedClickRef.current = serviceId;
                      handleButtonClick(serviceId);
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    // Only process if not already handled in onMouseDown
                    if (lastProcessedClickRef.current !== serviceId) {
                      clickedButtonRef.current = false;
                      setIsDragging(false);
                      lastProcessedClickRef.current = serviceId;
                      handleButtonClick(serviceId);
                    }
                    // Reset after a delay to allow subsequent clicks
                    setTimeout(() => {
                      lastProcessedClickRef.current = null;
                    }, 50);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    clickedButtonRef.current = true;
                    setIsDragging(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Always allow button clicks, even when switching between buttons
                    clickedButtonRef.current = false;
                    setIsDragging(false);
                    handleButtonClick(serviceId);
                  }}
                  style={{ pointerEvents: "auto", position: "relative", zIndex: 20, touchAction: "manipulation" }}
                  className="group flex items-center bg-[rgba(212,212,212,0.1)] hover:bg-opacity-20 backdrop-blur-md text-white ps-3 sm:ps-4 md:ps-6 pe-2 sm:pe-3 py-2 rounded-full transition-all duration-500 border border-white/30 cursor-pointer flex-shrink-0 select-none"
                >
                  <TTSWrapper text={slider.service.title}>
                    <span className="text-lg font-light whitespace-nowrap">
                      {slider.service.title}
                    </span>
                  </TTSWrapper>
                  <div
                    className={`ml-2 sm:ml-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal ${
                      isActive
                        ? "bg-blue-500"
                        : "bg-[rgba(217,217,217,0.4)] bg-opacity-20 group-hover:bg-opacity-30"
                    }`}
                  >
                    +
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-2 sm:right-4 md:right-6 top-[65%] -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3 max-w-[60px] sm:max-w-[70px] md:max-w-[80px]">
        <button
          onClick={() =>
            window.open(footerData?.site_settings?.map_link || "", "_blank")
          }
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-15 flex items-center justify-center bg-[#ffffff4d] border border-white/50 rounded-full shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            className="sm:w-6 sm:h-6 md:w-[25px] md:h-[25px]"
          >
            <g clipPath="url(#clip0_673_5575)">
              <path
                d="M8.83868 20.1501L12.5 25V15.286L8.83868 20.1501Z"
                fill="#31AA52"
              />
              <path
                d="M12.5 15.286L15.3284 11.5284L12.5 9.39941L9.57031 12.3427L12.5 15.286Z"
                fill="#F69411"
              />
              <path
                d="M12.5 0L9.57031 3.22114L12.5 6.44229L14.9091 0.312158C14.1401 0.108838 13.3328 0 12.5 0Z"
                fill="#4175DF"
              />
              <path
                d="M12.5 3.51263L9.67151 7.27035L12.5 9.3994V3.51263Z"
                fill="#609AF6"
              />
              <path
                d="M9.57031 9.39941L12.5 15.286L15.3284 11.5284L9.57031 9.39941Z"
                fill="#F8A808"
              />
              <path
                d="M20.5655 4.57086L9.57031 7.50055L12.5 25L20.0058 15.0576C21.1943 13.4834 21.8994 11.5239 21.8994 9.39943C21.8994 7.6338 21.4122 5.98219 20.5655 4.57086Z"
                fill="#0F9D58"
              />
              <path
                d="M4.99011 3.74658V9.39941H12.5V0C9.43084 0 6.70559 1.47119 4.99011 3.74658Z"
                fill="#4086F4"
              />
              <path
                d="M4.99014 3.74658C3.80405 5.31982 3.10059 7.27739 3.10059 9.39941C3.10059 11.1649 3.58794 12.8164 4.43467 14.2275L11.1363 8.37295L4.99014 3.74658Z"
                fill="#EB4132"
              />
              <path
                d="M14.9091 0.312134L12.5 3.51262L8.95996 11.5284H15.3284L20.5655 4.57087C19.3221 2.49841 17.3028 0.945044 14.9091 0.312134Z"
                fill="#4086F4"
              />
              <path
                d="M9.67151 7.27039L4.43469 14.2276C4.60681 14.5144 4.79343 14.7916 4.99426 15.0575L8.8387 20.1501L12.5 15.286V9.39944L9.67151 7.27039Z"
                fill="#FBBD00"
              />
              <path
                d="M12.5 5.85938L10.73 9.39941L12.5 12.9395C14.4551 12.9395 16.04 11.3545 16.04 9.39941C16.04 7.44429 14.4551 5.85938 12.5 5.85938Z"
                fill="#E3E7EA"
              />
              <path
                d="M8.95996 9.39941C8.95996 11.3545 10.5449 12.9395 12.5 12.9395V5.85938C10.5449 5.85938 8.95996 7.44429 8.95996 9.39941Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_673_5575">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          onClick={() =>
            window.open(
              `https://wa.me/${footerData?.site_settings?.whatsapp_number}`,
              "_blank"
            )
          }
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-15 flex items-center justify-center bg-[#ffffff4d] border border-white/50 rounded-full shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            className="sm:w-7 sm:h-7 md:w-[28px] md:h-[28px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3425 15.6368C16.8126 15.8534 16.4741 16.683 16.1306 17.1068C15.9546 17.3239 15.7446 17.3578 15.4739 17.249C13.4849 16.4566 11.9602 15.1293 10.8626 13.2989C10.6767 13.0151 10.71 12.7909 10.9342 12.5273C11.2656 12.1368 11.6824 11.6933 11.7721 11.1672C11.9711 10.0034 10.4497 6.39352 8.44049 8.02922C2.65893 12.7405 18.0852 25.2361 20.8693 18.4778C21.6568 16.5621 18.2208 15.277 17.3425 15.6368ZM14 25.5544C11.9553 25.5544 9.94331 25.0108 8.18182 23.9816C7.89909 23.8159 7.55729 23.7721 7.2412 23.858L3.41362 24.9085L4.7469 21.9713C4.92846 21.5715 4.88198 21.1061 4.62549 20.7506C3.19924 18.7737 2.4451 16.4396 2.4451 14C2.4451 7.62836 7.62838 2.44508 14 2.44508C20.3717 2.44508 25.5544 7.62836 25.5544 14C25.5544 20.3711 20.3711 25.5544 14 25.5544ZM14 0C6.28034 0 2.42913e-05 6.28031 2.42913e-05 14C2.42913e-05 16.7158 0.771118 19.3238 2.2362 21.5873L0.109399 26.2713C-0.0869288 26.7039 -0.0152882 27.2103 0.292056 27.5707C0.528306 27.8469 0.870102 28 1.22284 28C2.01143 28 6.31151 26.6487 7.40581 26.3484C9.4287 27.4307 11.6977 28 14 28C21.7192 28 28 21.7191 28 14C28 6.28031 21.7192 0 14 0Z"
              fill="#29D835"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            window.location.href = `mailto:${footerData?.site_settings?.email}`;
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-15 flex items-center justify-center bg-[#ffffff4d] border border-white/50 rounded-full shadow-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="17"
            viewBox="0 0 27 22"
            fill="none"
            className="sm:w-6 sm:h-5 md:w-[27px] md:h-[22px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.2787 15.7256C25.2787 18.2239 23.2763 20.253 20.8178 20.253H6.18224C3.72373 20.253 1.72126 18.2238 1.72126 15.7256V6.27433C1.72126 5.44051 1.94621 4.65737 2.33667 3.98523L9.47793 11.2329C10.5463 12.3204 11.977 12.9196 13.5015 12.9196C15.0229 12.9196 16.4536 12.3204 17.522 11.2329L24.6633 3.98523C25.0538 4.65737 25.2787 5.44045 25.2787 6.27433V15.7256H25.2787ZM20.8178 1.74692H6.18224C5.16698 1.74692 4.22977 2.09564 3.48005 2.67585L10.6932 9.99965C11.4398 10.7542 12.4363 11.1727 13.5015 11.1727C14.5637 11.1727 15.5602 10.7542 16.3068 9.99965L23.5199 2.67585C22.7702 2.09564 21.8331 1.74692 20.8178 1.74692ZM20.8178 0H6.18224C2.77405 0 0 2.8154 0 6.27439V15.7256C0 19.1878 2.77405 22 6.18224 22H20.8178C24.226 22 27 19.1878 27 15.7256V6.27433C27 2.81534 24.226 0 20.8178 0Z"
              fill="#FF5555"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            window.location.href = `tel:${footerData?.site_settings?.phone_number}`;
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-15 flex items-center justify-center bg-[#ffffff4d] border border-white/50 rounded-full shadow-lg cursor-pointer"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-6 sm:h-6 md:w-[27px] md:h-[27px]"
          >
            <path
              d="M22.5448 17.52C21.8892 16.9703 18.0448 14.5358 17.4058 14.6475C17.1058 14.7008 16.8763 14.9565 16.262 15.6893C15.9779 16.0499 15.666 16.3877 15.329 16.6995C14.7116 16.5504 14.114 16.3288 13.5485 16.0395C11.331 14.9599 9.53947 13.1679 8.4605 10.95C8.17118 10.3846 7.94964 9.78691 7.8005 9.1695C8.1123 8.83252 8.45009 8.52056 8.81075 8.2365C9.54275 7.62225 9.79925 7.39425 9.8525 7.09275C9.96425 6.45225 7.5275 2.60925 6.98 1.95375C6.7505 1.68225 6.542 1.5 6.275 1.5C5.501 1.5 2 5.829 2 6.39C2 6.43575 2.075 10.9425 7.76675 16.7333C13.5575 22.425 18.0642 22.5 18.11 22.5C18.671 22.5 23 18.999 23 18.225C23 17.958 22.8177 17.7495 22.5448 17.52Z"
              fill="#29D835"
            />
            <path
              d="M17.5 11.5H19C18.9982 9.90925 18.3655 8.38416 17.2407 7.25933C16.1158 6.1345 14.5908 5.50179 13 5.5V7C14.1931 7.00119 15.337 7.47568 16.1807 8.31933C17.0243 9.16299 17.4988 10.3069 17.5 11.5Z"
              fill="#29D835"
            />
            <path
              d="M21.4615 11.5H23C22.9969 8.84877 21.9424 6.30701 20.0677 4.43231C18.193 2.5576 15.6512 1.50305 13 1.5V3.03846C15.2433 3.04111 17.394 3.93344 18.9803 5.51971C20.5666 7.10599 21.4589 9.25667 21.4615 11.5Z"
              fill="#29D835"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
