import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Phone, MessageCircle, FileText, Printer, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getEnquiries } from '../services/enquiryService';

export const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || 'YZH-2026-CONFIRMED';

  const enquiries = getEnquiries();
  const matchedEnquiry = enquiries.find((e) => e.referenceNumber === refCode);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Receipt Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-luxury border border-sand-border relative overflow-hidden">
          
          {/* Top Gold Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic"></div>

          {/* Success Header */}
          <div className="text-center space-y-4 pb-8 border-b border-sand-border">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-gold-metallic block">
              ENQUIRY SUBMISSION CONFIRMED
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-navy-primary font-semibold">
              Your Travel Blueprint is in Motion
            </h1>

            <p className="text-sm text-slate-muted max-w-md mx-auto font-light">
              Thank you for trusting Yazhi Holidays. Our bespoke travel specialists have received your inquiry.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sand-card border border-sand-border font-mono text-sm">
              <span className="text-slate-muted">Reference Number:</span>
              <strong className="text-navy-primary font-bold text-base">{refCode}</strong>
            </div>
          </div>

          {/* Enquiry Summary if matched */}
          {matchedEnquiry && (
            <div className="py-6 border-b border-sand-border space-y-3 text-xs">
              <h3 className="font-serif text-lg font-semibold text-navy-primary mb-2">
                Summary of Your Request
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-muted block font-mono">GUEST</span>
                  <span className="font-medium text-navy-primary">{matchedEnquiry.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">DESTINATION</span>
                  <span className="font-medium text-navy-primary">{matchedEnquiry.destination || 'Custom'}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">TRAVELLERS</span>
                  <span className="font-medium text-navy-primary">{matchedEnquiry.adultsCount} Adults</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">PREFERRED CONTACT</span>
                  <span className="font-medium text-gold-metallic">{matchedEnquiry.preferredContact}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">PHONE</span>
                  <span className="font-medium text-navy-primary">{matchedEnquiry.phone}</span>
                </div>
                <div>
                  <span className="text-slate-muted block font-mono">EMAIL</span>
                  <span className="font-medium text-navy-primary">{matchedEnquiry.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* What Happens Next Timeline */}
          <div className="py-8 border-b border-sand-border space-y-6">
            <h3 className="font-serif text-xl font-semibold text-navy-primary">
              What Happens Next
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-navy-midnight text-gold-royal font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary">Expert Review (Within 4 Hours)</h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    A dedicated senior destination specialist reviews your dates, preferences, and ideal pace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-navy-midnight text-gold-royal font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary">Personalized Draft & Quote (Within 24 Hours)</h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    We deliver a complete day-by-day blueprint via WhatsApp/Email with transparent pricing in INR.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-navy-midnight text-gold-royal font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-navy-primary">Refine & Confirm</h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    We make unlimited adjustments until the itinerary matches your exact vision before securing accommodations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-navy-primary border border-sand-border hover:bg-sand-card flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Print / Save Summary</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20my%20enquiry%20reference%20is%20${encodeURIComponent(refCode)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Us Reference</span>
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal hover:bg-gold-light transition-all flex items-center justify-center gap-1.5"
              >
                <span>Return Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
