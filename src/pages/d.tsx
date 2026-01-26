import React, {useEffect} from 'react';

export default function Doc(): React.ReactElement {
  useEffect(() => {
    window.location.replace('/doc/index.html');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 px-6 text-center text-white">
      <div>
        <div className="text-lg font-semibold">Redirecting to docs…</div>
        <a className="mt-3 block text-sm text-sky-400 underline" href="/doc/index.html">
          Open docs
        </a>
      </div>
    </main>
  );
}

