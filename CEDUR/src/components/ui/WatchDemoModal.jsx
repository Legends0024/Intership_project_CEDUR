import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, VideoOff, ArrowRight } from 'lucide-react';
import Modal from './Modal';
import { LOCAL_CONFIG } from '../../config';

export function WatchDemoModal({ isOpen, onClose }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cedur Platform Walkthrough" maxWidth="max-w-4xl">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center">
        {isOpen && (
          <>
            {!videoError ? (
              <video
                src={LOCAL_CONFIG.demoVideoPath}
                controls
                autoPlay
                className="w-full h-full object-contain"
                onError={() => setVideoError(true)}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center px-6 py-10 max-w-md">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="w-9 h-9" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Local Demo Video Placeholder</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This build runs entirely offline. Place your walkthrough video file at{' '}
                  <code className="text-brand-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">
                    public/videos/demo.mp4
                  </code>{' '}
                  to preview it inside this player.
                </p>
                <Link
                  to="/contact-us?type=demo"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg"
                >
                  Schedule a Live 1-on-1 Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 pt-2 border-t border-slate-100">
        <span>Want a tailored walkthrough for your company?</span>
        <Link
          to="/contact-us?type=demo"
          onClick={onClose}
          className="font-semibold text-brand-600 hover:text-brand-700 underline text-xs sm:text-sm"
        >
          Book a 1-on-1 personalized demo →
        </Link>
      </div>
    </Modal>
  );
}

export default WatchDemoModal;
