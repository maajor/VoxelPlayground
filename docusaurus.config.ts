import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Voxel Playground',
  tagline: 'Grab-and-rip micro-voxel destruction in VR',
  favicon: 'img/vlcsnap-2025-09-03-15h39m23s266.png',

  url: 'https://voxelplayground.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

  organizationName: 'fonzieyang', // Usually your GitHub org/user name.
  projectName: 'VoxelPlayground', // Usually your repo name.
  trailingSlash: false, // Recommended for GitHub Pages

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  staticDirectories: ['static'],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Jersey+25&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      type: 'text/css',
      integrity: 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-6F55SYBBGC',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Voxel Playground',
        url: 'https://voxelplayground.com/',
        description: 'Voxel Playground is a touch-first micro-voxel destruction sandbox in VR for Meta Quest.',
        sameAs: [
          'https://www.meta.com/experiences/voxel-playground/9926748747373800/',
          'https://www.youtube.com/@Voxel_Playground',
          'https://discord.com/invite/CrYCjTudCH',
          'https://www.tiktok.com/@voxel_playground',
        ],
      }),
    },
  ],

  themeConfig: {
    image: 'img/vlcsnap-2025-09-03-15h39m23s266.png',
    navbar: {
      title: 'Voxel Playground',
      hideOnScroll: true,
      items: [
        {href: '/#home', label: 'Home', position: 'right'},
        {href: '/#about', label: 'About', position: 'right'},
        {href: '/d/', label: 'Docs', position: 'right'},
        {to: '/privacy', label: 'Privacy Policy', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Voxel Playground',
          items: [{label: 'Touch-first micro-voxel destruction in VR', to: '/'}],
        },
        {
          title: 'Links',
          items: [
            {label: 'Home', to: '/#home'},
            {label: 'About', to: '/#about'},
            {label: 'Privacy Policy', to: '/privacy'},
          ],
        },
        {
          title: 'Contact Us',
          items: [{label: 'Contact us through Discord', href: 'https://discord.com/invite/CrYCjTudCH'}],
        },
      ],
      copyright: '© 2025 Voxel Playground. All rights reserved.',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content: 'Voxel Playground is a touch-first micro-voxel destruction sandbox in VR for Meta Quest.',
      },
      {
        name: 'keywords',
        content:
          'voxel playground, micro voxel, micro-voxel, voxel destruction, destruction sandbox vr, physics sandbox vr, vr destruction game, meta quest sandbox, meta quest destruction game, quest physics game, quest sandbox game, voxel sandbox vr, vr sandbox game, survival mode vr, zombie waves vr, base building vr, moddable vr sandbox, teardown vr, teardown-like vr, vr teardown alternative, better voxel project vr',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
