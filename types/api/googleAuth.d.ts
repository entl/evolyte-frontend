export type GoogleOAuth2TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  scope: string;
};

export type GoogleUserInfoResponse = {
  sub: string;
  name: string;
  given_name: string;
  family_name?: string | null;
  picture: string;
  email: string;
  email_verified: boolean;
};

export type GoogleOAuth2Response = {
  user: GoogleUserInfoResponse;
  tokens: GoogleOAuth2TokenResponse;
};

export type GoogleUserInfoErrorResponse = {
  error: string;
  error_description: string;
  error_uri: string;
};

export type GoogleOAuth2TokenErrorResponse = {
  error: string;
  error_description: string;
  error_uri: string;
};
