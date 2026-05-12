import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ToolLayout } from "./components/ToolLayout";
import { TOOLS } from "./constants";
import { FavoritesProvider } from "./context/FavoritesContext";

// Tools
import { QRGenerator } from "./components/tools/QRGenerator";
import { WhatsAppLinkGenerator } from "./components/tools/WhatsAppLinkGenerator";
import { AgeCalculator } from "./components/tools/AgeCalculator";
import { GSTCalculator } from "./components/tools/GSTCalculator";
import { PasswordGenerator } from "./components/tools/PasswordGenerator";
import { WordCounter } from "./components/tools/WordCounter";
import { BMICalculator } from "./components/tools/BMICalculator";
import { PercentageCalculator } from "./components/tools/PercentageCalculator";
import { EMICalculator } from "./components/tools/EMICalculator";
import { TextCaseConverter } from "./components/tools/TextCaseConverter";
import { CharacterCounter } from "./components/tools/CharacterCounter";
import { RandomNumberGenerator } from "./components/tools/RandomNumberGenerator";

const TOOL_COMPONENTS: Record<string, React.FC> = {
  "qr-generator": QRGenerator,
  "whatsapp-link": WhatsAppLinkGenerator,
  "age-calculator": AgeCalculator,
  "gst-calculator": GSTCalculator,
  "password-generator": PasswordGenerator,
  "word-counter": WordCounter,
  "bmi-calculator": BMICalculator,
  "percentage-calculator": PercentageCalculator,
  "emi-calculator": EMICalculator,
  "text-case": TextCaseConverter,
  "character-counter": CharacterCounter,
  "random-number": RandomNumberGenerator,
};

import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Terms } from "./pages/Terms";

export default function App() {
  return (
    <HelmetProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              {TOOLS.map((tool) => {
                const Component = TOOL_COMPONENTS[tool.id];
                return (
                  // @ts-ignore React Router types issue with mapping
                  <Route
                    key={tool.id}
                    path={tool.path}
                    element={
                      <ToolLayout tool={tool}>
                        {Component ? <Component /> : null}
                      </ToolLayout>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </HelmetProvider>
  );
}
