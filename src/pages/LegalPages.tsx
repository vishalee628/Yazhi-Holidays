import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-muted hover:text-navy-primary mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-sand-border shadow-luxury space-y-6 text-slate-body text-sm font-light leading-relaxed">
          <div className="border-b border-sand-border pb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-metallic block mb-1">
              DATA INTEGRITY & PRIVACY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-muted font-mono mt-2">Effective Date: October 2026</p>
          </div>

          <p>
            At <strong>Yazhi Holidays</strong>, we regard the privacy and confidentiality of our guests with utmost seriousness. This document outlines how we collect, handle, and protect your personal travel details.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">1. Information We Collect</h3>
          <p>
            When you inquire about a holiday package or utilize our Custom Trip Planner, we collect details such as your full name, email address, telephone/WhatsApp contact, departure city, travel preferences, and traveller demographics. This information is gathered solely for itinerary preparation, quote generation, and booking execution.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">2. How Your Information is Used</h3>
          <p>
            Your information is used strictly to communicate custom travel blueprints, secure hotel allocations with certified hospitality partners, coordinate private transportation, and provide 24/7 on-tour concierge assistance. We never sell, lease, or monetize your contact information to third-party advertisers.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">3. Storage & Security</h3>
          <p>
            We implement industry-standard encryption and operational safeguards to secure all enquiry submissions. Administrative access to booking records is strictly restricted to authorized travel specialists.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">4. Contact Us Regarding Your Data</h3>
          <p>
            For any queries concerning this policy or to request removal of your contact details, please reach out directly to our Data Officer at <a href="mailto:privacy@yazhiholidays.com" className="text-gold-metallic underline">privacy@yazhiholidays.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-muted hover:text-navy-primary mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-sand-border shadow-luxury space-y-6 text-slate-body text-sm font-light leading-relaxed">
          <div className="border-b border-sand-border pb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-metallic block mb-1">
              BOOKING GUIDELINES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-muted font-mono mt-2">Effective Date: October 2026</p>
          </div>

          <p>
            Welcome to Yazhi Holidays. By accessing our services, submitting travel inquiries, or confirming a bespoke tour package, you acknowledge and agree to the following terms and guidelines.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">1. Quotes & Pricing</h3>
          <p>
            All quotations are presented in Indian Rupees (INR) and are subject to availability of hotel room allocations and flight seats at the time of token advance confirmation. Taxes and government levies are transparently stated in itemized quotes.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">2. Confirmation & Payment Schedules</h3>
          <p>
            To confirm a custom itinerary, an initial deposit of 25% to 30% is payable to secure accommodations and private logistics. The remaining balance is payable according to the agreed milestone schedule prior to departure.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">3. Cancellations & Amendments</h3>
          <p>
            Cancellation guidelines are clearly outlined per package. Yazhi Holidays works transparently to secure maximum possible refunds or trip credit from partner airlines and boutique hotels in unforeseen emergencies.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-navy-primary pt-2">4. Jurisdiction</h3>
          <p>
            All agreements and services provided by Yazhi Holidays are subject to the laws of the State of Tamil Nadu, India, with exclusive jurisdiction in Chennai courts.
          </p>
        </div>
      </div>
    </div>
  );
};
