import React from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CtaBanner from '../components/sections/CtaBanner';
import { products } from '../data/products';
import { authActions } from '../data/navigation';

export function ProductDetailPage({ productSlug }) {
  const location = useLocation();
  const slug = productSlug || location.pathname.replace(/^\//, '');

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const handleOpenDemo = () => {
    window.dispatchEvent(
      new CustomEvent('open-request-demo', { detail: { type: 'demo', product: product.title } })
    );
  };

  const otherProducts = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO
        title={product.title}
        description={product.description}
        canonicalPath={`/${product.slug}`}
      />

      {/* Breadcrumb Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 text-slate-500">
          <Link to="/" className="hover:text-slate-800">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-slate-800">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-900 truncate">{product.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/40 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="brand" dot>{product.badge}</Badge>
            <span className="text-xs font-semibold text-slate-500">
              Indian SME Cloud Solution
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {product.headline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {product.description}
          </p>

          {/* Key Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {product.stats.map((s, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2"
              >
                <span className="text-xs text-slate-500 font-medium">{s.label}:</span>
                <span className="text-sm font-extrabold text-brand-600">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Button
              as="a"
              href={authActions.register.href}
              variant="primary"
              size="lg"
            >
              Start Free Trial Today
            </Button>
            <Button onClick={handleOpenDemo} variant="outline" size="lg">
              Schedule Live Walkthrough
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights & Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything Included in {product.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-brand-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 font-bold text-sm">
                  ✓
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Measurable ROI
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Real Impact for Indian Employers & HR Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Bar */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              Other Essential Modules in Cedur
            </h3>
            <Link
              to="/products"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View full suite <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-brand-400 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-semibold text-brand-600">{p.badge}</span>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mt-1 mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export default ProductDetailPage;
