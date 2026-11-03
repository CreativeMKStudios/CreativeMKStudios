import { bedsTowns, email, gbp, mkTowns, person, plans, studio, yearly } from '../data/site';

type Crumb = { name: string; path: string };
type Faq = { question: string; answer: string };

function abs(site: URL, path: string): string {
  return new URL(path, site).href;
}

function place(type: 'City' | 'AdministrativeArea', name: string) {
  return { '@type': type, name };
}

export function pageGraph(options: {
  site: URL;
  path: string;
  title: string;
  description: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage';
  crumbs?: Crumb[];
  faqs?: Faq[];
  extra?: Record<string, unknown>[];
}): Record<string, unknown> {
  const { site, path, title, description } = options;
  const pageUrl = abs(site, path);
  const businessId = abs(site, '/#business');
  const websiteId = abs(site, '/#website');
  const personId = abs(site, '/#george');
  const pageId = `${pageUrl}#webpage`;
  const low = Math.min(...plans.map((plan) => plan.monthly));
  const high = Math.max(...plans.map((plan) => plan.monthly));

  const business = {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': businessId,
    name: studio,
    url: abs(site, '/'),
    image: abs(site, '/og.png'),
    logo: abs(site, '/icon-512.png'),
    email,
    description:
      'George Childs Gatty builds websites for small businesses in Milton Keynes and Bedfordshire. The monthly price depends on the number of pages. It is paid once a year. There is no upfront build cost.',
    priceRange: `${gbp(low)} to ${gbp(high)} a month`,
    currenciesAccepted: 'GBP',
    founder: { '@id': personId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Milton Keynes',
      addressRegion: 'England',
      addressCountry: 'GB',
    },
    areaServed: [
      place('City', 'Milton Keynes'),
      place('AdministrativeArea', 'Bedfordshire'),
      ...mkTowns.map((name) => place('City', name)),
      ...bedsTowns.map((name) => place('City', name)),
    ],
    knowsAbout: ['Web design', 'Small business websites', 'Local search'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email,
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website plans',
      itemListElement: plans.map((plan) => ({
        '@type': 'Offer',
        name: `${plan.name} website`,
        price: yearly(plan.monthly).toFixed(2),
        priceCurrency: 'GBP',
        description: `${gbp(plan.monthly)} a month, paid once a year as ${gbp(yearly(plan.monthly))}. No upfront build cost. Design, writing, hosting, and small changes are included.`,
        url: abs(site, '/pricing'),
        availability: 'https://schema.org/InStock',
      })),
    },
  };

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: abs(site, '/'),
      name: studio,
      description,
      inLanguage: 'en-GB',
      publisher: { '@id': businessId },
    },
    business,
    {
      '@type': 'Person',
      '@id': personId,
      name: person,
      jobTitle: 'Web designer',
      email,
      url: abs(site, '/about'),
      worksFor: { '@id': businessId },
      homeLocation: {
        '@type': 'Place',
        name: 'Milton Keynes and Bedfordshire',
      },
      knowsAbout: ['Web design', 'Small business websites', 'Local search'],
    },
    {
      '@type': options.faqs ? 'FAQPage' : (options.pageType ?? 'WebPage'),
      '@id': pageId,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      inLanguage: 'en-GB',
      primaryImageOfPage: abs(site, '/og.png'),
      ...(options.faqs
        ? {
            mainEntity: options.faqs.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }
        : {}),
    },
  ];

  if (options.crumbs && options.crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: options.crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: abs(site, crumb.path),
      })),
    });
  }

  if (options.extra) graph.push(...options.extra);
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function serviceNode(
  site: URL,
  options: {
    name: string;
    path: string;
    description: string;
    areaName: string;
    areaType: 'City' | 'AdministrativeArea';
  },
): Record<string, unknown> {
  const url = abs(site, options.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: options.name,
    serviceType: 'Small business web design',
    description: options.description,
    url,
    provider: { '@id': abs(site, '/#business') },
    areaServed: {
      '@type': options.areaType,
      name: options.areaName,
    },
  };
}
