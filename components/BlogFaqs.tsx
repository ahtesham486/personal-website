import type { BlogFaq } from "@/lib/blog";
import FaqAccordion from "@/components/FaqAccordion";

type Props = {
  faqs: BlogFaq[];
  heading?: string;
};

export default function BlogFaqs({ faqs, heading = "Frequently Asked Questions" }: Props) {
  return (
    <FaqAccordion
      items={faqs}
      heading={heading}
      id="blog-faq-heading"
      className="faq-section blog-faq-section"
    />
  );
}
