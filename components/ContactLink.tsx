"use client";

import Link from "next/link";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function ContactLink({ className, children }: Props) {
  return (
    <Link href="/contact" className={className} prefetch={false}>
      {children}
    </Link>
  );
}
