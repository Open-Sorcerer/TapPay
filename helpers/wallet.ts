import { PRIVATE_KEY } from "@/secrets";
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseEther,
  parseUnits,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { buildTransaction } from "./fusion";
import {
  ccipABI,
  ccipBaseSepolia,
  usdcBaseABI,
  usdcBaseSepolia,
  usdcProxyBaseSepolia,
  usdcProxyBaseSepoliaABI,
} from "./const";
import { waitForTransactionReceipt } from "viem/_types/actions/public/waitForTransactionReceipt";

const sendTransactionFromKey = async (key: string, password: string) => {
  const privateKey = await decryptKey(password, key);

  const account = privateKeyToAccount(privateKey as `0x${string}`);

  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });

  console.log(account.address);

  const hash = await client.sendTransaction({
    to: "0x3039e4a4a540F35ae03A09f3D5A122c49566f919",
    value: parseEther("0.0001"),
  });

  console.log(hash);

  return hash;
};

const getSigner = async (key: string, password: string) => {
  const privateKey = await decryptKey(password, key);
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return account;
};

const createNewWallet = async (password: string) => {
  // const privateKey = generatePrivateKey();
  const privateKey = PRIVATE_KEY;
  const account = privateKeyToAccount(privateKey);
  const encryptedKey = await encryptKey(password, privateKey);

  return {
    address: account.address,
    encryptedKey: encryptedKey,
  };
};

const decryptKey = async (password: string, encodedData: string) => {
  const apiResponse = await fetch("https://nfc-encryption.vercel.app/decrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      encryptedData: encodedData,
      password,
    }),
  });

  const { decrypted } = await apiResponse.json();

  return decrypted;
};

const encryptKey = async (password: string, privateKey: string) => {
  const apiResponse = await fetch("https://nfc-encryption.vercel.app/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: privateKey,
      password,
    }),
  });

  const { encrypted } = await apiResponse.json();

  return encrypted;
};

const executeTransaction = async (
  key: string,
  password: string,
  toAddress: string = "0x3039e4a4a540F35ae03A09f3D5A122c49566f919",
  amount: number,
  toToken?: string,
  toChain?: number,
  receiveChain?: number,
  token?: string
) => {
  const privateKey = await decryptKey(password, key);

  const account = privateKeyToAccount(privateKey as `0x${string}`);

  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  console.log("client", walletClient);

  // get approval for usdc token on baseSepolia

  const approveUSDC = getContract({
    address: usdcProxyBaseSepolia,
    abi: usdcProxyBaseSepoliaABI,
    client: walletClient,
  });

  const hash = await approveUSDC.write.approve([
    ccipBaseSepolia,
    parseUnits(amount.toString(), 6),
  ]);

  console.log("approve", hash);

  // wait for approval to be confirmed
  await publicClient.waitForTransactionReceipt({
    hash,
  });

  // execute the transaction
  const executeTransaction = await walletClient.writeContract({
    address: ccipBaseSepolia,
    abi: ccipABI,
    functionName: "sendMessagePayLINK",
    args: [
      "14767482510784806043",
      toAddress,
      "MagicSpend",
      "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
      parseUnits(amount.toString(), 6),
    ],
  });

  console.log("execute", executeTransaction);

  return executeTransaction;
};
export {
  sendTransactionFromKey,
  createNewWallet,
  getSigner,
  executeTransaction,
};
