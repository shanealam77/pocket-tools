import React from "react";
import { SEO } from "../components/SEO";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SEO
        title="Privacy Policy | WebToolz"
        description="Privacy Policy for WebToolz."
      />
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert prose-indigo space-y-6 text-slate-600 dark:text-slate-400">
        <p>
          <strong>Last Updated:</strong> May 12, 2026
        </p>
        <p>Your privacy is critically important to us at WebToolz.</p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">
          Information We Collect
        </h2>
        <p>
          We do not collect any personal data when you use the majority of our
          tools. Utilities like the QR Code Generator, Password Generator, and
          Text Case Converter run entirely in your web browser. The text you
          enter is not transmitted to our servers.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">
          Website Analytics
        </h2>
        <p>
          We use Google Analytics to measure website usage. This service may use
          cookies to collect anonymous traffic data, such as page views and
          interactions, to help us improve user experience.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">
          Changes to This Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. We encourage
          visitors to frequently check this page for any changes. Your continued
          use of this site after any change in this Privacy Policy will
          constitute your acceptance of such change.
        </p>
      </div>
    </div>
  );
};
