import React from 'react';
import { clientLogos } from '../../data/clients';
import { siteConfig } from '../../data/site';

export function TrustedBrands() {
  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Trusted by Growing Organizations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Over {siteConfig.metrics.companiesCount} Leading Indian Businesses Run on Cedur
          </h2>
        </div>

        {/* 12 Client Logo Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/60 hover:border-brand-300 shadow-sm hover:shadow-md transition-all duration-300 text-center group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-brand-50 border border-slate-200/80 group-hover:border-brand-200 flex items-center justify-center font-bold text-slate-700 group-hover:text-brand-600 transition-colors mb-2 text-sm shadow-xs">
                {client.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-brand-700 transition-colors line-clamp-1">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                {client.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBrands;
