import { ReactNode } from "react";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildFeaturePageStructuredData,
  BreadcrumbItem,
  FaqSchemaConfig,
} from "@/lib/structuredData";
import { MetaItem } from "@/types/data-types";

export type FeatureSchemaProps = {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords?: MetaItem["keywords"];
  breadcrumbs?: BreadcrumbItem[];
  publishedAt?: string;
  updatedAt?: string;
  faq?: FaqSchemaConfig;
  children?: ReactNode;
};

const FeatureSchema = ({ id, children, ...config }: FeatureSchemaProps) => {
  const structuredData = buildFeaturePageStructuredData(config);

  return (
    <>
      <JsonLd id={id} data={structuredData} />
      {children}
    </>
  );
};

export default FeatureSchema;
