"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { queueScrollToSection, scrollToSectionId } from "@/lib/hashScroll";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function ContactLink({ className, children }: Props) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  if (onHome) {
    return (
      <a
        href="#contact"
        className={className}
        data-cursor="disable"
        onClick={(e) => {
          e.preventDefault();
          scrollToSectionId("contact");
          window.history.replaceState(null, "", "#contact");
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href="/"
      className={className}
      prefetch={false}
      onClick={() => queueScrollToSection("contact")}
    >
      {children}
    </Link>
  );
}
