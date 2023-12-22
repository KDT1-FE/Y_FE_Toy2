export interface ClientRefresh {
  accessToken: string;
}

export interface ClientAccessToken {
  refreshToken: string;
}

export interface UserId {
  id: string;
}

export interface UserPW {
  password: string;
}

export interface UserLogin extends UserId, UserPW {}

export interface UserLoginResponse {
  accessToken: string;
  refreshToken: string;
}
