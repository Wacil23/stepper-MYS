export interface ICartInput {
  attributes?: AttributeInput[];
  buyerIdentity?: CartBuyerIdentityInput;
  discountCodes?: string;
  giftCardCodes?: string;
  lines?: CartLineInput[];
  note?: string;
}


export interface CartLineInput {
  attributes?: AttributeInput[];
  merchandiseId?: string;
  quantity?: number;
  sellingPlanId?: string;
}

export interface AttributeInput {
  key?: string;
  value?: string;
}

export interface CartBuyerIdentityInput {
  companyLocationId?: string;
  countryCode?: string;
  email?: string;
  phone?: string;
}

export interface ICart {
  cartCreate: {
    cart: {
      checkoutUrl: string;
      id: string;
      totalQuantity: string;
    };
  };
}
