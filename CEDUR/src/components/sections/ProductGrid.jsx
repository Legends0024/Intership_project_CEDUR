import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  Calendar,
  CalendarCheck,
  Shield,
  Smartphone,
  Receipt,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { products } from '../../data/products';

const iconMap = {
  Users,
  DollarSign,
  Calendar,
  CalendarCheck,
  Shield,
  Smartphone,
  Receipt,
  MapPin,
};

export function ProductGrid() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Explore the Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One system. Eight clearer ways to work.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Start with the workflow creating the most friction today, then connect the rest as your team grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod, index) => {
            const Icon = iconMap[prod.icon] || Users;
            const number = String(index + 1).padStart(2, '0');

            return (
              <Link
                key={prod.slug}
                to={`/${prod.slug}`}
                className="group bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-brand-500/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-300 group-hover:text-brand-500 transition-colors">
                      {number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2.5 leading-snug">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    Explore
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-brand-50 text-slate-600 group-hover:text-brand-600 flex items-center justify-center group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
