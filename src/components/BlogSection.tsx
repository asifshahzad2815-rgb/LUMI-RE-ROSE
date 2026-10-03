import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar, X, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#F2E5E8]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B76E79] font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#D4A396]" />
            <span>THE BEAUTY JOURNAL</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D2527] uppercase">
            PARISIAN EDITORIAL
          </h2>
          <p className="text-xs sm:text-sm text-[#736366] max-w-xl font-light">
            Phytotherapy research, cellular extraction notes, and seasonal beauty rituals from our Grasse laboratory.
          </p>
        </div>

        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7A7E] border border-[#E8D4D8] px-4 py-2 rounded-full self-start sm:self-auto bg-[#FAF4F5]">
          Autumn 2026 Volume
        </span>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group bg-[#FAF6F3] rounded-3xl overflow-hidden border border-[#EFE5E2] hover:border-[#D4A396]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl cursor-pointer"
          >
            <div>
              {/* Photo Frame */}
              <div className="relative aspect-16/10 overflow-hidden bg-white">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#9A515D] uppercase tracking-wider border border-[#F0D5DA]">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-2.5">
                <div className="flex items-center gap-3 text-[11px] text-[#8C7A7E] font-light">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B76E79]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B76E79]" />
                    {post.readTime}
                  </span>
                </div>

                <div className="text-[11px] text-[#B76E79] font-serif italic">
                  {post.frenchTitle}
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2D2527] leading-snug group-hover:text-[#B76E79] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-[#7A6B6F] font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-6 pt-3 border-t border-[#EDE1DD] flex items-center justify-between">
              <div>
                <span className="font-medium text-xs text-[#2D2527] block">
                  {post.author}
                </span>
                <span className="text-[10px] text-[#8C7A7E] font-light">
                  {post.authorRole}
                </span>
              </div>

              <span className="text-xs uppercase tracking-wider font-semibold text-[#B76E79] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
          <div
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-[#2D2527]/60 backdrop-blur-xs"
          />

          <div className="relative z-10 w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#F0E4E6] animate-fadeIn max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-[#7A6B6F] hover:text-[#2D2527] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9A515D] bg-[#FAF2F4] px-3 py-1 rounded-full border border-[#F0D5DA]">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2527] uppercase leading-tight pt-1">
                {activeArticle.title}
              </h3>
              <div className="text-xs text-[#8C7A7E]">
                By {activeArticle.author} ({activeArticle.authorRole}) • Published {activeArticle.date}
              </div>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-neutral-100 border border-[#EDE1DD]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-[#5A484C] font-light leading-relaxed space-y-4">
              <p>{activeArticle.content}</p>
              <p>
                Every formulation at Lumière Rose undergoes 12 months of clinical testing to guarantee biocompatibility, zero irritation, and demonstrable cellular regeneration.
              </p>
            </div>

            <button
              onClick={() => setActiveArticle(null)}
              className="btn-sweep btn-sweep-dark w-full py-3.5 font-medium text-xs uppercase tracking-widest rounded-full cursor-pointer shadow-md"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
