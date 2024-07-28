const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

const isLocalhost =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.includes("localhost")

const removeProtocol = (url) => {
  if (url.startsWith("https://")) {
    return url.slice(8) // Remove 'https://'
  } else if (url.startsWith("http://")) {
    return url.slice(7) // Remove 'http://'
  } else {
    return url // If no protocol found, return original URL
  }
}

module.exports = withStoreConfig({
  experimental: {
    serverComponentsExternalPackages: [
      "@medusajs/product",
      "@medusajs/modules-sdk",
    ],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: isLocalhost ? "http" : "https",
        hostname: isLocalhost
          ? "localhost"
          : removeProtocol(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL),
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
