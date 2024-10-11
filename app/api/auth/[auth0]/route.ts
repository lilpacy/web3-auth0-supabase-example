import {
  type AfterCallbackAppRoute,
  type Session,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createProvider } from '@/lib/web3auth';

const afterCallback: AfterCallbackAppRoute = async (
  req: NextRequest,
  session: Session
) => {
  /* ========== supabase ========== */
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  if (!process.env.SUPABASE_JWT_SECRET) {
    throw new Error('SUPABASE_JWT_SECRET environment variable is not set');
  }
  session.user.access_token = jwt.sign(
    payload,
    process.env.SUPABASE_JWT_SECRET
  );

  /* ========== web3auth ========== */
  const provider = await createProvider(session.idToken);
  if (!provider) throw new Error('Failed to create provider');
  const eth_public_keyes = (await provider.request({
    method: 'eth_accounts',
  })) as string[];
  const eth_private_key = await provider.request({
    method: 'eth_private_key',
  });
  session.user.eth_public_key = eth_public_keyes[0];
  session.user.eth_private_key = eth_private_key;

  return session;
};

export const GET = handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await handleCallback(req, res, {
        afterCallback,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
      }
      return new Response('An unknown error occurred.', { status: 500 });
    }
  },
});
