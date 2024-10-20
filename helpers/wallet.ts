import { Buffer } from "buffer"; // Import Buffer polyfill for environments without native Buffer support
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as Bip39 from "bip39";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";

// Solana network setup
const SOLANA_RPC_URL = "https://rpc.devnet.soo.network/rpc";
const connection = new Connection(SOLANA_RPC_URL);
global.Buffer = global.Buffer || Buffer;

// Function to send a transaction on Solana
const sendTransactionFromKey = async (
  encryptedKey: string,
  password: string
) => {
  // Decrypt the private key using the API
  const privateKey = await decryptKey(password, encryptedKey);

  // Create a Keypair from the decrypted private key
  const keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(privateKey)));

  console.log("Sender address:", keypair.publicKey.toBase58());

  // Define the receiver address
  const toAddress = new PublicKey(
    "5VnRtyXfXPUF7jw5ZjNHuHgVv7KhAxgxbHgTpRzvuLr5"
  ); // Replace with your destination address

  // Create a transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: toAddress,
      lamports: LAMPORTS_PER_SOL * 0.0001, // Sending 0.0001 SOL
    })
  );

  // Send the transaction
  const signature = await connection.sendTransaction(transaction, [keypair]);
  console.log("Transaction signature:", signature);

  // Wait for confirmation
  await connection.confirmTransaction(signature);

  return signature;
};

// Function to get signer (keypair) from private key
const getSigner = async (encryptedKey: string, password: string) => {
  // Decrypt the private key using the API
  const privateKey = await decryptKey(password, encryptedKey);
  const keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(privateKey)));
  return keypair;
};

const createNewWallet = async (password: string) => {
  try {
    console.log("Creating new wallet...");

    const mnemonic = Bip39.generateMnemonic();
    const seed = Bip39.mnemonicToSeedSync(mnemonic, "").slice(0, 32);
    const keypair = Keypair.fromSeed(seed);

    console.log("New wallet address:", keypair.publicKey.toBase58());

    if (!keypair) {
      console.error("Failed to generate a keypair");
      return;
    }

    // Convert the secretKey to a JSON stringified array for encryption
    const privateKey = JSON.stringify(Array.from(keypair.secretKey));

    const user = Keypair.fromSecretKey(new Uint8Array(JSON.parse(privateKey)));
    console.log("User address:", user.publicKey.toBase58());
    console.log("Private key (un-encrypted):", privateKey);
    // Encrypt the private key using the API
    const encryptedKey = await encryptKey(password, privateKey);

    if (!encryptedKey) {
      console.error("Failed to encrypt the private key");
      return;
    }

    console.log("Encrypted private key:", encryptedKey);

    // Return the new wallet address and the encrypted private key
    return {
      address: keypair.publicKey.toBase58(),
      encryptedKey: encryptedKey,
    };
  } catch (error) {
    console.error("Error in createNewWallet function:", error);
  }
};

// Function to encrypt a private key via an API
const encryptKey = async (password: string, privateKey: string) => {
  console.log("Encrypting private key...");
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
  console.log("Encrypted key:", encrypted);
  return encrypted;
};

// Function to decrypt a private key via an API
const decryptKey = async (password: string, encryptedData: string) => {
  const apiResponse = await fetch("https://nfc-encryption.vercel.app/decrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      encryptedData: encryptedData,
      password,
    }),
  });

  const { decrypted } = await apiResponse.json();
  return decrypted;
};

// Transaction execution function
const executeTransaction = async (
  encryptedKey: string,
  password: string,
  toAddress: string = "FVP39NNZMKfEDzbg3BWWZEiYPH3wyFp5kmtuN3M2AZFo", // Default receiver
  amount: number
) => {
  // Decrypt the private key using the API
  const privateKey = await decryptKey(password, encryptedKey);
  const keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(privateKey)));

  // Create and send the transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: new PublicKey(toAddress),
      lamports: LAMPORTS_PER_SOL * amount, // Convert SOL amount to lamports
    })
  );

  const signature = await connection.sendTransaction(transaction, [keypair]);

  const link = `https://explorer.devnet.soo.network/tx/${signature}`;
  Toast.show({
    text1: "Payment Successful",
    type: "success",
    position: "bottom",
    onPress() {
      console.log("Link to transaction explorer");
      Linking.openURL(link).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    },
  });
  console.log("Transaction signature:", signature);

  // Wait for confirmation
  await connection.confirmTransaction(signature);

  return signature;
};

export {
  sendTransactionFromKey,
  createNewWallet,
  getSigner,
  executeTransaction,
};
