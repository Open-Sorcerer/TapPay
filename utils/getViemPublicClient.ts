import { createPublicClient, http } from "viem";
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
} from "viem/chains";

function getChain(chainID: number) {
  switch (chainID) {
    case 1:
      return mainnet;
    case 137:
      return polygon;
    case 56:
      return bsc;
    case 43114:
      return avalanche;
    case 42161:
      return arbitrum;
    case 10:
      return optimism;
    case 8453:
      return base;
  }
}

export default function getViemPublicClient(chainID: number) {
  const publicClient = createPublicClient({
    chain: getChain(chainID),
    transport: http(),
  });
  return publicClient;
}
