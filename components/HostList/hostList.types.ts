export interface Host {
  id: string;
  location: string;
  address?: string;
  description?: string;
  service?: string;
}
export interface UserList {
  id: string;
  name: string;
  picture: string;
}

export interface HostUser extends Host, UserList {
  id: string;
  name: string;
  picture: string;
  address?: string;
  description?: string;
  service?: string;
}
