import type { BlogFaq } from "@/lib/blog";
import FaqDetails from "@/components/FaqDetails";

type Props = {
  faqs: BlogFaq[];
  heading?: string;
};

export default function BlogFaqs({ faqs, heading = "Frequently Asked Questions" }: Props) {
  return (
    <FaqDetails
      items={faqs}
      heading={heading}
      id="blog-faq-heading"
      className="faq-section blog-faq-section"
    />
  );
}
