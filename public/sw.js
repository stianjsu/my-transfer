if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/1bcBU8pzoCWJrDGCI5lwV/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/1bcBU8pzoCWJrDGCI5lwV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/530-a864734a561a8753.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/849-0db6e80f05b28bb2.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/9578399c-31cff60862f66653.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/app/_not-found-7474195942fb2376.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/app/about/page-34ae5568f891f2ed.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/app/error-bac06c38f606647a.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/app/layout-2f3ff97996a64df2.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/app/page-03e5e04800e5ca35.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/bc9e92e6-942ca2a24fbf8f10.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/fd9d1056-5f2dfbd8c0c37f5a.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/main-43689d9dbed10fa2.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/main-app-34700ed66dd9ea20.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-8f5bf6c8dca1baf4.js",revision:"1bcBU8pzoCWJrDGCI5lwV"},{url:"/_next/static/css/ec2170f54a526c79.css",revision:"ec2170f54a526c79"},{url:"/favicon.ico",revision:"b50bdf6ee36cb5ddb845f7f67b882297"},{url:"/icons/android-chrome-192x192.png",revision:"1bcd4585940c5c59a526a82778445ded"},{url:"/icons/android-chrome-512x512.png",revision:"f5ff5c53fa9ba4f317f282e0869beabe"},{url:"/icons/apple-touch-icon.png",revision:"778c5cef226f3a8c8a0b3fa59726b798"},{url:"/icons/favicon-16x16.png",revision:"bb541905db2fce5787150911ba66ec44"},{url:"/icons/favicon-32x32.png",revision:"7a5dce74dfad70f2e1cbc3976027f9a2"},{url:"/icons/icon-192x192.png",revision:"5e6ff149af8c43895a38201cd55dbf1e"},{url:"/icons/icon-256x256.png",revision:"712f93a416fcd4114739c1fcd152ee5c"},{url:"/icons/icon-384x384.png",revision:"eb916a5fe6768dcc0c8a6ffb8ce91b20"},{url:"/icons/icon-512x512.png",revision:"046f56932041575ee0a53a65afbfc2aa"},{url:"/icons/logo512.png",revision:"67593046a30d417be9f3e795c57643b6"},{url:"/icons/mstile-150x150.png",revision:"6f28517d046099823f0e7219e7adb38a"},{url:"/icons/safari-pinned-tab.svg",revision:"446cb16c86dd2edf4d95a6ee0445b22a"},{url:"/manifest.json",revision:"42ef5a65d47cc6795ab433cc852160df"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
