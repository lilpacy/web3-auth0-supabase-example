import {
  type AfterCallbackAppRoute,
  type Session,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { Web3Auth } from '@web3auth/node-sdk';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

const web3auth = new Web3Auth({
  clientId:
    'BMHtOClEhyyzgsbLlWWucA4quav7IjqIIXwM9-aWaoRM-a45UZZd5R0DodBkwQv7bN9IvRL0eU0gXwGgnNeRjLQ', // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: 'sapphire_devnet', // Get your Network from Web3Auth Dashboard
});

const ethereumProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: 'eip155',
      chainId: '0x1',
      rpcTarget: 'https://rpc.ankr.com/eth',
    },
  },
});

const afterCallback: AfterCallbackAppRoute = async (
  req: NextRequest,
  session: Session
) => {
  /* ========== supabase ========== */
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
  console.log('idToken', session.idToken);

  /* ========== web3auth ========== */
  web3auth.init({ provider: ethereumProvider });
  const provider = await web3auth.connect({
    verifier: 'node-sdk-test', // replace with your verifier name
    verifierId: 'revivedtomorrow@gmail.com', // replace with your verifier id's value, for example, sub value of JWT Token, or email address.
    idToken: session.idToken || '', // replace with your newly created unused JWT Token.
  });
  const eth_public_keyes = (await provider!.request({
    method: 'eth_accounts',
  })) as string[];
  session.user.eth_public_key = eth_public_keyes[0];
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
