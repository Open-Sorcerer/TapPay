import { createWalletClient, http, parseEther } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

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
  const privateKey = generatePrivateKey();
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
export { sendTransactionFromKey, createNewWallet, getSigner };
