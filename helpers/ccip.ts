import {
  createPublicClient,
  http,
  createWalletClient,
  getContract,
} from "viem";
import { base, baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import {
  ccipABI,
  ccipBaseSepolia,
  usdcBaseABI,
  usdcBaseSepolia,
  usdcProxyBaseSepolia,
  usdcProxyBaseSepoliaABI,
} from "./const";

const privateKey =
  "0x631ab6a8758f62accdcca906ed0ec03aa40e3ca4b91def7858996e6f45bba2d9";
const account = privateKeyToAccount(privateKey);

console.log(account.address);
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});

async function useCCIP() {
  // write the approval thing from USDC contract

  // executing the contract

  const ccipBaseContract = getContract({
    address: ccipBaseSepolia, // the contract only works for Base to Avax
    abi: ccipABI,
    client: walletClient,
  });

  const sent = await ccipBaseContract.write.sendMessagePayLINK([
    "14767482510784806043", // avax chain id  https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#avalanche-fuji
    account.address, // receiver
    "hey", // message
    "0x036cbd53842c5426634e7929541ec2318f3dcf7e", // usdc contract address
    0.1 * 10 ** 6, // amount
  ]);

  console.log(sent);
}
