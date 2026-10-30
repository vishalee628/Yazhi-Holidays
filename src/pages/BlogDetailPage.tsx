import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/travelData';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-sand-ivory pt-36 pb-24 text-center px-4">
        <h2 className="font-serif text-4xl text-navy-primary font-semibold">Article Not Found</h2>
        <p className="text-slate-muted mt-2">The article you are looking for does not exist.</p>
        <Link
          to="/travel-journal"
          className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gold-royal"
        >
          Back to Travel Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/travel-journal"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-muted hover:text-navy-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notes From the World</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-navy-primary font-normal leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-sand-border text-xs text-slate-muted font-mono">
            <div>
              <span>Written by <strong>{post.author}</strong></span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-metallic" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-luxury mb-12 h-80 sm:h-[480px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-sand-border shadow-luxury space-y-6 text-slate-body leading-relaxed font-light text-base sm:text-lg">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Editorial Quote Box */}
          <div className="p-6 rounded-2xl bg-sand-card border-l-4 border-gold-royal my-8 italic font-serif text-xl sm:text-2xl text-navy-primary">
            "A journey with Yazhi is not simply about arriving at a geographic coordinate; it is about arriving at a new feeling."
          </div>

          <p className="text-sm text-slate-muted italic">
            Published by the Editorial Desk at Yazhi Holidays. All rights reserved.
          </p>
        </div>

        {/* Next Step CTA */}
        <div className="mt-12 bg-navy-midnight text-white rounded-3xl p-8 sm:p-10 border border-gold-royal/30 shadow-luxury-dark text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-royal">
            INSPIRED BY THIS ARTICLE?
          </span>
          <h3 className="font-serif text-3xl text-white font-medium">
            Turn This Inspiration Into Your Next Journey
          </h3>
          <p className="text-sm text-sand-ivory/80 max-w-md mx-auto font-light">
            Tell our travel specialists your preferred dates and travel companions. We’ll design your route with care.
          </p>
          <div className="pt-2">
            <Link
              to="/plan-trip"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-navy-midnight bg-gradient-to-r from-gold-light via-gold-royal to-gold-metallic hover:brightness-110 transition-all shadow-gold-glow"
            >
              <span>Design Your Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
