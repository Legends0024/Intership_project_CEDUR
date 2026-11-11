import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist on Cedur."
      />

      <section className="py-24 sm:py-32 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <span className="text-7xl sm:text-9xl font-black text-brand-100 block mb-2 font-mono">
            404
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for has moved or does not exist. Let's get you back to the right place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/" variant="primary" size="md" icon={Home}>
              Back to Home
            </Button>
            <Button as={Link} to="/products" variant="outline" size="md">
              View Products
            </Button>
            <Button as={Link} to="/support" variant="ghost" size="md">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
