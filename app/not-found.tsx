import type { Metadata } from "next";
import InternalServerError from "@/components/ui/ErrorPage";

export const metadata: Metadata = {
  title: "404 | Mass Care",
};

export default function NotFound() {
  return (
    <InternalServerError />
  );
}


