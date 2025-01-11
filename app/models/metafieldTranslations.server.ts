import { AdminApiContextWithoutRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
// app/models/metafieldTranslations.server.ts

const NAMESPACE = "mysadaka";
const KEY = "translations";

// Lire le metafield
export async function getTranslationsMetafield(admin: AdminApiContextWithoutRest) {
  const query = `#graphql
    query {
      metafield(namespace: "${NAMESPACE}", key: "${KEY}") {
        id
        value
      }
    }
  `;
  const resp = await admin.graphql(query);
  const data = await resp.json();
  const value = data?.data?.metafield?.value;
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

// Enregistrer / mettre à jour
export async function saveTranslationsMetafield(admin: AdminApiContextWithoutRest, translations: any) {
  const mutation = `#graphql
    mutation upsertMetafield($input: MetafieldInput!) {
      metafieldUpsert(input: $input) {
        metafield {
          id
          namespace
          key
          type
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      namespace: NAMESPACE,
      key: KEY,
      type: "json", // Shopify permet 'json'
      value: JSON.stringify(translations),
    },
  };
  const resp = await admin.graphql(mutation, { variables });
  const data = await resp.json();
  const errors = data?.data?.metafieldUpsert?.userErrors;
  if (errors?.length) {
    throw new Error("MetafieldUpsert error: " + JSON.stringify(errors));
  }
  // sinon tout va bien
}
