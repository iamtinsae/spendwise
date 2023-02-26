// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

export default nextConfig;
