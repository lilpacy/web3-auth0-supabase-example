import {
  type AfterCallbackAppRoute,
  type Session,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback: AfterCallbackAppRoute = (
  req: NextRequest,
  session: Session
) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  if (!process.env.SUPABASE_SIGNING_SECRET) {
    throw new Error('SUPABASE_SIGNING_SECRET environment variable is not set');
  }
  session.user.accessToken = jwt.sign(
    payload,
    process.env.SUPABASE_SIGNING_SECRET
  );
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
