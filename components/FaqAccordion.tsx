"use client";

import { useState } from "react";
import "@/styles/faq.css";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  heading?: string;
  id?: string;
  className?: string;
};

export default function FaqAccordion({
  items,
  heading = "Frequently Asked Questions",
  id = "faq-heading",
  className = "faq-section section-container",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <section className={className} aria-labelledby={id}>
      {heading ? (
        <h2 id={id} className="faq-heading">
          {heading}
        </h2>
      ) : null}
      <div className="faq-grid">
        {items.map((item, index) => {
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
