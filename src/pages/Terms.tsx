import React from "react";
import { SEO } from "../components/SEO";

export const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SEO
        title="Terms & Conditions | WebToolz"
        description="Terms and conditions for using WebToolz."
      />
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">
        Terms & Conditions
      </h1>
      <div className="prose dark:prose-invert prose-indigo space-y-6 text-slate-600 dark:text-slate-400">
        <p>
          <strong>Last Updated:</strong> May 12, 2026
        </p>
        <p>
          Welcome to WebToolz. By accessing this website, we assume you accept
          these terms and conditions. Do not continue to use WebToolz if you do
          not agree to take all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">
          License & Usage
        </h2>
        <p>
          You may use the tools for personal and commercial purposes. However, you are not allowed to
          scrape, reproduce, duplicate, or copy material from WebToolz to create
          a competing service.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">
          Disclaimer
        </h2>
        <p>
          The materials on WebToolz's website are provided on an 'as is' basis.
          WebToolz makes no warranties, expressed or implied, and hereby
          disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>
      </div>
    </div>
  );
};
