/*
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
*/
type RenewTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  id_token: string;
  token_type: string;
};

export const renewTokens: (
  refreshToken: string
) => Promise<RenewTokenResponse> = async refreshToken => {
  // console.log({
  //   AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
  //   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  //   AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  // });
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        refresh_token: refreshToken,
      }),
    }
  );
  // console.log({ response });
  const data = await response.json();
  return data as RenewTokenResponse;
};
