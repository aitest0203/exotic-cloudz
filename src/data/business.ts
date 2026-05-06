/**
 * Business identity / contact info.
 *
 * Update these constants and the entire site (nav, hero, footer, FAQ, meta tags)
 * picks them up. No need to touch component files for routine info changes.
 */

export const BUSINESS = {
  name: 'Exotic Cloudz',
  tagline: 'Premium Mobile Hookah Catering',
  city: 'San Antonio',
  state: 'TX',
  serviceArea: 'San Antonio & surrounding metro',

  // Contact — Phone format: digits only for tel:, display formatted.
  phoneDigits: '7262024303',
  phoneDisplay: '(726) 202-4303',
  email: 'aitest0203@gmail.com',

  // Socials
  instagramHandle: 'motion.millz_',
  instagramUrl: 'https://instagram.com/motion.millz_',
  facebookUrl: 'https://facebook.com/motion.millz_',

  // Hours
  hoursDisplay: 'Thu–Sun · 5pm – 2am · By appointment Mon–Wed',

  // SEO
  siteUrl: 'https://exoticcloudz.pages.dev', // update once you set a custom domain
};

export const FAQS = [
  {
    q: 'What areas do you serve?',
    a: `${BUSINESS.serviceArea}. Travel beyond the metro is available — message us for a quote.`,
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend 7–14 days for weekend events. Last-minute bookings are accepted subject to availability.',
  },
  {
    q: 'Do you require a deposit?',
    a: 'Yes. A 50% non-refundable deposit secures your date. The remainder is due the day of the event.',
  },
  {
    q: 'Are guests required to be 21+?',
    a: 'Yes. Per Texas law, all hookah users must be 21 or older. We verify ID at setup.',
  },
  {
    q: 'What flavors do you carry?',
    a: 'Premium tobacco from Fumari, Al Fakher, Starbuzz, and Love 66 — over 30 flavors. Tell us your preferences in the booking form.',
  },
  {
    q: 'Indoor or outdoor only?',
    a: 'Outdoor or well-ventilated covered patios only. Per local code we cannot operate inside enclosed spaces.',
  },
];
