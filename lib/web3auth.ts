import { Web3Auth } from '@web3auth/node-sdk';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

export const web3auth = new Web3Auth({
  clientId:
    'BMHtOClEhyyzgsbLlWWucA4quav7IjqIIXwM9-aWaoRM-a45UZZd5R0DodBkwQv7bN9IvRL0eU0gXwGgnNeRjLQ', // Get your Client ID from Web3Auth Dashboard
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

export const createProvider = async (idToken?: string) => {
  if (!idToken) {
    throw new Error('No idToken provided');
  }
  web3auth.init({ provider: ethereumProvider });
  const provider = await web3auth.connect({
    verifier: 'node-sdk-test', // replace with your verifier name
    verifierId: 'revivedtomorrow@gmail.com', // replace with your verifier id's value, for example, sub value of JWT Token, or email address.
    idToken: idToken, // replace with your newly created unused JWT Token.
  });
  return provider;
};
