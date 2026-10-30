import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { saveEnquiry } from '../services/enquiryService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Holiday Enquiry',
    preferredMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call' | 'Email',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const submission = saveEnquiry({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredMethod,
        destination: formData.subject,
        adultsCount: 2,
        childrenCount: 0,
        budgetRange: 'Contact Us Inquiry',
        specialRequests: formData.message
      });

      setSubmitting(false);
      setSubmittedRef(submission.referenceNumber);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Holiday Enquiry',
        preferredMethod: 'WhatsApp',
        message: ''
      });
    } catch {
      setSubmitting(false);
      setErrorMsg('Could not submit inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT CONCIERGE ASSISTANCE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Connect With Our Team
          </h1>
          <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
            Whether you are curious about a destination, seeking advice for an upcoming family holiday, or ready to sculpt a completely customized itinerary, our concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Left (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white rounded-3xl p-8 border border-sand-border shadow-luxury space-y-6">
              <h3 className="font-serif text-2xl text-navy-primary font-semibold">
                Chennai Headquarters
              </h3>

              <div className="space-y-4 text-xs text-slate-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-metallic flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-primary text-sm font-semibold">Registered Office:</strong>
                    <span>Anna Nagar, Chennai, Tamil Nadu, India — 600040</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-metallic flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-primary text-sm font-semibold">Telephone Concierge:</strong>
                    <a href="tel:+919840012345" className="hover:text-gold-metallic transition-colors block">+91 98400 12345</a>
                    <a href="tel:+919444054321" className="hover:text-gold-metallic transition-colors block">+91 94440 54321</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-metallic flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-primary text-sm font-semibold">Electronic Mail:</strong>
                    <a href="mailto:concierge@yazhiholidays.com" className="hover:text-gold-metallic transition-colors">
                      concierge@yazhiholidays.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-metallic flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy-primary text-sm font-semibold">Business Hours:</strong>
                    <span>Monday to Saturday: 9:30 AM – 7:30 PM IST</span>
                    <span className="block text-slate-muted">Sunday: On-call emergency concierge only</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-sand-border">
                <a
                  href="https://wa.me/919840012345?text=Hello%20Yazhi%20Holidays,%20I%20would%20like%20to%20connect%20with%20a%20travel%20specialist."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light to-gold-royal hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Reassurance Banner */}
            <div className="bg-navy-midnight text-white rounded-3xl p-6 border border-gold-royal/30 space-y-3">
              <div className="flex items-center gap-2 text-gold-royal text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT HUMAN TOUCH</span>
              </div>
              <p className="text-xs text-sand-ivory/80 leading-relaxed font-light">
                Every conversation is handled directly by experienced travel consultants who understand visas, hotel tiers, and route pacing.
              </p>
            </div>

          </div>

          {/* Form Right (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-border shadow-luxury">
              
              <h3 className="font-serif text-3xl text-navy-primary font-semibold mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-muted mb-8">
                Fill out the form below. We respond to all written inquiries within 2 to 4 business hours.
              </p>

              {submittedRef && (
                <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inquiry Received Successfully</span>
                  </div>
                  <p className="text-xs">
                    Your reference number is <strong className="font-mono text-emerald-950">{submittedRef}</strong>. Our team will contact you shortly via {formData.preferredMethod}.
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Ramachandran"
                      className="w-full px-4 py-2.5 bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 12345"
                      className="w-full px-4 py-2.5 bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans text-sm"
                    >
                      <option value="General Holiday Enquiry">General Holiday Enquiry</option>
                      <option value="Customized International Tour">Customized International Tour</option>
                      <option value="Honeymoon Package Enquiry">Honeymoon Package Enquiry</option>
                      <option value="Family Holiday Planning">Family Holiday Planning</option>
                      <option value="Corporate / Group Travel">Corporate / Group Travel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-primary mb-1.5 uppercase tracking-wider">
                    Preferred Contact Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredMethod: method as any })}
                        className={`py-2 px-1 text-xs rounded-lg border font-medium transition-all ${
                          formData.preferredMethod === method
                            ? 'bg-navy-midnight text-gold-royal border-gold-royal'
                            : 'bg-sand-ivory text-slate-body border-sand-border hover:bg-sand-card'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-primary mb-1 uppercase tracking-wider">
                    Your Message / Travel Inquiries <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you have in mind—approximate travel dates, number of travellers, specific destinations..."
                    className="w-full px-4 py-3 bg-sand-ivory border border-sand-border rounded-xl text-navy-primary focus:outline-none focus:border-gold-royal font-sans text-sm resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 active:scale-95 transition-all shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
