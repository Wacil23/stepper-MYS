/* NO MANUAL CHANGES IS ALLOWED */

export type BeneficiariesCreationModel =
  | { productType: "wheelchair"; beneficiaries: BeneficiaryCreationModel[] }
  | { productType: "quran"; beneficiaries: BeneficiaryQuranCreationModel[] }
  | { productType: "omra"; beneficiaries: BeneficiaryOmraCreationModel[] }
  | { productType: "omraRamadan"; beneficiaries: BeneficiaryOmraCreationModel[] };


export type BeneficiaryCreationModel = {
  /**
   * Entire name of the beneficiary
   * @exemple " Muhammad Al Muni "
   */
  name: string;
  /**
   * Gender of the beneficiary
   * @example " homme "
   */
  gender:string;
  /**
   * Current status of the beneficiary
   * @example "Malade"
   */
  status: string;
  /**
   * Number of wheelchair for the beneficiary
   */
  wheelchairCount: number;

  wheelchairSelection: number | 'custom';
  /**
   * Type of frame for the proof
   */
  frameType: 'mail' | 'qr';
  /**
   * Is the beneficiary valid
   */
  isValid: boolean;
  /**
   * The price of product
   */
  price: number,
}
export type BeneficiaryQuranCreationModel = {
  /**
   * Entire name of the beneficiary
   * @exemple " Muhammad Al Muni "
   */
  name: string;
  /**
   * Gender of the beneficiary
   * @example " homme "
   */
  gender:string;
  /**
   * Current status of the beneficiary
   * @example "Malade"
   */
  status: string;
  /**
   * Number of wheelchair for the beneficiary
   */
  quranCount: number;

  quranSelection: number | 'custom';
  /**
   * Type of frame for the proof
   */
  frameType: 'mail' | 'qr';
  /**
   * Is the beneficiary valid
   */
  isValid: boolean;
  /**
   * The price of product
   */
  price: number,
}
export type BeneficiaryOmraCreationModel = {
  /**
   * Entire name of the beneficiary
   * @exemple " Muhammad Al Muni "
   */
  name: string;
  /**
   * Entire father name of the beneficiary
   * @exemple " Muhammad Al Muni "
   */
  fatherName: string;
  /**
   * Gender of the beneficiary
   * @example " homme "
   */
  gender:string;
  /**
   * Current status of the beneficiary
   * @example "Malade"
   */
  status: string;
  /**
   * Number of wheelchair for the beneficiary
   */
  omraCount: number;

  omraSelection: number | 'custom';
  /**
   * Type of frame for the proof
   */
  frameType: 'mail' | 'qr';
  /**
   * Is the beneficiary valid
   */
  isValid: boolean;
  /**
   * The price of product
   */
  price: number,
}


