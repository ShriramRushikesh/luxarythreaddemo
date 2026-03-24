"use client";

import React from "react";
import { Link } from "lucide-react";

export default function ReviewGuidelinesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-white dark:bg-zinc-950">
       <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
             <h1 className="text-4xl md:text-5xl font-playfair font-black">Review Guidelines</h1>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Policy effective as of March 2026</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-playfair prose-headings:font-bold prose-p:font-medium prose-p:leading-relaxed">
             <h2>Welcome to the Luxury Threads Community</h2>
             <p>We value authentic, transparent feedback. Reviews help fellow shoppers understand our fit, fabric quality, and longevity. To ensure a safe and genuinely helpful environment, we have established the following moderation criteria.</p>

             <h3>What Makes a Great Review?</h3>
             <ul>
                <li><strong>Detail the Fit:</strong> Share your usual size and how the garment fit you (e.g., tight on shoulders, relaxed waist).</li>
                <li><strong>Fabric Feel:</strong> Describe the texture, weight, and breathability of the material.</li>
                <li><strong>Photos:</strong> Authentic photos showing the garment worn or styled in real life are highly appreciated.</li>
                <li><strong>Longevity:</strong> If you're reviewing after months of wear, mention how it holds up after washing.</li>
             </ul>

             <h3>What Will Cause a Review to be Rejected?</h3>
             <p>Our moderation AI and Admin team will flag and reject reviews containing any of the following:</p>
             <ul>
                <li><strong>Profanity & Hate Speech:</strong> Zero tolerance for abusive, discriminatory, or harassing language.</li>
                <li><strong>Competitor Mentions:</strong> Reviews directing users to buy from other retailers or linking external promotional codes.</li>
                <li><strong>Irrelevant Content:</strong> Commentary on shipping speeds, courier behavior, or website bugs. (Please direct these to our Support team instead).</li>
                <li><strong>Personal Identifiable Information (PII):</strong> Do not include phone numbers, addresses, or private emails.</li>
             </ul>

             <h3>The "Verified Purchase" Badge</h3>
             <p>Reviews submitted through our post-delivery automated emails or by logging into an account with matching purchase history will automatically inherit a green "Verified Purchase" badge. This signals structural authenticity to other buyers.</p>

             <hr className="my-10 border-gray-100 dark:border-zinc-800" />

             <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl">
                <h4 className="mt-0 font-playfair font-bold">Incentive Program</h4>
                <p className="mb-0 text-gray-500 text-sm">Every approved review containing photos automatically enters you into our monthly $500 wardrobe sweepstakes. Winners are announced directly via the email linked to their account.</p>
             </div>
          </div>

       </div>
    </div>
  );
}
