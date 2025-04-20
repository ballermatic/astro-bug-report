// src/env.d.ts

/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

// Define the expected shape of your Cloudflare environment variables
interface Env {
  LOXO_API_KEY: string;
  LOXO_AGENCY_SLUG: string;
  // Add other bindings like KV namespaces, D1 databases, etc., if you use them
}

// Augment the 'Platform' type definition within Astro's APIContext using App namespace
// This is the recommended method for adapter type augmentation
// declare namespace App {
//   interface Platform {
//     env: Env;
//     context: {
//       waitUntil(promise: Promise<any>): void;
//     };
//     caches: CacheStorage & { default: Cache };
//     // Add other Cloudflare runtime properties if needed
//   }

//   // interface Locals { /* Augment Locals if needed */ }
// }

// Ensure the old Astro namespace augmentation is commented out or removed
/*
declare namespace Astro {
  interface APIContext {
    platform?: { ... };
  }
}
*/
