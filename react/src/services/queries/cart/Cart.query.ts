import { ICart, ICartInput } from "../../../models/cart/ICart";
import { client } from "../../storefront/ShopifyClient";



export async function createCart(input: ICartInput): Promise<ICart> {
  try {
    const cartMutation = `
      mutation CartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl,
            id,
            totalQuantity,
          }
        }
      }
    `;
    const variables = { input };
    const response = await client.request<ICart>(cartMutation, {
      variables,
    });
    const { data, errors } = response;
    if (!data) {
      throw new Error("Impossible de créer un panier");
    }
    if (errors) {
      throw new Error(errors.message);
    }

    return data;
  } catch (error) {
    throw Error(`Erreur lors de la récupération : ${error}`);
  }
}
