import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Form,
  useFetcher,
} from "@remix-run/react";
import { useState } from "react";
// Polaris (ou autre UI)
import {
  Page,
  Card,
  TextField,
  Select,
  Button,
  Layout,
  Banner,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";
import {
  getTranslationsMetafield,
  saveTranslationsMetafield,
} from "app/models/metafieldTranslations.server";

// Les clés de traduction qu'on souhaite gérer
const TRANSLATION_KEYS = ["title", "description", "recommendationText"];

const AVAILABLE_LANGUAGES = [
  { label: "English (en)", value: "en" },
  { label: "French (fr)", value: "fr" },
  { label: "German (de)", value: "de" },
  { label: "Spanish (es)", value: "es" },
  // Ajoute d'autres si nécessaire
];

export const loader: LoaderFunction = async ({ request }) => {
  // Protéger l’accès : l’utilisateur doit être admin
  const { admin } = await authenticate.admin(request);

  // Lire le JSON complet des traductions depuis le metafield
  // Format attendu :
  // {
  //   "en": { "title": "...", "description": "...", ... },
  //   "fr": { "title": "...", "description": "...", ... },
  //   ...
  // }
  const translations = await getTranslationsMetafield(admin);

  return Response.json({ translations });
};

type ActionData = {
  error?: string;
  success?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const formData = await request.formData();

  // On reçoit tout le JSON ou on reconstruit manuellement ?

  // 1) On reconstruit un objet:
  //    "locale|key" => "value"
  // Ex: "en|title" => "Hello"
  //     "fr|title" => "Bonjour"
  // On va itérer sur formData pour tout regrouper.

  // On commence par relire l'existant
  let existing = await getTranslationsMetafield(admin);
  if (!existing) existing = {};

  // On update localement
  for (const [fieldName, fieldValue] of formData.entries()) {
    // champs hidden internes ?
    if (typeof fieldValue !== "string") continue;
    if (!fieldName.includes("|")) continue;
    // fieldName ex: "en|title"
    const [locale, key] = fieldName.split("|");
    if (!locale || !key) continue;

    // On s'assure qu'il y a un objet pour la locale
    if (!existing[locale]) {
      existing[locale] = {};
    }
    existing[locale][key] = fieldValue;
  }

  // On sauvegarde dans le metafield
  try {
    await saveTranslationsMetafield(admin, existing);
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to save translations" },
      { status: 500 },
    );
  }
};

export default function TranslationsPage() {
  const { translations } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();

  // "Ajouter une langue" : on gère ça en local
  // On va lister les locales trouvées dans `translations`, plus
  // toute locale qu'on ajoute manuellement
  const [locales, setLocales] = useState(() => {
    // ex: ["en", "fr"]
    return Object.keys(translations);
  });
  const [newLang, setNewLang] = useState("");

  // Gérer l'ajout d'une nouvelle langue
  const handleAddLanguage = () => {
    if (!newLang) return;
    if (!locales.includes(newLang)) {
      setLocales([...locales, newLang]);
    }
    // réinitialiser le select
    setNewLang("");
  };

  return (
    <Page title="Manage Translations">
      {actionData?.error && <Banner title="Error">{actionData.error}</Banner>}
      {actionData?.success && (
        <Banner title="Success">Translations saved successfully!</Banner>
      )}
      <Form method="post">
        <Card>
          <p>
            Gérez vos différentes traductions pour chaque locale. Si aucune
            traduction n’existe pour un champ, laissez vide.
          </p>
          <Layout>
            <Layout.Section>
              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}
              >
                <Select
                  label="Add a language"
                  labelHidden
                  options={[
                    { label: "Choose...", value: "" },
                    ...AVAILABLE_LANGUAGES,
                  ]}
                  value={newLang}
                  onChange={(val) => setNewLang(val)}
                />
                <Button onClick={handleAddLanguage}>Add</Button>
              </div>
            </Layout.Section>
          </Layout>

          {locales.map((locale) => (
            <Card key={locale}>
              {TRANSLATION_KEYS.map((key) => {
                const existingVal = translations[locale]?.[key] || "";
                return (
                  <TextField
                    key={key}
                    label={key}
                    labelHidden={false}
                    name={`${locale}|${key}`} // important: "en|title"
                    autoComplete="off"
                    value={existingVal}
                  />
                );
              })}
            </Card>
          ))}
        </Card>

        <div style={{ marginTop: "1rem" }}>
          <Button submit>Save Translations</Button>
        </div>
      </Form>
    </Page>
  );
}
