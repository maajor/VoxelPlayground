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
  const [isHeroVideoLoaded, setIsHeroVideoLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('loaded');

    const onError = (e: ErrorEvent) => {
      console.error('页面错误:', e.error);
    };

    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);

  const heroVideoSrc = useMemo(() => {
    const videoId = 'I_iUPpiW8VA';
    const params = new URLSearchParams({
      autoplay: '1',
      controls: '0',
      disablekb: '1',
      fs: '0',
      iv_load_policy: '3',
      loop: '1',
      modestbranding: '1',
      mute: '1',
      playsinline: '1',
      rel: '0',
      playlist: videoId,
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
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
      {title: 'Touch-First Destruction', description: 'Grab it, rip it, smash it—destruction feels physical because you do it by hand.'},
      {title: 'Micro‑Voxel Chaos', description: 'Small pieces, big reactions: collapse, debris, and chain‑reactions you can feel in VR.'},
      {title: 'Survive the Waves', description: 'Craft gear, fortify your base, and hold out against relentless zombie attacks.'},
      {title: 'Pure Playground', description: 'Spawn tools, tweak settings, and experiment with ridiculous physics moments—your rules.'},
    ],
    [],
  );

  return (
    <Layout title="Voxel Playground" description="Grab-and-rip micro-voxel destruction in VR—build, break, and survive on Meta Quest.">
      <main className="bg-black text-white">
        <section
          id="home"
          className="relative flex min-h-[calc(100vh-var(--ifm-navbar-height))] scroll-mt-[var(--ifm-navbar-height)] items-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="/img/vlcsnap-2025-09-03-15h39m23s266.png"
              alt="Voxel Playground key art"
              className="h-full w-full object-cover opacity-70"
              loading="lazy"
            />
            <div className={clsx('absolute inset-0 transition-opacity duration-700', isHeroVideoLoaded ? 'opacity-100' : 'opacity-0')}>
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  title="Voxel Playground trailer background"
                  src={heroVideoSrc}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="pointer-events-none absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
                  style={{width: '177.78vh', height: '56.25vw'}}
                  onLoad={() => setIsHeroVideoLoaded(true)}
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />
            <div
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 6px)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.20),transparent_55%)]" />
          </div>

          <div className="relative mx-auto w-full max-w-5xl px-5 py-16 text-center">
            <h1 className="sr-only">Voxel Playground</h1>
            <div className="mx-auto flex max-w-4xl flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[2.75rem] bg-gradient-to-r from-sky-500/25 via-white/10 to-fuchsia-500/25 blur-3xl" />
                <div className="absolute inset-0 -z-10 rounded-[2.75rem] bg-black/40 blur-xl" />
                <img
                  src="/img/Logo.png"
                  alt="Voxel Playground logo"
                  className="w-[min(640px,80vw)] select-none drop-shadow-[0_28px_60px_rgba(0,0,0,0.75)]"
                  loading="eager"
                  draggable={false}
                />
              </div>
              <p className="mt-4 text-lg font-normal text-gray-200 drop-shadow-md md:text-xl">
                Grab. Break. Build. Survive. Micro‑voxel mayhem you can touch in VR.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://www.meta.com/experiences/voxel-playground/9926748747373800/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-red-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-red-50 shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-105 hover:bg-red-800 hover:shadow-[0_0_50px_-5px_rgba(220,38,38,0.8)] border border-red-500/50"
                >
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.8),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    Get it on Meta Quest
                  </span>
                </a>
                <a
                  href="/doc/index.html"
                  className="inline-flex items-center justify-center border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur transition-colors hover:border-white/50 hover:bg-white/15"
                >
                  Read the Modding Docs
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-[var(--ifm-navbar-height)] bg-zinc-900 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center text-4xl font-semibold">About</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-300">
              Voxel Playground is a hands‑on VR sandbox where anything you build can be torn apart—brick by brick, chunk by chunk,
              moment by moment.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <InView
                  key={feature.title}
                  className="border border-zinc-700 bg-zinc-800 p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
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
                    'group social-btn flex w-full max-w-sm flex-col items-center border-2 border-white/20 bg-white/10 px-8 py-6 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20 md:w-auto md:min-w-[160px]',
                    link.kind === 'discord' && 'hover:border-[#dc2626] hover:bg-[#dc2626]/20',
                    link.kind === 'youtube' && 'hover:border-[#ff0000] hover:bg-[#ff0000]/20',
                    link.kind === 'tiktok' && 'hover:border-[#dc2626] hover:bg-[#dc2626]/20',
                    link.kind === 'quest' && 'hover:border-[#dc2626] hover:bg-[#dc2626]/20',
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
