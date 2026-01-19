export interface PricingTier {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaText: string;
  isRecommended?: boolean;
  type: 'digital' | 'physical' | 'suite';
  requiresAcknowledgement?: boolean;
}

export interface ComparisonPoint {
  feature: string;
  retail: string;
  institutional: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface DialogueEntry {
  speaker: string;
  text: string;
}

export interface BookEdition {
  title: string;
  subtitle: string;
  price: string;
  ctaText: string;
  isPopular?: boolean;
  points: {
    title: string;
    description: string;
  }[];
}