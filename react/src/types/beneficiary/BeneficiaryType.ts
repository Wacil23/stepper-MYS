export type BeneficiaryRequestType = {
  beneficiaries: {
    status: string;
    gender: 'homme' | 'femme';
    name: string;
  }[]
}
