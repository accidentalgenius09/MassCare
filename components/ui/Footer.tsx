"use client";

import Image from "next/image";
import LocationCard from "./FooterLogo";
import Newsletter from "./NewsletterSubscription";
import {
  FacebookIconFooter,
  InstagramIconFooter,
  LinkedInIconFooter,
  YoutubeIconFooter,
} from "../helpers/svgs";
import { XIconFooter } from "../helpers/svgs";

export default function Footer() {
  return (
    <footer
      style={{ background: "#012367" }}
      className="text-white px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="py-8 sm:py-10 md:py-12 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-2">
            {/* Quick Links */}
            <div>
              <h3 className="font-medium text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 text-sm sm:text-base font-light">
                <li>
                  <a href="" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/career-opportunities" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Policies</h3>
              <ul className="space-y-2 text-sm sm:text-base font-light">
                <li>
                  <a href="/environment-policies" className="hover:underline">
                    Carbon Reduction
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="hover:underline">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Contact</h3>
              <div className="text-sm sm:text-base font-light space-y-3">
                <p>
                  <span className="block text-sm">Phone</span>
                  <a href="tel:01823216575" className="hover:underline">
                    01823 216575
                  </a>
                </p>
                <p>
                  <span className="block text-sm">Email</span>
                  <a href="mailto:masscare@info.in" className="hover:underline">
                    masscare@info.in
                  </a>
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex items-center space-x-4 sm:space-x-6 mb-3 sm:mb-4">
                <a href="#" className="hover:text-blue-300">
                  <FacebookIconFooter />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <YoutubeIconFooter />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <InstagramIconFooter />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <LinkedInIconFooter />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <XIconFooter />
                </a>
              </div>
              {/* Example CQC image */}
              <div className="relative w-20 sm:w-24 md:w-28 h-14 sm:h-16 md:h-20">
                <Image
                  src="/Rectangle.png"
                  alt="CQC"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
            {/* Accreditations */}
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Accreditations</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 max-w-2xl">
                <div className="relative w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-white px-8 sm:px-12 md:px-16 rounded-lg">
                  <Image
                    src="/logos/careQC.png"
                    alt="Care Quality Commission"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-white px-8 sm:px-12 md:px-16 rounded-lg">
                  <Image
                    src="/logos/cpd.png"
                    alt="CPD"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-white px-8 sm:px-12 md:px-16 rounded-lg">
                  <Image
                    src="/logos/skillsforcare.png"
                    alt="Accreditation 2"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 bg-white px-8 sm:px-12 md:px-16 rounded-lg">
                  <Image
                    src="/logos/dbs.png"
                    alt="DBS"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Newsletter */}
            <div className="lg:flex-shrink-0">
              <p className="mt-2 sm:mt-4 text-transparent">ffdffd</p>
              <Newsletter />
            </div>
          </div>
        </div>
        <div
          className="flex justify-end mx-4 sm:mx-6 md:mx-8 lg:mx-10 w-full lg:w-1/4"
          style={{
            background: "linear-gradient(180deg, #083082 0%, #012367 100%)",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <LocationCard
            companyName="Mass Care Home"
            logoSrc="/logo-white.png"
            address="Unit A, Acorn Business Centre, Livingstone Way, Taunton, Somerset, United Kingdom, TA2 6BD"
            googleMapsUrl="https://www.google.com/maps/place/Your+Location"
          />
        </div>
      </div>
      <div className="border-t border-white/10 py-4 sm:py-6 text-center text-xs sm:text-sm">
        Copyright © {new Date().getFullYear()}{" "}
        <span className="font-medium">Mass Care Home</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
}
