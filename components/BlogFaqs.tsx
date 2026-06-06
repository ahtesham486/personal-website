import type { BlogFaq } from "@/lib/blog";
import "@/styles/faq.css";

type Props = {
  faqs: BlogFaq[];
  heading?: string;
};

export default function BlogFaqs({ faqs, heading = "Frequently Asked Questions" }: Props) {
  if (!faqs.length) return null;

  return (
    <section className="blog-faq-section" aria-labelledby="blog-faq-heading">
      <h2 id="blog-faq-heading">{heading}</h2>
      <div className="faq-grid">
        {faqs.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
