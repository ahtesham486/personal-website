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

export default function FaqDetails({
  items,
  heading = "Frequently Asked Questions",
  id = "faq-heading",
  className = "faq-section section-container",
}: Props) {
  if (!items.length) return null;

  return (
    <section className={className} aria-labelledby={id}>
      {heading ? (
        <h2 id={id} className="faq-heading">
          {heading}
        </h2>
      ) : null}
      <div className="faq-grid">
        {items.map((item) => (
          <details key={item.question} className="faq-item">
            <summary className="faq-question">
              {item.question}
              <span className="faq-toggle" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
