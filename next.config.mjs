// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import pwa from 'next-pwa'
const isDev = process.env.NODE_ENV !== "production";

const withPWA = pwa({
  dest: 'public',
  disable: isDev,

  exclude: [
    ({ asset }) => {
      if (
        asset.name.startsWith("server/") ||
        asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
      ) {
        return true;
      }
      if (isDev && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    }
  ],
});

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
};
export default withPWA(config);
