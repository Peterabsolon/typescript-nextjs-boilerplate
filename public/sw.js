if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,t,n)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(t.map(s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}})).then(e=>{const s=n(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-68d819e8"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"jTDXRPBFVGKTrwt8tOS4W"},{url:"/_next/static/chunks/commons.f360b5b16fa795e42fd3.js",revision:"6888958dd033eb4ce36af9118da84b1e"},{url:"/_next/static/chunks/e82996df.a53bde9cd0b0a9866bf5.js",revision:"c19ac0ace6811a3e94dc9ac6e7f2a274"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.e75b6df0d5d4fde3f463.js",revision:"9c12f337f499e49bbea58ecbb1f242ad"},{url:"/_next/static/chunks/framework.1daf1ec1ecf144ee9147.js",revision:"464131074277806cc6187e6c0f264c8e"},{url:"/_next/static/chunks/main-c492e8898eba0f28158f.js",revision:"3277893d3dda2f0660c9cac55aa11d51"},{url:"/_next/static/chunks/pages/_app-9acf1dd7843b827136a4.js",revision:"a7acf70a79f08e83f5a058cee79a60a9"},{url:"/_next/static/chunks/pages/_error-56dc58b7598aa79d4584.js",revision:"0520e0ff91b8c009597d2431114a2fc5"},{url:"/_next/static/chunks/pages/index-c394bcf4ff768fa4b8d2.js",revision:"80eed816711c0d670889879b75d6aecc"},{url:"/_next/static/chunks/polyfills-b14b5a3c1c7e241af98d.js",revision:"89277afefacc4f2b24b677d80e6dad83"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"2019297a9ccffe0e261600bad1b1f98a"},{url:"/_next/static/jTDXRPBFVGKTrwt8tOS4W/_buildManifest.js",revision:"87293dd8a5401077dc58e9f149671715"},{url:"/_next/static/jTDXRPBFVGKTrwt8tOS4W/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
