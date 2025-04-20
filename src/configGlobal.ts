import type { Props as SEOProps } from 'astro-seo';

export const siteName = 'Grit Matters';
export const mailingAddress = '151 N 8th St, Fifth Floor, Lincoln NE 68508';
export const emailAddress = 'amy@gritmatters.com';
export const phoneNumber = '+1 (650) 504-9568';

// This will be merged with page level props by deepmerge-ts
export const metaDefault: SEOProps = {
  title: 'Grit Matters Technical Recruiting',
  description:
    'Grit Matters connects high-growth technology companies with exceptional technical talent through evidence-based recruiting methods and proprietary analytics.',
  openGraph: {
    basic: {
      type: 'website', // required, allow optional override in pageConfig
      title: 'Grit Matters Technical Recruiting',
      image: '/og/home.png'
    },
    optional: {
      siteName // this is actually required
    }
  }
};

export type MenuItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: ChildItem[] };

export type ChildItem = {
  label: string;
  href: string;
};

// Define menu configurations
export const menuLarge: MenuItem[] = [
  {
    label: 'Our Process',
    href: '/process'
  },
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Client Success',
    href: '/client-success'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

export const menuSmall: MenuItem[] = [
  {
    label: 'Our Process',
    href: '/process'
  },
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Client Success',
    href: '/client-success'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

export const menuFooter: MenuItem[] = [
  {
    label: 'Our Process',
    href: '/process'
  },
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Client Success',
    href: '/client-success'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

// export const configSocial = {
//   linkedin: {
//     url: 'https://www.linkedin.com/company/yourcompany',
//     handle: 'yourcompany'
//   },
//   facebook: { url: 'https://www.facebook.com/yourpage', handle: 'yourpage' },
//   instagram: {
//     url: 'https://www.instagram.com/yourusername',
//     handle: 'yourusername'
//   },
//   reddit: {
//     url: 'https://www.reddit.com/r/yoursubreddit',
//     handle: 'u/yourusername'
//   }
// };
