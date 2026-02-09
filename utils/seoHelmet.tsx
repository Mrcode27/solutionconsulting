import React, { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

/**
 * SEO Helmet Component
 * Dynamically updates head meta tags, title, and structured data for better SEO
 * Use this component at the top level of each page
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Update page title
    document.title = config.title;

    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', config.description);

    // Update keywords if provided
    if (config.keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', config.keywords);
    }

    // Update Open Graph tags
    const ogTitle = config.ogTitle || config.title;
    const ogDescription = config.ogDescription || config.description;
    const ogImage = config.ogImage || '/images/og-image.png';

    updateOrCreateMetaTag('property', 'og:title', ogTitle);
    updateOrCreateMetaTag('property', 'og:description', ogDescription);
    updateOrCreateMetaTag('property', 'og:image', ogImage);

    // Update Twitter tags
    updateOrCreateMetaTag('property', 'twitter:title', ogTitle);
    updateOrCreateMetaTag('property', 'twitter:description', ogDescription);
    updateOrCreateMetaTag('property', 'twitter:image', ogImage);

    // Update canonical URL
    if (config.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', config.canonicalUrl);
    }

    // Handle noindex if needed
    if (config.noindex) {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'noindex, follow');
      }
    }
  }, [config]);
};

/**
 * Helper function to update or create meta tags
 */
function updateOrCreateMetaTag(attrName: string, attrValue: string, content: string) {
  let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * SEO Helmet Component - Alternative to useSEO hook
 * Can be used if you prefer component-based approach
 */
export const SEOHelmet: React.FC<SEOConfig> = (config) => {
  useSEO(config);
  return null;
};

/**
 * Generates structured data for Organization
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Solutions Consulting Sarl",
  "url": "https://solutionconsulting.biz",
  "logo": "https://solutionconsulting.biz/images/small-logo.png",
  "description": "Cabinet de conseil spécialisé en accompagnement stratégique, levée de fonds, et optimisation commerciale pour PME en Afrique",
  "sameAs": [
    "https://www.linkedin.com/company/solutions-consulting-sarl"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+237 673 347 832",
    "email": "info@solutionconsulting.biz"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Douala",
    "addressLocality": "Douala",
    "addressCountry": "CM"
  }
};

/**
 * Generates FAQPage structured data
 */
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generates Article/BlogPost structured data
 */
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "image": article.image || "/images/og-image.png",
  "datePublished": article.datePublished || new Date().toISOString(),
  "dateModified": article.dateModified || new Date().toISOString(),
  "author": {
    "@type": "Organization",
    "name": article.author || "Solutions Consulting Sarl"
  }
});
