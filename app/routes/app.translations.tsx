import { ActionFunctionArgs, json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Card,
  Page,
  Layout,
  TextField,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { getTranslations, updateTranslation } from "app/translations.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const translations = await getTranslations(session.shop, "fr");
  return json({ translations });
}

export async function action({ request }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  await updateTranslation(
    session.shop,
    formData.get("key") as string,
    formData.get("locale") as string,
    formData.get("value") as string
  );

  return json({ success: true });
}

export default function TranslationsPage() {
  const { translations } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleTranslationUpdate = (key: string, value: string) => {
    const formData = new FormData();
    formData.append("key", key);
    formData.append("locale", "fr");
    formData.append("value", value);
    submit(formData, { method: "post" });
  };

  return (
    <Page title="Translations">
      <Layout>
        <Layout.Section>
          <Card>
            {translations.map((translation) => (
              <TextField
                key={translation.key}
                label={translation.key}
                value={translation.value}
                onChange={(value) =>
                  handleTranslationUpdate(translation.key, value)
                }
                autoComplete="off"
              />
            ))}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
