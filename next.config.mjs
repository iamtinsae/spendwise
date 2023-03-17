// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
  },
};

export default nextConfig;
