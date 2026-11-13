import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Phone, Calendar, Users } from 'lucide-react';
import { saveEnquiry } from '../services/enquiryService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultPackageSlug?: string;
  defaultPackageTitle?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = '',
  defaultPackageSlug = '',
  defaultPackageTitle = ''
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    preferredContact: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email',
    departureCity: 'Chennai',
    travelDate: '',
    adultsCount: 2,
    childrenCount: 0,
    specialRequests: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const submission = saveEnquiry({
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredContact,
        destination: defaultDestination || defaultPackageTitle || 'General Enquiry',
        packageSlug: defaultPackageSlug,
        departureCity: formData.departureCity,
        travelDate: formData.travelDate,
        adultsCount: Number(formData.adultsCount),
        childrenCount: Number(formData.childrenCount),
        budgetRange: 'Custom Quote',
        specialRequests: formData.specialRequests
      });

      setSubmitting(false);
      onClose();
      navigate(`/confirmation?ref=${submission.referenceNumber}`);
    } catch {
      setSubmitting(false);
      setErrorMsg('Failed to process enquiry. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-midnight/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-sand-ivory w-full max-w-xl rounded-2xl shadow-luxury-dark border border-gold-royal/30 overflow-hidden relative animate-fadeIn my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-midnight px-4 sm:px-6 py-4 sm:py-5 text-white flex items-start justify-between border-b border-navy-royal/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-royal mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yazhi Travel Concierge</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
              {defaultPackageTitle ? `Enquire About ${defaultPackageTitle}` : 'Tailor Your Bespoke Journey'}
            </h3>
            <p className="text-xs text-sand-ivory/70 mt-1">
              Share your preferences. Our senior travel specialists will curate your itinerary within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sand-ivory/70 hover:text-white rounded-full hover:bg-navy-royal/50 transition-colors flex-shrink-0 ml-2"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. S. Ramachandran"
                className="w-full px-3 py-2 text-sm bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1">
                Phone Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 6380792722"
                className="w-full px-3 py-2 text-sm bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-sm bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1">
                Departure City
              </label>
              <input
                type="text"
                value={formData.departureCity}
                onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                placeholder="Chennai, Bangalore, Mumbai, etc."
                className="w-full px-3 py-2 text-sm bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gold-metallic" />
                <span>Travel Date</span>
              </label>
              <input
                type="date"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-2 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-gold-metallic" />
                <span>Adults</span>
              </label>
              <select
                value={formData.adultsCount}
                onChange={(e) => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                className="w-full px-2 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                {[1, 2, 3, 4, 5, 6, '7+'].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-primary mb-1 flex items-center gap-1">
                <span>Children</span>
              </label>
              <select
                value={formData.childrenCount}
                onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                className="w-full px-2 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} Children</option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred contact channel */}
          <div>
            <label className="block text-xs font-semibold text-navy-primary mb-1.5">
              Preferred Consultation Method:
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { label: 'WhatsApp', icon: MessageCircle },
                { label: 'Phone Call', icon: Phone },
                { label: 'Email', icon: Send }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.label}
                  onClick={() => setFormData({ ...formData, preferredContact: opt.label as any })}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-medium border transition-colors ${
                    formData.preferredContact === opt.label
                      ? 'bg-navy-midnight text-gold-royal border-gold-royal'
                      : 'bg-white text-slate-body border-sand-border hover:bg-sand-card'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-navy-primary mb-1">
              Specific Interests or Special Requests (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="e.g. Honeymoon setup, pure vegetarian meals, flight bookings, senior-citizen assistance..."
              className="w-full px-3 py-2 text-xs bg-white border border-sand-border rounded-lg text-navy-primary focus:outline-none focus:border-gold-royal font-sans resize-none"
            ></textarea>
          </div>

          {/* Trust reassurance */}
          <div className="flex items-center gap-2 text-[11px] text-slate-muted pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-metallic flex-shrink-0" />
            <span className="leading-tight">Your information is strictly confidential. Zero spam. Transparent pricing in INR.</span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-muted hover:text-navy-primary transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary py-2.5 px-6 w-full sm:w-auto text-center justify-center"
            >
              <Send className="w-3.5 h-3.5 btn-no-move flex-shrink-0" />
              <span>{submitting ? 'Submitting...' : 'Send Travel Enquiry'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
