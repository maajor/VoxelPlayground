import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Voxel Playground',
  tagline: 'Physics-based voxel sandbox VR game',
  favicon: 'img/vlcsnap-2025-09-03-15h39m23s266.png',

  url: 'https://voxelplayground.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
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
          items: [{label: 'Physics-based voxel sandbox VR game', to: '/'}],
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
        content: 'Voxel Playground is a physics-based voxel sandbox VR game.',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
