export const studio = 'CreativeMKStudios';
export const person = 'George Childs Gatty';
export const email = 'creativemkstudios@gmail.com';
export const extraPageMonthly = 15;

export const mkTowns = [
  'Central Milton Keynes',
  'Bletchley',
  'Wolverton',
  'Stony Stratford',
  'Newport Pagnell',
  'Kingston, Milton Keynes',
  'Broughton',
  'Great Linford',
  'Olney',
  'Woburn Sands',
] as const;

export const bedsTowns = [
  'Bedford',
  'Kempston',
  'Luton',
  'Dunstable',
  'Houghton Regis',
  'Leighton Buzzard',
  'Ampthill',
  'Flitwick',
  'Biggleswade',
  'Sandy',
] as const;

export function gbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function yearly(monthly: number): number {
  return monthly * 12;
}

export function mailHref(subject = 'Website enquiry'): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  summary: string;
  detail: string;
  usual?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'one',
    name: '1 page',
    monthly: 49,
    summary: 'For a simple business with one main service.',
    detail:
      'The page says what you do, where you work, and how to get in touch. This fits a new business or a business with one offer.',
  },
  {
    id: 'five',
    name: 'Up to 5 pages',
    monthly: 89,
    summary: 'The usual fit for a small business.',
    detail:
      'Use the pages for home, services, about, contact, and one more. The extra page can be a second service or a second town.',
    usual: true,
  },
  {
    id: 'ten',
    name: 'Up to 10 pages',
    monthly: 129,
    summary: 'For several services or several towns.',
    detail:
      'Each important service or town can have its own page. Google then has a clear page to show for each search.',
  },
];

export const steps = [
  {
    title: 'Email the facts',
    text: 'Tell me your business, the towns you cover, and how many pages you need.',
  },
  {
    title: 'Agree the price and the date',
    text: 'I reply with the yearly price and a finish date. You pay that yearly amount. There is no build fee on top.',
  },
  {
    title: 'The site goes live',
    text: 'I design it, write it, and put it online. Small changes are free for the year you have paid for.',
  },
] as const;

export const included = [
  'Design and build of the pages in your plan',
  'Writing for those pages, in plain words',
  'Hosting for the year and a secure padlock in the browser',
  'Page titles and short descriptions for search',
  'A sitemap, which is a list of your pages for Google',
  'A robots.txt file, so Google knows it may read the site',
  'A short data block with your business name, area, and services',
  'A layout that works on phones',
  'Help connecting Google Search Console, so you can see when Google has read the site',
  'A check that your Google Business Profile matches the site, if you have one',
  'Small changes to text, photos, prices, and opening hours',
] as const;

export const notIncluded = [
  'The fee for your domain name. You buy it and you own it.',
  'Pages above the plan you chose',
  'Online shops and card payments',
  'A logo. If you have none, I set your business name in clear type.',
  'New photos or video',
  'Google Ads or any other paid ads',
] as const;

const usual = plans[1];

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Is there a build cost?',
    answer: 'No. You do not pay a setup fee. The yearly price includes the design and the build.',
  },
  {
    question: 'When do I pay?',
    answer: `You pay for 12 months at the start. For example, ${usual.name.toLowerCase()} is ${gbp(usual.monthly)} a month. You pay ${gbp(yearly(usual.monthly))} for the year. I confirm the figure before you pay.`,
  },
  {
    question: 'What counts as a page?',
    answer: 'A page has its own web address. A block of text on the home page is not a new page.',
  },
  {
    question: 'What is a small change?',
    answer:
      'A small change is a short update. A new phone number, a price, a photo, or a sentence all count. A new page does not. A new section does not. If you need those, we change the plan or agree a price first.',
  },
  {
    question: 'Are small changes really free?',
    answer:
      'Yes, while your yearly plan is active. I aim to make them within a few working days. Send the change by email.',
  },
  {
    question: 'Who owns the domain and the words?',
    answer:
      'You buy the domain in your own name. I do not own it. You own your words and photos. I host the site while you are on a plan. If you do not renew, I give you a copy of the website files, or I take the site offline. We agree which one before you pay.',
  },
  {
    question: 'Do you only work in Milton Keynes and Bedfordshire?',
    answer: 'Those are the areas I work in. If you are close by, email me and I will say if I can help.',
  },
  {
    question: 'Do you write the words?',
    answer:
      'Yes. I write each page in plain language. You check that the facts are right. I do not publish until you are happy with the facts.',
  },
  {
    question: 'How long does a site take?',
    answer:
      'I confirm a finish date before you pay. I need your logo if you have one, your photos, and the facts about your business before I can start.',
  },
  {
    question: 'Do you build online shops, logos, or ads?',
    answer:
      'No. These plans are for simple business websites. I do not build online shops. I do not design logos. I do not run Google Ads. Ads are a separate cost you would pay to Google.',
  },
];

export const nav = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/web-design-milton-keynes', label: 'Milton Keynes' },
  { href: '/web-design-bedfordshire', label: 'Bedfordshire' },
  { href: '/about', label: 'About' },
] as const;

export const areas = [
  {
    href: '/web-design-milton-keynes',
    title: 'Web design in Milton Keynes',
    text: 'For shops and local services across Milton Keynes, from Central Milton Keynes to Bletchley, Newport Pagnell, and Olney.',
  },
  {
    href: '/web-design-bedfordshire',
    title: 'Web design in Bedfordshire',
    text: 'For small businesses in Bedford, Luton, Leighton Buzzard, Dunstable, and the other towns of Bedfordshire.',
  },
] as const;
