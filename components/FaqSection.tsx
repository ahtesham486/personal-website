import { faqItems } from "@/data/siteConfig";
import "@/styles/faq.css";

export default function FaqSection() {
  return (
    <section className="faq-section section-container" id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="faq-heading">
        Frequently Asked Questions
      </h2>
      <div className="faq-grid">
        {faqItems.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
