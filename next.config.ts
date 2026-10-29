import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // STATIC_EXPORT=1 next build: plain static files in out-static/ for sharing without a server
  ...(process.env.STATIC_EXPORT && {
    output: "export",
    cacheComponents: false, // PPR is not allowed in export mode
    partialPrefetching: false,
    distDir: "out-static",
    trailingSlash: true,
    assetPrefix: "/assets", // Claude artifacts reserve top-level paths starting with "_", so _next/ is published as assets/_next/
    images: { unoptimized: true },
  }),
};

export default nextConfig;
