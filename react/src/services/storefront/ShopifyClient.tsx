import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: "https://mysadaka.fr",
  apiVersion: "2025-01",
  publicAccessToken: "e0708cbad51d6ffd457eed2bae84fa6c"
});
