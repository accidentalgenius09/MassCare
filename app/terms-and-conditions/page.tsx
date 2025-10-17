import { SmallFilledCheckbox } from "@/components/helpers/svgs";
import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import Link from "next/link";
import React from "react";

function TermsAndCondtions() {
  return (
    <>
      <PageBanner
        title="Terms & Conditions"
        breadcrumb="Home / Terms and Conditions"
        image="/common/privacypolicy-banner.png"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <div className="px-20 py-15">
        <div>
          <h1 className="text-3xl font-bold">
            <TTSWrapper text="Terms of Service">Terms of Service</TTSWrapper>
          </h1>
          <p className="text-xs mt-2">
            <TTSWrapper text="This website is owned and operated by . By visiting our website and accessing the information, resources, services, products, and tools we provide, you understand and agree to accept and adhere to the following terms and conditions as stated in this policy (hereafter referred to as ‘User Agreement’), along with the terms and conditions as stated in our Privacy Policy (please refer to the Privacy Policy section below for more information).">
              This website is owned and operated by . By visiting our website
              and accessing the information, resources, services, products, and
              tools we provide, you understand and agree to accept and adhere to
              the following terms and conditions as stated in this policy
              (hereafter referred to as ‘User Agreement’), along with the terms
              and conditions as stated in our Privacy Policy (please refer to
              the Privacy Policy section below for more information).
            </TTSWrapper>
          </p>
          <p className="text-xs mt-1">
            <TTSWrapper
              text="We reserve the right to change this User Agreement from time to
              time without notice. You acknowledge and agree that it is your
              responsibility to review this User Agreement periodically to
              familiarize yourself with any modifications. Your continued use of
              this site after such modifications will constitute acknowledgment
              and agreement of the modified terms and conditions."
            >
              We reserve the right to change this User Agreement from time to
              time without notice. You acknowledge and agree that it is your
              responsibility to review this User Agreement periodically to
              familiarize yourself with any modifications. Your continued use of
              this site after such modifications will constitute acknowledgment
              and agreement of the modified terms and conditions.
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold">
            <TTSWrapper text="Responsible Use and Conduct">
              Responsible Use and Conduct
            </TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="By visiting our website and accessing the information, resources, services, products, and tools we provide for you, either directly or indirectly (hereafter referred to as ‘Resources’), you agree to use these Resources only for the purposes intended as permitted by (a) the terms of this User Agreement, and (b) applicable laws, regulations and generally accepted online practices or guidelines.">
              By visiting our website and accessing the information, resources,
              services, products, and tools we provide for you, either directly
              or indirectly (hereafter referred to as ‘Resources’), you agree to
              use these Resources only for the purposes intended as permitted by
              (a) the terms of this User Agreement, and (b) applicable laws,
              regulations and generally accepted online practices or guidelines.
            </TTSWrapper>
          </p>
          <ol className="text-xs mt-2">
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="In order to access our Resources, you may be required to provide
              certain information about yourself (such as identification,
              contact details, etc.) as part of the registration process, or as
              part of your ability to use the Resources. You agree that any
              information you provide will always be accurate, correct, and up
              to date."
              >
                In order to access our Resources, you may be required to provide
                certain information about yourself (such as identification,
                contact details, etc.) as part of the registration process, or
                as part of your ability to use the Resources. You agree that any
                information you provide will always be accurate, correct, and up
                to date.
              </TTSWrapper>
            </li>

            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="You are responsible for maintaining the confidentiality of any
              login information associated with any account you use to access
              our Resources. Accordingly, you are responsible for all activities
              that occur under your accounts."
              >
                You are responsible for maintaining the confidentiality of any
                login information associated with any account you use to access
                our Resources. Accordingly, you are responsible for all
                activities that occur under your accounts.
              </TTSWrapper>
            </li>
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="  Accessing (or attempting to access) any of our Resources by any
              means other than through the means we provide, is strictly
              prohibited. You specifically agree not to access (or attempt to
              access) any of our Resources through any automated, unethical or
              unconventional means."
              >
                Accessing (or attempting to access) any of our Resources by any
                means other than through the means we provide, is strictly
                prohibited. You specifically agree not to access (or attempt to
                access) any of our Resources through any automated, unethical or
                unconventional means.
              </TTSWrapper>
            </li>
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="Engaging in any activity that disrupts or interferes with our
              Resources, including the servers and/or networks to which our
              Resources are located or connected, is strictly prohibited."
              >
                Engaging in any activity that disrupts or interferes with our
                Resources, including the servers and/or networks to which our
                Resources are located or connected, is strictly prohibited.
              </TTSWrapper>
            </li>
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="Attempting to copy, duplicate, reproduce, sell, trade, or resell
              our Resources is strictly prohibited."
              >
                Attempting to copy, duplicate, reproduce, sell, trade, or resell
                our Resources is strictly prohibited.
              </TTSWrapper>
            </li>
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text="You are solely responsible any consequences, losses, or damages
              that we may directly or indirectly incur or suffer due to any
              unauthorized activities conducted by you, as explained above, and
              may incur criminal or civil liability."
              >
                You are solely responsible any consequences, losses, or damages
                that we may directly or indirectly incur or suffer due to any
                unauthorized activities conducted by you, as explained above,
                and may incur criminal or civil liability.
              </TTSWrapper>
            </li>
          </ol>
          <ol className="text-xs mt-2 list-alpha-paren list-inside">
            <li className="py-2">
              <TTSWrapper
                text="Is illegal, threatening, defamatory, abusive, harassing,
              degrading, intimidating, fraudulent, deceptive, invasive, racist,
              or contains any type of suggestive, inappropriate, or explicit
              language;"
              >
                Is illegal, threatening, defamatory, abusive, harassing,
                degrading, intimidating, fraudulent, deceptive, invasive,
                racist, or contains any type of suggestive, inappropriate, or
                explicit language;
              </TTSWrapper>
            </li>
            <li className="py-2">
              <TTSWrapper
                text="Infringes on any trademark, patent, trade secret, copyright, or
              other proprietary right of any party;"
              >
                Infringes on any trademark, patent, trade secret, copyright, or
                other proprietary right of any party;
              </TTSWrapper>
            </li>
            <li className="py-2">
              <TTSWrapper text="Contains any type of unauthorized or unsolicited advertising;">
                Contains any type of unauthorized or unsolicited advertising;
              </TTSWrapper>
            </li>
            <li className="py-2">
              <TTSWrapper
                text=" Impersonates any person or entity, including any of
                the Operators’s web sites employees or representatives."
              >
                Impersonates any person or entity, including any of
                the Operators’s web sites employees or representatives.
              </TTSWrapper>
            </li>
          </ol>
          <p className="text-xs mt-2">
            <TTSWrapper
              text="We have the right at our sole discretion to remove any content that,
                we feel in our judgment does not comply with this User Agreement,
                along with any content that we feel is otherwise offensive, harmful,
                objectionable, inaccurate, or violates any 3rd party copyrights or
                trademarks. We are not responsible for any delay or failure in
                removing such content. If you post content that we choose to remove,
                you hereby consent to such removal, and consent to waive any claim
                against us."
            >
              We have the right at our sole discretion to remove any content
              that, we feel in our judgment does not comply with this User
              Agreement, along with any content that we feel is otherwise
              offensive, harmful, objectionable, inaccurate, or violates any 3rd
              party copyrights or trademarks. We are not responsible for any
              delay or failure in removing such content. If you post content
              that we choose to remove, you hereby consent to such removal, and
              consent to waive any claim against us.
            </TTSWrapper>
          </p>
          <ol className="text-xs mt-2">
            <li className="py-2 flex items-start gap-2">
              <SmallFilledCheckbox className="shrink-0 mt-[2px]" />
              <TTSWrapper
                text=" We do not assume any liability for any content posted by you or
              any other 3rd party users of our website. However, any content
              posted by you using any open communication tools on our website,
              provided that it doesn’t violate or infringe on any 3rd party
              copyrights or trademarks, becomes the property of the Operators of
              this web site, and as such, gives us a perpetual, irrevocable,
              worldwide, royalty-free, exclusive license to reproduce, modify,
              adapt, translate, publish, publicly display and/or distribute as
              we see fit. This only refers and applies to content posted via
              open communication tools as described, and does not refer to
              information that is provided as part of the registration process,
              necessary in order to use our Resources. All information provided
              as part of our registration process is covered by our privacy
              policy."
              >
                We do not assume any liability for any content posted by you or
                any other 3rd party users of our website. However, any content
                posted by you using any open communication tools on our website,
                provided that it doesn’t violate or infringe on any 3rd party
                copyrights or trademarks, becomes the property of the Operators
                of this web site, and as such, gives us a perpetual,
                irrevocable, worldwide, royalty-free, exclusive license to
                reproduce, modify, adapt, translate, publish, publicly display
                and/or distribute as we see fit. This only refers and applies to
                content posted via open communication tools as described, and
                does not refer to information that is provided as part of the
                registration process, necessary in order to use our Resources.
                All information provided as part of our registration process is
                covered by our privacy policy.
              </TTSWrapper>
            </li>
          </ol>
          <ol className="text-xs mt-2 list-alpha-paren list-inside gap-2">
            <li className="py-2">
              <TTSWrapper
                text="You agree to indemnify and hold harmless Company Name and its
              parent company and affiliates, and their directors, officers,
              managers, employees, donors, agents, and licensors, from and
              against all losses, expenses, damages and costs, including
              reasonable attorneys’ fees, resulting from any violation of this
              User Agreement or the failure to fulfill any obligations relating
              to your account incurred by you or any other person using your
              account. We reserve the right to take over the exclusive defense
              of any claim for which we are entitled to indemnification under
              this User Agreement. In such event, you shall provide us with such
              cooperation as is reasonably requested by us."
              >
                You agree to indemnify and hold harmless Company Name and its
                parent company and affiliates, and their directors, officers,
                managers, employees, donors, agents, and licensors, from and
                against all losses, expenses, damages and costs, including
                reasonable attorneys’ fees, resulting from any violation of this
                User Agreement or the failure to fulfill any obligations
                relating to your account incurred by you or any other person
                using your account. We reserve the right to take over the
                exclusive defense of any claim for which we are entitled to
                indemnification under this User Agreement. In such event, you
                shall provide us with such cooperation as is reasonably
                requested by us.
              </TTSWrapper>
            </li>
          </ol>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold">
            <TTSWrapper text="Privacy">Privacy</TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="Your privacy is very important to us, which is why we’ve created a separate Privacy Policy in order to explain in detail how we collect, manage, process, secure, and store your private information. Our privacy policy is included under the scope of this User Agreement. To read our privacy policy in its entirety, click here.">
              Your privacy is very important to us, which is why we’ve created a
              separate Privacy Policy in order to explain in detail how we
              collect, manage, process, secure, and store your private
              information. Our privacy policy is included under the scope of
              this User Agreement. To read our privacy policy in its entirety, 
              <Link href="/privacy-policy" className="underline cursor-pointer">
                click here.
              </Link>
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold">
            <TTSWrapper text="Limitation of Liability">
              Limitation of Liability
            </TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="In conjunction with the Limitation of Warranties as explained above, you expressly understand and agree that any claim against us shall be limited to the amount you paid, if any, for use of products and/or services. The Operators’s web sites will not be liable for any direct, indirect, incidental, consequential or exemplary loss or damages which may be incurred by you as a result of using our Resources, or as a result of any changes, data loss or corruption, cancellation, loss of access, or downtime to the full extent that applicable limitation of liability laws apply.">
              In conjunction with the Limitation of Warranties as explained
              above, you expressly understand and agree that any claim against
              us shall be limited to the amount you paid, if any, for use of
              products and/or services. The Operators’s web sites will not be
              liable for any direct, indirect, incidental, consequential or
              exemplary loss or damages which may be incurred by you as a result
              of using our Resources, or as a result of any changes, data loss
              or corruption, cancellation, loss of access, or downtime to the
              full extent that applicable limitation of liability laws apply.
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold">
            <TTSWrapper text="Termination of Use">
              Termination of Use{" "}
            </TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="You agree that we may, at our sole discretion, suspend or terminate your access to all or part of our website and Resources with or without notice and for any reason, including, without limitation, breach of this User Agreement. Any suspected illegal, fraudulent or abusive activity may be grounds for terminating your relationship and may be referred to appropriate law enforcement authorities. Upon suspension or termination, your right to use the Resources we provide will immediately cease, and we reserve the right to remove or delete any information that you may have on file with us, including any account or login information.">
              You agree that we may, at our sole discretion, suspend or
              terminate your access to all or part of our website and Resources
              with or without notice and for any reason, including, without
              limitation, breach of this User Agreement. Any suspected illegal,
              fraudulent or abusive activity may be grounds for terminating your
              relationship and may be referred to appropriate law enforcement
              authorities. Upon suspension or termination, your right to use the
              Resources we provide will immediately cease, and we reserve the
              right to remove or delete any information that you may have on
              file with us, including any account or login information.{" "}
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold">
            <TTSWrapper text="Governing Law">Governing Law</TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="It can be accessed by most countries around the world. By accessing our website, you agree that the statutes and laws of our state, without regard to the conflict of laws and the United Nations Convention on the International Sales of Goods, will apply to all matters relating to the use of this website and the purchase of any products or services through this site. Furthermore, any action to enforce this User Agreement shall be brought in the federal or state courts UK You hereby agree to personal jurisdiction by such courts, and waive any jurisdictional, venue, or inconvenient forum objections to such courts.">
              It can be accessed by most countries around the world. By
              accessing our website, you agree that the statutes and laws of our
              state, without regard to the conflict of laws and the United
              Nations Convention on the International Sales of Goods, will apply
              to all matters relating to the use of this website and the
              purchase of any products or services through this site.
              Furthermore, any action to enforce this User Agreement shall be
              brought in the federal or state courts UK You hereby agree to
              personal jurisdiction by such courts, and waive any
              jurisdictional, venue, or inconvenient forum objections to such
              courts.
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold">
            <TTSWrapper text="Guarantee">Guarantee</TTSWrapper>
          </h3>
          <p className="text-xs mt-2">
            <TTSWrapper text="UNLESS OTHERWISE EXPRESSED, the Operators’s web site EXPRESSLY DISCLAIMS ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.">
              UNLESS OTHERWISE EXPRESSED, the Operators’s web site EXPRESSLY
              DISCLAIMS ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED
              WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE AND NON-INFRINGEMENT.
            </TTSWrapper>
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsAndCondtions;
