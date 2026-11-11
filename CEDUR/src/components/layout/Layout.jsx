import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WatchDemoModal from '../ui/WatchDemoModal';
import RequestDemoModal from '../ui/RequestDemoModal';
import FloatingDemoButton from '../ui/FloatingDemoButton';

export function Layout({ children }) {
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);
  const [requestDemoOpen, setRequestDemoOpen] = useState(false);
  const [demoType, setDemoType] = useState('demo');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Global event listener to trigger modals from any page
  useEffect(() => {
    const handleOpenRequestDemo = (e) => {
      if (e?.detail?.type) {
        setDemoType(e.detail.type);
      } else {
        setDemoType('demo');
      }
      setRequestDemoOpen(true);
    };

    const handleOpenWatchDemo = () => {
      setDemoVideoOpen(true);
    };

    window.addEventListener('open-request-demo', handleOpenRequestDemo);
    window.addEventListener('open-watch-demo', handleOpenWatchDemo);

    return () => {
      window.removeEventListener('open-request-demo', handleOpenRequestDemo);
      window.removeEventListener('open-watch-demo', handleOpenWatchDemo);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Hidden button for modal trigger accessibility */}
      <button
        id="trigger-request-demo"
        className="hidden"
        onClick={() => setRequestDemoOpen(true)}
      />

      <Navbar onOpenDemo={() => setDemoVideoOpen(true)} />

      <main className="flex-1 pt-20 sm:pt-24">{children}</main>

      <Footer />

      <FloatingDemoButton onOpenDemo={() => setDemoVideoOpen(true)} />

      <WatchDemoModal
        isOpen={demoVideoOpen}
        onClose={() => setDemoVideoOpen(false)}
      />

      <RequestDemoModal
        isOpen={requestDemoOpen}
        initialType={demoType}
        onClose={() => setRequestDemoOpen(false)}
      />
    </div>
  );
}

export default Layout;
