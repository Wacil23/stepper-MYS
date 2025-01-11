// app/routes/stepper.tsx
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  // On récupère le shop de l'URL
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  // Vérification simple de sécurité
  if (!shop) {
    throw new Response("Shop parameter is required", { status: 400 });
  }

  try {
    // Vous pouvez décommenter ceci une fois que tout fonctionne
    // await authenticate.public.checkRequest(request);

    const script = `
      (() => {
        function loadStepper() {
          const container = document.getElementById('product-stepper');
          if (!container) {
            console.warn('Stepper container not found. Will retry...');
            // Retry after a short delay
            setTimeout(loadStepper, 100);
            return;
          }

          console.log('Initializing stepper...');
          const productId = container.dataset.productId;
          const shopUrl = container.dataset.shopUrl;

          // Vérification des données requises
          if (!productId || !shopUrl) {
            console.error('Missing required data attributes');
            return;
          }

          // Ici nous initialiserons notre composant React
          console.log('Stepper ready with:', { productId, shopUrl });
        }

        // Démarrer le chargement quand le DOM est prêt
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadStepper);
        } else {
          loadStepper();
        }
      })();
    `;

    return new Response(script, {
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        // Désactiver le cache pendant le développement
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
  } catch (error) {
    console.error('Error serving stepper script:', error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

