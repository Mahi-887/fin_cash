export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}
