import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

type InViewProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function InView<T extends React.ElementType = 'div'>({
  as,
  className,
  delayMs,
  children,
  ...rest
}: InViewProps<T>) {
  const Component = (as ?? 'div') as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      {threshold: 0.1, rootMargin: '0px 0px -50px 0px'},
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={clsx(
        className,
        'transition-all duration-700 will-change-transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{transitionDelay: delayMs ? `${delayMs}ms` : undefined}}
      {...rest}
    >
      {children}
    </Component>
  );
}

type SocialLink = {
  platform: 'Discord' | 'YouTube' | 'TikTok' | 'Quest';
  href: string;
  label: string;
  kind: 'discord' | 'youtube' | 'tiktok' | 'quest';
  icon: React.ReactNode;
};

function trackSocialClick(platform: SocialLink['platform']) {
  console.log(`用户点击了${platform}按钮`);
  const gtag = (window as unknown as {gtag?: (...args: unknown[]) => void}).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'click', {
      event_category: 'social',
      event_label: platform,
    });
  }
}

export default function Home(): React.ReactElement {
  useEffect(() => {
    document.body.classList.add('loaded');

    const onError = (e: ErrorEvent) => {
      console.error('页面错误:', e.error);
    };

    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);

  const socialLinks = useMemo<SocialLink[]>(
    () => [
      {
        platform: 'Discord',
        href: 'https://discord.com/invite/CrYCjTudCH',
        label: 'Discord',
        kind: 'discord',
        icon: (
          <svg className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        ),
      },
      {
        platform: 'YouTube',
        href: 'https://www.youtube.com/@Voxel_Playground',
        label: 'YouTube',
        kind: 'youtube',
        icon: (
          <svg className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
      },
      {
        platform: 'TikTok',
        href: 'https://www.tiktok.com/@voxel_playground',
        label: 'TikTok',
        kind: 'tiktok',
        icon: (
          <svg className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        ),
      },
      {
        platform: 'Quest',
        href: 'https://www.meta.com/experiences/voxel-playground/9926748747373800/',
        label: 'Quest Store',
        kind: 'quest',
        icon: <i className="fa-brands fa-meta text-3xl transition-transform duration-300 group-hover:scale-110" />,
      },
    ],
    [],
  );

  const features = useMemo(
    () => [
      {title: 'Physics Sandbox', description: 'Play with physics-driven voxel interactions in VR.'},
      {title: 'Voxel Building', description: 'Build, break, and experiment with voxel structures.'},
      {title: 'VR First', description: 'Designed for immersive VR gameplay and comfort.'},
      {title: 'Community', description: 'Stay connected for updates, content, and events.'},
    ],
    [],
  );

  return (
    <Layout title="Voxel Playground" description="Voxel Playground is a physics-based voxel sandbox VR game.">
      <main className="bg-black text-white">
        <section id="home" className="relative scroll-mt-[var(--ifm-navbar-height)]">
          <div className="relative">
            <img
              src="/img/vlcsnap-2025-09-03-15h39m23s266.png"
              alt="Tag before Dawn Game Screenshot - Cartoon mouse character in wooden cabin"
              className="block h-auto w-full opacity-70 transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto w-full max-w-3xl px-5 py-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md md:text-6xl">Voxel Playground</h1>
                <p className="mt-4 text-lg font-normal text-gray-300 drop-shadow-md md:text-xl">physics-based voxel sandbox VR game</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-[var(--ifm-navbar-height)] bg-zinc-900 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center text-4xl font-semibold">About</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <InView
                  key={feature.title}
                  className="rounded-2xl border border-zinc-700 bg-zinc-800 p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                  delayMs={i * 100}
                >
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{feature.description}</p>
                </InView>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 py-20 text-center">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-4xl font-semibold">Join Our Community</h2>
            <p className="mt-4 text-lg text-gray-300">
              Stay updated with the latest news, connect with other players, and get game update information
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap">
              {socialLinks.map((link, i) => (
                <InView
                  key={link.platform}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick(link.platform)}
                  delayMs={i * 100}
                  className={clsx(
                    'group social-btn flex w-full max-w-sm flex-col items-center rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-6 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20 md:w-auto md:min-w-[160px]',
                    link.kind === 'discord' && 'hover:border-[#7289da] hover:bg-[#7289da]/20',
                    link.kind === 'youtube' && 'hover:border-[#ff0000] hover:bg-[#ff0000]/20',
                    link.kind === 'tiktok' && 'hover:border-white hover:bg-white/20',
                    link.kind === 'quest' && 'hover:border-[#007bff] hover:bg-[#007bff]/20',
                  )}
                >
                  {link.icon}
                  <span className="mt-2 text-sm font-semibold">{link.label}</span>
                </InView>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
