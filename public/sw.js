if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise(async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()})),s.then(()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]})},s=(s,t)=>{Promise.all(s.map(e)).then(e=>t(1===e.length?e[0]:e))},t={require:Promise.resolve(s)};self.define=(s,n,i)=>{t[s]||(t[s]=Promise.resolve().then(()=>{let t={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map(s=>{switch(s){case"exports":return t;case"module":return a;default:return e(s)}})).then(e=>{const s=i(...e);return t.default||(t.default=s),t})}))}}define("./sw.js",["./workbox-e032be30"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"dioCRp0DPf-wPiGV2nyFe"},{url:"/_next/static/chunks/86b6b2419ffab01f22653701fff79291698404a4.b01e96f45f53cf6063cc.js",revision:"50ff3a2b51678ab3c4a663314efe91e4"},{url:"/_next/static/chunks/framework.c6faae2799416a6da8e8.js",revision:"a07dacbb502f5257565ceb7d460e71e6"},{url:"/_next/static/dioCRp0DPf-wPiGV2nyFe/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"/_next/static/dioCRp0DPf-wPiGV2nyFe/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/dioCRp0DPf-wPiGV2nyFe/pages/_app.js",revision:"62d363bb8c76db2b06324e8c3939521d"},{url:"/_next/static/dioCRp0DPf-wPiGV2nyFe/pages/_error.js",revision:"dad27fc55d619a843984d50c44a7de3f"},{url:"/_next/static/dioCRp0DPf-wPiGV2nyFe/pages/index.js",revision:"588218994a9e839922d266b53375872f"},{url:"/_next/static/runtime/main-70920c688213abd6db89.js",revision:"c4492141516c9b6b376febadbe18ea63"},{url:"/_next/static/runtime/polyfills-db3eeaf8fbc6db3a50d4.js",revision:"cf3e362240114c40790b57c8ebecab35"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
