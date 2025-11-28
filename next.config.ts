import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack(config) {
    // Find and modify the default file loader to exclude SVGs
    config.module.rules.forEach((rule: any) => {
      if (rule.test && rule.test.toString().includes('svg')) {
        rule.exclude = /\.svg$/i;
      }
    });

    // Add SVGR loader for SVG files imported in TS/TSX files
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            svgo: false,
          },
        },
      ],
    });
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
