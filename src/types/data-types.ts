export type Faq = {
  name: string;
  question: string;
  answer: string;
};

export type FeatureItem = {
  id: number;
  name: string;
  link: string;
  description: string;
};

export type HeroImage = {
  name: string;
  images: string[];
};

export type MetaItem = {
  title: string;
  description: string;
  keywords: string[];
  name: string;
};

export type TestimonialItem = {
  product: string;
  testimonial: string;
  client_img: string[];
  given_by: string;
  giver_title: string;
  product_logo: string[];
};
