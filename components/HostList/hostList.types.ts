export interface FirebaseData {
  id: string;
  location: string;
  address: string;
  description: string;
  service: string;
}
export interface ApiData {
  id: string;
  name: string;
  picture: string;
}

export interface Host extends FirebaseData, ApiData {}
