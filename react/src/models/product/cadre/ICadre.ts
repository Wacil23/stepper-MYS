export interface IProductCadre {
  product: ICadre;
}

export interface ICadre {
  title: string;
  id: string;
  vendor: string;
  images: ICadreNodes<ICadreImage[]>;
  variants: ICadreNodes<ICadreVariants[]>;
}

/** START : IMAGES QUERY **/
export interface ICadreNodes<T> {
  nodes: T;
}
export interface ICadreImage {
  altText?: string | null;
  height: number;
  id: string;
  src: string;
  url: string;
  width: number;
}
/** END : IMAGES QUERY **/

/** START : VARIANTS QUERY **/
export interface ICadreVariants {
  id: string;
  price: {
    amount: number;
    currencyCode: string;
  };
}
/** END : VARIANTS QUERY **/
