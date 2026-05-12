export type ToolId =
  | "qr-generator"
  | "whatsapp-link"
  | "age-calculator"
  | "gst-calculator"
  | "password-generator"
  | "word-counter"
  | "bmi-calculator"
  | "percentage-calculator"
  | "emi-calculator"
  | "text-case"
  | "character-counter"
  | "random-number";

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  category: "generator" | "calculator" | "text" | "utility";
  path: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}
