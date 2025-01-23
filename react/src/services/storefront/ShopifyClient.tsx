import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: "https://mysadaka.fr",
  apiVersion: "2024-10",
  publicAccessToken: "e0708cbad51d6ffd457eed2bae84fa6c"
});
