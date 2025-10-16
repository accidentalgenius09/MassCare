import React from "react";
import Link from "next/link";
import TTSWrapper from "@/hooks/TTSWrapper";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[98%] bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-banner.png')",
          }}
        />
        <div className="absolute inset-0" />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <TTSWrapper
            text="Together, We Create a Community of"
            className="justify-start text-white text-3xl font-normal"
          >
            <div className="justify-start text-white text-3xl font-normal">
              Together, We Create a Community of
            </div>
          </TTSWrapper>

          <TTSWrapper
            text="Care that Changes Lives"
            className="text-white text-4xl md:text-6xl lg:text-5xl font-semibold"
          >
            <h1 className="text-white text-4xl md:text-6xl lg:text-5xl font-semibold">
              Care that Changes Lives
            </h1>
          </TTSWrapper>

          <TTSWrapper
            text="You are not alone whether you are seek care, training or a new career"
            className="text-white text-lg md:text-lg font-extralight mb-10 max-w-2xl mx-auto"
          >
            <p className="text-white text-lg md:text-lg font-extralight mb-10 max-w-2xl mx-auto">
              You are not alone whether you are seek care, training or a new
              career
            </p>
          </TTSWrapper>

          {/* CTA Button */}
          <div
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full 
              border border-white/30 bg-[rgba(212,212,212,0.1)] backdrop-blur-xl 
              text-white text-lg font-medium transition-all"
          >
            <Link href="/opportunities">
              <div className="flex items-center gap-3">
                <TTSWrapper text="Find Opportunities">Find Opportunities</TTSWrapper>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
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
        </div>
      </div>

      {/* Service Cards - Bottom of Background */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
            <button className="group flex items-center bg-[rgba(212,212,212,0.1)] bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md text-white ps-6 pe-3 py-2 rounded-full transition-all border border-white/20">
              <TTSWrapper
                text="MCM Nursing Care Agency"
                className="text-base md:text-lg"
              >
                <span className="text-base md:text-lg">
                  MCM Nursing Care Agency
                </span>
              </TTSWrapper>
              <div className="ml-3 w-8 h-8 flex items-center justify-center bg-[rgba(217,217,217,0.4)] bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
            <button className="group flex items-center bg-[rgba(212,212,212,0.1)] hover:bg-opacity-70 backdrop-blur-md text-white ps-6 pe-3 py-2 rounded-full transition-all border border-white/20">
              <TTSWrapper
                text="Mass Home Care"
                className="text-base md:text-lg"
              >
                <span className="text-base md:text-lg">Mass Home Care</span>
              </TTSWrapper>
              <div className="ml-3 w-8 h-8 flex items-center justify-center bg-[rgba(217,217,217,0.4)] bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
            <button className="group flex items-center bg-[rgba(212,212,212,0.1)] bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md text-white ps-6 pe-3 py-2 rounded-full transition-all border border-white/20 hover:border-white/40">
              <TTSWrapper
                text="Mass Training Academy"
                className="text-base md:text-lg"
              >
                <span className="text-base md:text-lg">
                  Mass Training Academy
                </span>
              </TTSWrapper>
              <div className="ml-3 w-8 h-8 flex items-center justify-center bg-[rgba(217,217,217,0.4)] bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-4 md:right-3 top-[65%] -translate-y-1/2 z-50 flex flex-col gap-3">
        <button className="w-12 h-12 flex items-center justify-center bg-white/30 border border-white/50 rounded-full shadow-lg transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 25 25"
            fill="none"
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
        <button className="w-12 h-12 flex items-center justify-center bg-white/30 border border-white/50 rounded-full shadow-lg transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3425 15.6368C16.8126 15.8534 16.4741 16.683 16.1306 17.1068C15.9546 17.3239 15.7446 17.3578 15.4739 17.249C13.4849 16.4566 11.9602 15.1293 10.8626 13.2989C10.6767 13.0151 10.71 12.7909 10.9342 12.5273C11.2656 12.1368 11.6824 11.6933 11.7721 11.1672C11.9711 10.0034 10.4497 6.39352 8.44049 8.02922C2.65893 12.7405 18.0852 25.2361 20.8693 18.4778C21.6568 16.5621 18.2208 15.277 17.3425 15.6368ZM14 25.5544C11.9553 25.5544 9.94331 25.0108 8.18182 23.9816C7.89909 23.8159 7.55729 23.7721 7.2412 23.858L3.41362 24.9085L4.7469 21.9713C4.92846 21.5715 4.88198 21.1061 4.62549 20.7506C3.19924 18.7737 2.4451 16.4396 2.4451 14C2.4451 7.62836 7.62838 2.44508 14 2.44508C20.3717 2.44508 25.5544 7.62836 25.5544 14C25.5544 20.3711 20.3711 25.5544 14 25.5544ZM14 0C6.28034 0 2.42913e-05 6.28031 2.42913e-05 14C2.42913e-05 16.7158 0.771118 19.3238 2.2362 21.5873L0.109399 26.2713C-0.0869288 26.7039 -0.0152882 27.2103 0.292056 27.5707C0.528306 27.8469 0.870102 28 1.22284 28C2.01143 28 6.31151 26.6487 7.40581 26.3484C9.4287 27.4307 11.6977 28 14 28C21.7192 28 28 21.7191 28 14C28 6.28031 21.7192 0 14 0Z"
              fill="#29D835"
            />
          </svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-white/30 border border-white/50 rounded-full shadow-lg transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 27 22"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.2787 15.7256C25.2787 18.2239 23.2763 20.253 20.8178 20.253H6.18224C3.72373 20.253 1.72126 18.2238 1.72126 15.7256V6.27433C1.72126 5.44051 1.94621 4.65737 2.33667 3.98523L9.47793 11.2329C10.5463 12.3204 11.977 12.9196 13.5015 12.9196C15.0229 12.9196 16.4536 12.3204 17.522 11.2329L24.6633 3.98523C25.0538 4.65737 25.2787 5.44045 25.2787 6.27433V15.7256H25.2787ZM20.8178 1.74692H6.18224C5.16698 1.74692 4.22977 2.09564 3.48005 2.67585L10.6932 9.99965C11.4398 10.7542 12.4363 11.1727 13.5015 11.1727C14.5637 11.1727 15.5602 10.7542 16.3068 9.99965L23.5199 2.67585C22.7702 2.09564 21.8331 1.74692 20.8178 1.74692ZM20.8178 0H6.18224C2.77405 0 0 2.8154 0 6.27439V15.7256C0 19.1878 2.77405 22 6.18224 22H20.8178C24.226 22 27 19.1878 27 15.7256V6.27433C27 2.81534 24.226 0 20.8178 0Z"
              fill="#FF5555"
            />
          </svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-white/30 border border-white/50 rounded-full shadow-lg transition-all">
          <svg
            width="21"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
