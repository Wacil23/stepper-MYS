import { Form } from "@remix-run/react";
import { Page, Card, Button, Layout } from "@shopify/polaris";

export default function TranslationsPage() {
  return (
    <Page title="Manage Translations">
      <Form method="post">
        <Card>
          <p>
            Gérez vos différentes traductions pour chaque locale. Si aucune
            traduction n’existe pour un champ, laissez vide.
          </p>
          <Layout>
            <Layout.Section></Layout.Section>
          </Layout>
        </Card>

        <div style={{ marginTop: "1rem" }}>
          <Button submit>Save Translations</Button>
        </div>
      </Form>
    </Page>
  );
}
