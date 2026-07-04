import createNextIntlPlugin from "next-intl/plugin";

// Defaults to ./i18n/request.ts for the per-request config.
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
