"use client";

import { useState } from "react";
import { faqItems } from "@/data/siteConfig";
import "@/styles/faq.css";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section section-container" id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="faq-heading">
        Frequently Asked Questions
      </h2>
      <div className="faq-grid">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className={`faq-item${isOpen ? " faq-item-open" : ""}`}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className="faq-toggle" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
