/* NO MANUAL CHANGES IS ALLOWED */

export type BeneficiariesCreationModel = {
  /**
   * Array of beneficiary
   */
  beneficiaries: BeneficiaryCreationModel[]
}

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
  gender: 'homme' | 'femme';
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
}


