import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/travelData';

export const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sand-ivory pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT ANSWERS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-navy-primary font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-muted mt-2 font-light">
            Everything you need to know about planning, booking, and travelling with Yazhi Holidays.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 sm:mb-10 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-muted absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. visa, payment, customization)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-sand-border rounded-full text-xs sm:text-sm text-navy-primary focus:outline-none focus:border-gold-royal font-sans shadow-sm"
          />
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-sand-border overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-sand-card/40 transition-colors"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold-metallic">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-navy-primary">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-metallic flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-muted flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-sand-border/60 text-xs sm:text-sm text-slate-body font-light leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 bg-navy-midnight text-white rounded-3xl p-8 sm:p-10 border border-gold-royal/30 text-center space-y-4 shadow-luxury-dark">
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            Have a Specific Question?
          </h3>
          <p className="text-xs sm:text-sm text-sand-ivory/80 max-w-md mx-auto font-light">
            Our travel designers are available directly via WhatsApp or phone.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/9196380792722?text=Hello%20Yazhi%20Holidays,%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-navy-midnight bg-gold-royal hover:bg-gold-light transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge (6380792722)</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-sand-ivory border border-gold-royal/40 hover:bg-navy-royal/50 transition-colors"
            >
              Contact Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
