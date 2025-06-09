import { i18n } from './next-i18next.config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
