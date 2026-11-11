import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../data/site';
import { SITE_URL } from '../../config';

export function SEO({
  title,
  description,
  canonical,
  canonicalPath,
  ogType = 'website',
  ogImage = '/homepage.webp',
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.headline} | ${siteConfig.name}`;
  const pageDesc = description || siteConfig.description;

  // Build canonical URL strictly using configured local SITE_URL
  let cleanPath = '/';
  if (canonicalPath) {
    cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  } else if (canonical) {
    if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
      try {
        const parsed = new URL(canonical);
        cleanPath = parsed.pathname;
      } catch {
        cleanPath = '/';
      }
    } else {
      cleanPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
    }
  }

  const canonicalUrl = `${SITE_URL}${cleanPath}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}

export default SEO;
