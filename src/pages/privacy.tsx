import React from 'react';
import Layout from '@theme/Layout';

export default function Privacy(): React.ReactElement {
  return (
    <Layout title="Privacy Policy" description="Privacy Policy for Voxel Playground.">
      <main className="bg-black text-white">
        <iframe
          src="/privacy.html"
          title="Privacy Policy"
          className="block h-[calc(100vh-var(--ifm-navbar-height))] w-full border-0"
        />
      </main>
    </Layout>
  );
}

