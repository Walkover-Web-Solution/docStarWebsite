'use client';

import Script from "next/script";

type JsonLdProps = {
  id: string;
  data?: Record<string, unknown> | null;
};

export default function JsonLd({ id, data }: JsonLdProps) {
  if (!data) return null;

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
