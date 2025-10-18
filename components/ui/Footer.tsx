"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LocationCard from "./FooterLogo";
import Newsletter from "./NewsletterSubscription";

export default function Footer() {
  return (
    <footer
      style={{ background: "#012367" }}
      className="text-white px-6 md:px-12 lg:px-20"
    >
      <div className="flex flex-row-6">
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8 pb-10">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Green Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="text-sm space-y-3">
                <p>
                  <span className="block font-medium">Phone</span>
                  <a href="tel:01823216575" className="hover:underline">
                    01823 216575
                  </a>
                </p>
                <p>
                  <span className="block font-medium">Email</span>
                  <a href="mailto:masscare@info.in" className="hover:underline">
                    masscare@info.in
                  </a>
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex items-center space-x-4 mb-4">
                <a href="#" className="hover:text-blue-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="hover:text-blue-300">
                  <FaXTwitter />
                </a>
              </div>
              {/* Example CQC image */}
              <div className="relative w-28 h-20">
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
          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
            {/* Accreditations */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Accreditations</h3>
              <div className="flex flex-wrap gap-4">
                <div className="relative w-24 h-12 bg-white px-16 rounded-lg">
                  <Image
                    src="/logos/careQC.png"
                    alt="Care Quality Commission"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-24 h-12 bg-white px-16 rounded-lg">
                  <Image
                    src="/logos/skillsforcare.png"
                    alt="Accreditation 2"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-24 h-12 bg-white px-16 rounded-lg">
                  <Image
                    src="/logos/cpd.png"
                    alt="CPD"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-24 h-12 bg-white px-16 rounded-lg">
                  <Image
                    src="/logos/dbs.png"
                    alt="DBS"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <Newsletter />
          </div>
        </div>
        <div
          className="flex justify-end"
          style={{
            background: "linear-gradient(180deg, #083082 0%, #012367 100%)",
            height: "100%",
            width: "40%",
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
      <div className="border-t border-white/10 py-6 text-center text-sm">
        Copyright © {new Date().getFullYear()}{" "}
        <span className="font-medium">Mass Care Home</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
}
