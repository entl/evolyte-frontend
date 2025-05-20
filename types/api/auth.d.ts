export type TokenPayload = {
  user_id: number; // User ID
  sub: "access" | "refresh"; // Token type
  exp: number; // Expiration time of the token (epoch seconds)
};

export type TokenPairResponse = {
  access_token: string; // Token
  refresh_token?: string; // Token (optional)
  token_type: string; // Type of token, e.g., "bearer"
};

export type RefreshTokenRequest = {
  refresh_token: string; // Token
};

export type VerifyTokenRequest = {
  access_token: string; // Token
};