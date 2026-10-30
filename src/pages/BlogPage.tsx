import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/travelData';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Destination Guides', 'Planning Guides', 'Honeymoon Inspiration'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-sand-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-midnight text-gold-royal text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE YAZHI JOURNAL</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-navy-primary font-normal leading-tight">
            Notes From the World
          </h1>
          <p className="text-base text-slate-muted mt-3 font-light leading-relaxed">
            In-depth destination dispatches, unhurried travel philosophies, and practical guidance written by our senior travel curators.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-navy-midnight text-gold-royal border-gold-royal font-semibold shadow-sm'
                  : 'bg-white text-slate-body border-sand-border hover:bg-sand-card'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lead Featured Article */}
        {filteredPosts.length > 0 && (
          <div className="mb-14">
            <div className="group bg-white rounded-3xl overflow-hidden shadow-luxury border border-sand-border grid grid-cols-1 lg:grid-cols-12 destination-card">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover destination-card-img brightness-[0.85]"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-gold-royal text-navy-midnight font-bold">
                    Featured Dispatch
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-muted font-mono mb-2">
                    <Clock className="w-3.5 h-3.5 text-gold-metallic" />
                    <span>{filteredPosts[0].readTime}</span>
                    <span>•</span>
                    <span>{filteredPosts[0].date}</span>
                  </div>

                  <span className="text-xs text-gold-metallic font-mono uppercase block mb-1">
                    {filteredPosts[0].category}
                  </span>

                  <Link to={`/travel-journal/${filteredPosts[0].slug}`}>
                    <h2 className="font-serif text-3xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors leading-snug">
                      {filteredPosts[0].title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-muted mt-3 font-light leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-sand-border flex items-center justify-between">
                  <span className="text-xs text-slate-muted font-medium">By {filteredPosts[0].author}</span>
                  <Link
                    to={`/travel-journal/${filteredPosts[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold-metallic"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 text-gold-royal" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-sand-border flex flex-col group destination-card"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover destination-card-img"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-navy-midnight/85 text-gold-royal border border-gold-royal/30 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-muted font-mono mb-2">
                    <Clock className="w-3 h-3 text-gold-metallic" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <Link to={`/travel-journal/${post.slug}`}>
                    <h3 className="font-serif text-2xl font-semibold text-navy-primary group-hover:text-gold-metallic transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-muted mt-2 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-sand-border flex items-center justify-between text-xs">
                  <span className="text-slate-muted font-medium">{post.author}</span>
                  <Link
                    to={`/travel-journal/${post.slug}`}
                    className="text-gold-metallic hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
