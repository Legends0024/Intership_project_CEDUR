import React from 'react';
import SEO from '../components/ui/SEO';
import HeroSection from '../components/sections/HeroSection';
import TrustedBrands from '../components/sections/TrustedBrands';
import FeatureCards from '../components/sections/FeatureCards';
import InteractiveProcessTabs from '../components/sections/InteractiveProcessTabs';
import ProductGrid from '../components/sections/ProductGrid';
import IntegrationSection from '../components/sections/IntegrationSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import CtaBanner from '../components/sections/CtaBanner';

export function HomePage() {
  const handleOpenDemo = () => {
    window.dispatchEvent(new CustomEvent('open-watch-demo'));
  };

  return (
    <>
      <SEO
        title="HR and Payroll Software for Indian SMEs"
        description="Cedur is an HR and payroll software made for SMBs of India. Automate your onboarding, attendance management with geofencing, and 2-click payroll with 100% compliance."
      />
      <HeroSection onOpenDemo={handleOpenDemo} />
      <TrustedBrands />
      <FeatureCards />
      <InteractiveProcessTabs />
      <ProductGrid />
      <IntegrationSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}

export default HomePage;
