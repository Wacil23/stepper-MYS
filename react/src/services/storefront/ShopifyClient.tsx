import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: "https://mysadaka.fr",
  apiVersion: "2024-10",
  publicAccessToken: "7847d8facb747bc7291cb4707cf2d855"
});
