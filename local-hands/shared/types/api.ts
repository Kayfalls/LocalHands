export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: "bearer";
}

export interface ProfileCreate {
  name: string;
  email: string;
}

export interface JobCreate {
  title: string;
  description: string;
  location: string;
}
