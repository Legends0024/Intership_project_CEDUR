import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import Button from '../ui/Button';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Real Customer Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Don't Take Our Word For It. Listen to What Indian Business Leaders Say About <span className="gradient-text">Cedur</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                    {item.metric}
                  </span>
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ${item.bgClass || 'bg-brand-600 text-white'}`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.author}</div>
                  <div className="text-xs text-slate-500 font-medium">
                    {item.role} · <span className="text-brand-600 font-semibold">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button as={Link} to="/testimonials" variant="outline" size="md">
            View All Customer Stories <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
