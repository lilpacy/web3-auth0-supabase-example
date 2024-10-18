import { renewTokens } from '@/lib/auth0';
import { getPrivateKey } from '@/lib/web3auth';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
  /* ========== get session ========== */
  const { user, refreshToken } = (await getSession()) || {
    user: undefined,
    refreshToken: undefined,
  };
  // console.log({ user, refreshToken });
  if (!user || !refreshToken) {
    return Response.error();
  }

  /* ========== renew tokens ========== */
  const { access_token, id_token } = await renewTokens(refreshToken);
  // console.log({ access_token, id_token });
  if (!access_token || !id_token) {
    return Response.error();
  }

  /* ========== get private key ========== */
  const privateKey = await getPrivateKey(user.sub, id_token);
  // console.log({ privateKey });
  if (!privateKey) {
    return Response.error();
  }

  return Response.json({ privateKey });
}
