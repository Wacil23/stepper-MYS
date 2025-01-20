import { IProductCadre } from "../../../models/product/cadre/ICadre";
import { client } from "../../storefront/ShopifyClient";



export async function getCadreProduct(id: string): Promise<IProductCadre> {
  const productQuery = `
      query ProductQuery($id: ID!) {
        product(id: $id) {
            id,
            title,
            vendor,
            variants(first: 3){
              nodes{
                id,
                price {
                  amount
                  currencyCode
                }
              }
            }
            images(first: 5) {
                nodes {
                    altText,
                    height,
                    id,
                    url,
                    width,
                    src
                }

            }
        }
      }
    `;
  const variables = { id };

  try {
    const response = await client.request<IProductCadre>(productQuery, {
      variables,
    });
    const { data, errors } = response;
    if (errors) {
      if (errors.graphQLErrors) {
        throw new Error(
          errors.graphQLErrors.map((err) => err.message).join(" ")
        );
      }
      throw new Error(errors.message);
    }
    if (!data) {
      throw Error("Aucun produit trouvé");
    }
    return data;
  } catch (error) {
    throw Error(`Erreur lors de la récupération : ${error}`);
  }
}
