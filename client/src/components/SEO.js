import { Helmet } from 'react-helmet-async';

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://air-ops-manager-airlines-management.vercel.app';
const SITE_NAME = 'AirOpsManager';
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

export default function SEO({ title, description, path = '', image, type = 'website', noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Airlines Management System`;
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
