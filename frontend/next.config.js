const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["avatars.yandex.net"],
  },
  env: {},
});
