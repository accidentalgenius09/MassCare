import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masscare.netlify.app';
  
  // Static routes
  const routes = [
    '',
    '/about-us',
    '/services',
    '/services/mass-home-care',
    '/services/mass-training-academy',
    '/services/mcm-nursing-care-agency',
    '/career-opportunities',
    '/testimonials',
    '/news-and-insights',
    '/contact-us',
    '/privacy-policy',
    '/terms-and-conditions',
    '/green-environmental-policy',
    '/newsletter-history',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.9 : 0.8,
  }));
}

