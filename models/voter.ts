export default interface Voter {
  id: number;
  nic: string;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  Electorate?: { name: string; ElectorateDistrict?: { name: string } };
}
