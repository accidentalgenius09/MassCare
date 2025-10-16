import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 pb-6 pt-2 md:px-8 lg:px-16">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.85) 100%)'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-mass-care.png"
            alt="Mass Care Logo"
            width={189}
            height={88}
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 font-[500] font-['TT_Hoves',sans-serif]">
          <Link
            href="/"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Home
          </Link>
          <div className="relative group">
            <button className="text-white hover:text-gray-200 transition-colors flex items-center">
              Services
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <Link
            href="/clients"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Clients
          </Link>
          <Link
            href="/career-pathways"
            className="text-white hover:text-gray-200 transition-colors"
          >
            Career Pathways
          </Link>
          <Link
            href="/news"
            className="text-white hover:text-gray-200 transition-colors"
          >
            News
          </Link>
          <Link
            href="/faq"
            className="text-white hover:text-gray-200 transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <Link
            href="/contact"
            className="hidden md:flex items-center bg-neutral-300/10 rounded-[300px] border-1 border-white/50 backdrop-blur-lg px-6 py-3 transition-all"
          >
            <div className="flex items-center gap-3 w-full h-full">
              <div className="justify-start text-white text-sm font-normal">
                Contact
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 11 11"
                fill="none"
              >
                <g clipPath="url(#clip0_699_19244)">
                  <path
                    d="M8.99987 3.41386L1.61201 10.8017L0.19781 9.38752L7.58474 2.00013H0V0H11V11H8.99987V3.41386Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_699_19244">
                    <rect width="11" height="11" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Link>

          {/* Accessibility Icons */}
          <button
            className="w-10 h-10 flex items-center justify-center transition-all"
            style={{
              borderRadius: "300px",
              border: "1px solid rgba(255, 255, 255, 0.50)",
              background: "rgba(212, 212, 212, 0.10)",
              backdropFilter: "blur(17.5px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_726_21864)">
                <path
                  d="M15.8301 1.28777H0.917788C0.348022 1.28777 -0.113892 1.74969 -0.113892 2.31945V3.84527C-0.113892 4.41504 0.348022 4.87695 0.917788 4.87695C1.48755 4.87695 1.94947 4.41504 1.94947 3.84527V3.3507H7.34248V18.8762H6.06115C5.49138 18.8762 5.02947 19.3381 5.02947 19.9079C5.02947 20.4776 5.49138 20.9395 6.06115 20.9395H10.6867C11.2565 20.9395 11.7184 20.4776 11.7184 19.9079C11.7184 19.3381 11.2565 18.8762 10.6867 18.8762H9.40541V3.3507H14.7984V3.84527C14.7984 4.41504 15.2603 4.87695 15.8301 4.87695C16.3999 4.87695 16.8618 4.41504 16.8618 3.84527V2.31945C16.8618 1.74969 16.3999 1.28777 15.8301 1.28777Z"
                  fill="white"
                />
                <path
                  d="M20.8548 9.24602H13.8028C13.233 9.24602 12.7711 9.70793 12.7711 10.2777V10.9991C12.7711 11.5689 13.233 12.0308 13.8028 12.0308C14.2647 12.0308 14.6553 11.7275 14.7868 11.3094H16.2971V18.8766H16.2348C15.6651 18.8766 15.2031 19.3385 15.2031 19.9083C15.2031 20.478 15.6651 20.94 16.2348 20.94H18.4224C18.9921 20.94 19.454 20.478 19.454 19.9083C19.454 19.3385 18.9921 18.8766 18.4224 18.8766H18.3601V11.3094H19.8704C20.0019 11.7275 20.3929 12.0308 20.8544 12.0308C21.4242 12.0308 21.8861 11.5689 21.8861 10.9991V10.2777C21.8861 9.70793 21.4242 9.24602 20.8544 9.24602H20.8548Z"
                  fill="white"
                />
                <path
                  d="M12.7716 10.2777V10.9991C12.7716 11.5689 13.2335 12.0308 13.8033 12.0308C14.2652 12.0308 14.6558 11.7275 14.7873 11.3094H15.4494C15.822 10.6575 16.1352 9.96746 16.3814 9.24644H13.8033C13.2335 9.24644 12.7716 9.70836 12.7716 10.2781V10.2777Z"
                  fill="white"
                />
                <path
                  d="M0.917788 4.87695C1.48755 4.87695 1.94947 4.41504 1.94947 3.84527V3.3507H7.34248V17.1188C8.05447 16.9813 8.74455 16.7814 9.40541 16.5236V3.3507H14.7984V3.84527C14.7984 4.41504 15.2603 4.87695 15.8301 4.87695C16.3999 4.87695 16.8618 4.41504 16.8618 3.84527V3.43922C16.7483 2.74656 16.5752 2.07453 16.3483 1.42742C16.1962 1.33891 16.0192 1.28777 15.8305 1.28777H0.917788C0.348022 1.28777 -0.113892 1.74969 -0.113892 2.31945V3.84527C-0.113892 4.41504 0.348022 4.87695 0.917788 4.87695Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_726_21864">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>{" "}
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center transition-all border-1 border-white/50 bg-[rgba(212,212,212,0.1)] cursor-pointer"
            style={{
              borderRadius: "300px",
              backdropFilter: "blur(17.5px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_726_21837)">
                <path
                  d="M12.76 0.236925C12.523 0.135386 12.2184 0.169233 12.0492 0.338463L4.97534 6.83692H2.2338C1.08304 6.83692 0.169189 7.75077 0.169189 8.90154V13.1323C0.169189 14.2492 1.08304 15.1969 2.2338 15.1969H4.97534L12.0492 21.6615C12.1846 21.7631 12.3538 21.8308 12.523 21.8308C12.6246 21.8308 12.6923 21.7969 12.7938 21.7631C13.0307 21.6615 13.2 21.4246 13.2 21.1538V0.846156C13.1661 0.575386 12.9969 0.338463 12.76 0.236925ZM1.52304 13.0985V8.90154C1.52304 8.49539 1.82765 8.19077 2.2338 8.19077H4.56919V13.8092H2.2338C1.82765 13.8092 1.52304 13.5046 1.52304 13.0985ZM11.8123 19.6308L5.88919 14.2154V7.81846L11.8123 2.36923V19.6308Z"
                  fill="white"
                />
                <path
                  d="M19.2922 4.87385C19.0215 4.60308 18.6153 4.60308 18.3446 4.87385C18.0738 5.14461 18.0738 5.55077 18.3446 5.82154C21.1876 8.66461 21.1876 13.3015 18.3446 16.1446C18.0738 16.4154 18.0738 16.8215 18.3446 17.0923C18.4799 17.2277 18.6492 17.2954 18.8184 17.2954C18.9876 17.2954 19.1569 17.2277 19.2922 17.0923C22.6769 13.7415 22.6769 8.25846 19.2922 4.87385Z"
                  fill="white"
                />
                <path
                  d="M17.3969 6.80308C17.1261 6.53231 16.7199 6.53231 16.4492 6.80308C16.1784 7.07385 16.1784 7.48 16.4492 7.75077C18.243 9.54462 18.243 12.4554 16.4492 14.2492C16.1784 14.52 16.1784 14.9262 16.4492 15.1969C16.5846 15.3323 16.7538 15.4 16.923 15.4C17.0922 15.4 17.2615 15.3323 17.3969 15.1969C19.6984 12.8954 19.6984 9.10462 17.3969 6.80308Z"
                  fill="white"
                />
                <path
                  d="M15.4677 8.69846C15.1969 8.4277 14.7907 8.4277 14.52 8.69846C14.2492 8.96923 14.2492 9.37539 14.52 9.64616C15.2646 10.3908 15.2646 11.5754 14.52 12.32C14.2492 12.5908 14.2492 12.9969 14.52 13.2677C14.6554 13.4031 14.8246 13.4708 14.9938 13.4708C15.163 13.4708 15.3323 13.4031 15.4677 13.2677C16.72 12.0154 16.72 9.98462 15.4677 8.69846Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_726_21837">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden w-10 h-10 flex items-center justify-center bg-[rgba(212,212,212,0.1)] bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
