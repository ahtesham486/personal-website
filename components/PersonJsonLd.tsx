import { personSchema } from "@/lib/seo";

/** Standalone Person JSON-LD for Google Knowledge Panel / Rich Results. */
export default function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
    />
  );
}
