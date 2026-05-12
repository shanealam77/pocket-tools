import React from "react";
import { SEO } from "../components/SEO";

export const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SEO
        title="Contact Us | WebToolz"
        description="Get in touch with the WebToolz team."
      />
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">
        Contact Us
      </h1>
      <div className="prose dark:prose-invert prose-indigo">
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Have a question, feedback, or a suggestion for a new tool? We'd love
          to hear from you!
        </p>
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">
            You can reach us directly via email:
          </p>
          <a
            href="mailto:support@webtoolz.example.com"
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline break-all"
          >
            support@webtoolz.example.com
          </a>
        </div>
      </div>
    </div>
  );
};
