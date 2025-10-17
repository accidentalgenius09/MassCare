import DocumentList from "@/components/sections/newsletter-history/DocumentCard";
import TTSWrapper from "@/hooks/TTSWrapper";
import React from "react";

function NewsletterHistory() {
  return (
    <>
      <div className="h-[22vh] bg-[url('/common/news-history.png')] bg-cover bg-center"></div>
      <div className="p-20">
        <div>
          <h1 className="text-3xl font-semibold">
            <TTSWrapper text="Stay in the Loop">Stay in the Loop</TTSWrapper>
          </h1>
          <p className="text-sm">
            <TTSWrapper text="Get the latest updates, insights, and exclusive content delivered straight to your inbox every week.">
              Get the latest updates, insights, and exclusive content delivered
              straight to your inbox every week.
            </TTSWrapper>
          </p>
        </div>
        <div className="mt-8">
          <h6 className="text-sm font-semibold">
            <TTSWrapper text="Previous Editions">Previous Editions</TTSWrapper>
          </h6>
          <p className="text-sm">
            <TTSWrapper text="Download and read our previous newsletter editions">
              Download and read our previous newsletter editions
            </TTSWrapper>
          </p>
        </div>
        <DocumentList />
      </div>
    </>
  );
}

export default NewsletterHistory;
