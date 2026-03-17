"use client";

import Image from "next/image";
import LocationCard from "./FooterLogo";
import Newsletter from "./NewsletterSubscription";
import {
  FacebookIconFooter,
  InstagramIconFooter,
  LinkedInIconFooter,
  XIconFooter,
  YoutubeIconFooter,
} from "../helpers/svgs";
import Link from "next/link";
import { useEffect, useState } from "react";
import restApiWrapper from "@/service/RestApiWrapper";
import { FooterData, Policy } from "@/types/Footer.type";

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData>();
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

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
  return (
    <footer
      style={{ background: "#012367" }}
      className="text-white px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="flex flex-col min-[1176px]:flex-row">
        <div className="py-8 sm:py-10 md:py-12 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 pb-2 pt-6">
            {/* Quick Links */}
            <div>
              <button
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className={`lg:pointer-events-none w-full flex items-center justify-between lg:justify-start font-medium text-base sm:text-lg transition-all duration-300 ${
                  isQuickLinksOpen ? "mb-4 sm:mb-6" : "mb-0 lg:mb-4"
                }`}
              >
                <h3 className="font-semibold text-base sm:text-lg">Quick Links</h3>
                <svg
                  className={`lg:hidden w-5 h-5 transition-transform duration-300 ${
                    isQuickLinksOpen ? "rotate-180" : ""
                  }`}
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
              <ul
                className={`space-y-2 text-sm sm:text-base font-light transition-all duration-300 ${
                  isQuickLinksOpen
                    ? "block"
                    : "hidden lg:block"
                }`}
              >
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-opportunities"
                    className="hover:underline"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <button
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                className={`lg:pointer-events-none w-full flex items-center justify-between lg:justify-start font-semibold text-base sm:text-lg transition-all duration-300 ${
                  isPoliciesOpen ? "mb-4 sm:mb-6" : "mb-0 lg:mb-4"
                }`}
              >
                <h3 className="font-semibold text-base sm:text-lg">Policies</h3>
                <svg
                  className={`lg:hidden w-5 h-5 transition-transform duration-300 ${
                    isPoliciesOpen ? "rotate-180" : ""
                  }`}
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
              <ul
                className={`space-y-2 text-sm sm:text-base font-light transition-all duration-300 ${
                  isPoliciesOpen
                    ? "block"
                    : "hidden lg:block"
                }`}
              >
                {footerData?.policies?.map((policy: Policy) => (
                  <li key={policy.id}>
                    <Link
                      href={
                        policy.slug.startsWith("/")
                          ? policy.slug
                          : `/${policy.slug}`
                      }
                      className="hover:underline"
                    >
                      {policy.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                Contact
              </h3>
              <div className="text-sm sm:text-base font-light space-y-3">
                <p>
                  <span className="block text-sm">Phone</span>
                  <Link href={`tel:${footerData?.site_settings?.phone_number}`} className="hover:underline">
                    {footerData?.site_settings?.phone_number}
                  </Link>
                </p>
                <p>
                  <span className="block text-sm">Email</span>
                  <Link
                    href={`mailto:${footerData?.site_settings?.email}`}
                    className="hover:underline"
                  >
                    {footerData?.site_settings?.email}
                  </Link>
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex items-center space-x-4 sm:space-x-6 mb-3 sm:mb-4">
                {footerData?.social_links?.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    className="hover:text-blue-300"
                  >
                    <Image
                      src={social.icon_value}
                      alt={social.name}
                      width={20}
                      height={20}
                      loading="lazy"
                      sizes="20px"
                    />
                  </Link>
                ))}
              </div>
              {/* Example CQC image */}
              {footerData?.footer_cms?.image_value && (
                <div className="relative -ml-2 w-20 sm:w-24 md:w-28 h-14 sm:h-16 md:h-20">
                  <Image
                    src={footerData.footer_cms.image_value}
                    alt={
                      footerData.footer_cms.image_alt_text_value ||
                      "Footer logo"
                    }
                    fill
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
            {/* Accreditations */}
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Accreditations
              </h3>
              <div className="flex flex-nowrap gap-2 sm:gap-3 max-w-full">
                {footerData?.accreditations?.map((accreditation) => (
                  <div
                    key={accreditation.id}
                    className="relative flex-1 min-w-0 h-8 sm:h-10 md:h-12 bg-white px-2 sm:px-4 md:px-6 rounded-lg"
                  >
                    <Image
                      src={accreditation.icon_value}
                      alt={
                        accreditation.icon_alt_text_value ||
                        "Accreditation logo"
                      }
                      loading="lazy"
                      sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
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
          className="flex justify-end w-full min-[1175px]:-mx-4 max-[1175px]:px-4 min-[1176px]:w-1/4 min-[1176px]:-me-10"
          style={{
            background: "linear-gradient(180deg, #083082 0%, #012367 100%)",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <LocationCard
            siteSettings={footerData?.site_settings}
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
