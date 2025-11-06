import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import React from "react";

function EnvironmentPoliciesPage() {
  return (
    <>
      <PageBanner
        title="Environment Policies"
        breadcrumb="Home / Environment Policies"
        image="/common/environment-policy.png"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />

      <div className="min-h-screen pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="px-12 pt-5">
          <h1 className="text-3xl font-bold">
            <TTSWrapper text="Green / Environmental Policy">
              Green / Environmental Policy
            </TTSWrapper>
          </h1>
          <p className="text-sm mt-5">
            <TTSWrapper text="Mass Care Momentous Ltd (trading as Mass Home Care) is committed to minimizing the impact of our operations on the environment while delivering high-quality home care services. We recognize that home care services involve significant travel and energy usage, and we aim to reduce our environmental footprint as part of our corporate responsibility.">
              Mass Care Momentous Ltd (trading as Mass Home Care) is committed
              to minimizing the impact of our operations on the environment
              while delivering high-quality home care services. We recognize
              that home care services involve significant travel and energy
              usage, and we aim to reduce our environmental footprint as part of
              our corporate responsibility.
            </TTSWrapper>
          </p>
        </div>
        <div className="max-w-6xl bg-white px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6 lg:px-12 lg:pt-12 lg:pb-8">
          {/* Section 1: Our Commitments */}
          <section className="mb-12">
            <h1 className="text-2xl font-bold mb-4">
              <TTSWrapper text="1. Our Commitments">
                1. Our Commitments
              </TTSWrapper>
            </h1>
            <p className="font-sm mb-4">We will:</p>
            <ol className="space-y-3 mb-4 list-alpha-paren list-inside text-xs">
              <li>Work towards achieving Net Zero Carbon Emissions by 2050</li>
              <li>
                Comply with all relevant environmental legislation, regulations,
                and codes of practice
              </li>
              <li>
                Regularly review our environmental impact and implement
                strategies to minimize it
              </li>
              <li>
                Promote environmental awareness among employees and encourage
                sustainable work practices
              </li>
            </ol>
            <p className="text-xs">
              Additional Scope 3 (waste, commuting) is considered minimal but
              can be reviewed in future years
            </p>
          </section>

          {/* Section 2: Practical Steps */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-2">
              2. Practical Steps We Are Taking
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Travel and Transport */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Travel and Transport
                </h3>
                <ol className="space-y-3 text-sm list-alpha-paren list-inside">
                  <li>
                    Prioritize efficient scheduling to minimize travel distance
                  </li>
                  <li>
                    Explore low-emission and electric vehicle (EV) options for
                    the company fleet
                  </li>
                  <li>
                    Encourage car-sharing and public transport where possible
                  </li>
                  <li>Consider the implementation of cycle-to-work schemes</li>
                </ol>
              </div>

              {/* Waste and Resource Management */}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Waste and Resource Management
                </h3>
                <ol className="space-y-3 text-sm list-alpha-paren list-inside">
                  <li>Promote digital systems to reduce paper use</li>
                  <li>
                    Recycle office waste wherever facilities are available
                  </li>
                  <li>Encourage staff to reduce, reuse, and recycle</li>
                </ol>
              </div>

              {/* Energy and Utilities */}
              <div>
                <h3 className="text-xl font-bold mb-2">Energy and Utilities</h3>
                <ol className="space-y-3 text-sm list-alpha-paren list-inside">
                  <li>
                    Use energy-efficient equipment in offices (LED lighting,
                    smart controls)
                  </li>
                  <li>
                    Aim to switch to a green energy supplier providing renewable
                    electricity
                  </li>
                  <li>Regularly monitor energy usage and seek reductions</li>
                </ol>
              </div>

              {/* Staff Engagement */}
              <div>
                <h3 className="text-xl font-bold mb-2">Staff Engagement</h3>
                <ol className="space-y-3 text-sm list-alpha-paren list-inside">
                  <li>Provide environmental awareness information to staff</li>
                  <li>
                    Include sustainability as part of staff inductions and
                    ongoing training
                  </li>
                  <li>
                    Review our policy annually and update staff on changes
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 3: Responsibility */}
          <section>
            <h2 className="text-xl font-bold mb-2">3. Responsibility</h2>
            <p className="text-xs mb-6">
              This policy is supported by the Management Team and will be
              reviewed annually. It is the responsibility of every employee to
              help us achieve our environmental objectives.
            </p>

            <div>
              <p className="font-semibold mb-2 text-sm">Approved By:</p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Name:</span> Baiju Sebastian
              </p>
              <p className="text-sm">
                <span className="font-semibold">Date:</span> March 2025
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default EnvironmentPoliciesPage;
