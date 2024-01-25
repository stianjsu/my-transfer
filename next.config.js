/** @type {import('next').NextConfig} */

const nextPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {};

module.exports = nextPWA(nextConfig);
