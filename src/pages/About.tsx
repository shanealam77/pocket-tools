import React from "react";
import { SEO } from "../components/SEO";

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SEO
        title="About Us | WebToolz"
        description="Learn more about WebToolz and our mission."
      />
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">
        About WebToolz
      </h1>
      <div className="prose dark:prose-invert prose-indigo">
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          WebToolz is a comprehensive platform built to provide essential
          digital utilities for everyday use. Our goal is to make these smaller
          tasks completely frictionless and entirely private.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          We noticed that many online tools are cluttered with confusing interfaces,
          so we built WebToolz to be minimal, fast, and reliable.
        </p>
        <h2 className="text-2xl font-bold mt-10 mb-4">Core Principles</h2>
        <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            <strong>Privacy First:</strong> Most of our tools perform
            calculations client-side in your own browser, so your data never
            leaves your device.
          </li>
          <li>
            <strong>Fast & Minimalist:</strong> We strip away the clutter so you
            can get exactly what you need done right away.
          </li>
          <li>
            <strong>Accessibility:</strong> WebToolz is designed mobile-first,
            ensuring you have your utilities handy wherever you are.
          </li>
        </ul>
      </div>
    </div>
  );
};
