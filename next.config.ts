import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.nike.com"], // Ganti dengan domain yang sesuai
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin",
  //         },
  //         {
  //           key: "Cross-Origin-Embedder-Policy",
  //           value: "require-corp",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
