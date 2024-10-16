import { Web3Auth } from '@web3auth/node-sdk';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { IProvider } from '@web3auth/base';

export const web3auth = new Web3Auth({
  clientId: process.env.WEB3AUTH_CLIENT_ID!, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: 'sapphire_devnet', // Get your Network from Web3Auth Dashboard
});

export const ethereumProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: {
      chainNamespace: 'eip155',
      chainId: '0x1',
      rpcTarget: 'https://rpc.ankr.com/eth',
    },
  },
});

export const createProvider: (
  sub: string,
  idToken?: string
) => Promise<IProvider | null> = async (sub, idToken) => {
  if (!sub) throw new Error('No sub provided');
  if (!idToken) throw new Error('No idToken provided');
  web3auth.init({ provider: ethereumProvider });
  const provider = await web3auth.connect({
    verifier: process.env.WEB3AUTH_VERIFIER_NAME!, // replace with your verifier name
    verifierId: sub, // replace with your verifier id's value, for example, sub value of JWT Token, or email address.
    idToken: idToken, // replace with your newly created unused JWT Token.
  });
  return provider;
};
