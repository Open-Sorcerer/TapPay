import { create } from "zustand";
import { BridgeToken, Chain, CHAINS } from "../utils/dlnTypes";

interface IBridge {
  tokens: null | BridgeToken[];
  srcChain: Chain;
  dstChain: Chain;
  srcToken: BridgeToken;
  dstToken: BridgeToken;
  srcAmount: string;
  dstAmount: string;
  sender: string;
  receiver: string;
  txHash: null | string;
  error: boolean;
  gasFees: number | null;
  txData: any | null;
  orderID: string | null;
  selectedTokenMaxAmount: string;
  setTokens: (tokens: BridgeToken[]) => void;
  setSrcChain: (srcChain: Chain) => void;
  setDstChain: (dstChain: Chain) => void;
  setSrcToken: (srcToken: BridgeToken) => void;
  setDstToken: (dstToken: BridgeToken) => void;
  setSrcAmount: (srcAmount: string) => void;
  setDstAmount: (dstAmount: string) => void;
  setSender: (sender: string) => void;
  setReceiver: (receiver: string) => void;
  setTxHash: (txHash: string | null) => void;
  setError: (error: boolean) => void;
  setGasFees: (gasFees: number | null) => void;
  setTxData: (txData: any | null) => void;
  setOrderID: (orderID: string | null) => void;
  setSelectedTokenMaxAmount: (selectedTokenMaxAmount: string) => void;
}

const useBridgeStore = create<IBridge>((set) => ({
  tokens: null,
  srcChain: CHAINS[2],
  dstChain: CHAINS[0],
  selectedTokenMaxAmount: "",
  srcToken: {
    address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    decimals: 6,
    image:
      "https://tokens.1inch.io/0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.png",
    name: "USD Coin",
    symbol: "USDC",
  },
  dstToken: {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    name: "USD Coin",
    symbol: "USDC",
  },
  srcAmount: "",
  dstAmount: "",
  sender: "",
  receiver: "",
  txHash: null,
  error: false,
  gasFees: null,
  txData: null,
  orderID: null,
  setTokens: (tokens) =>
    set({
      tokens: tokens,
    }),
  setSrcChain: (srcChain) =>
    set({
      srcChain: srcChain,
    }),
  setDstChain: (dstChain) =>
    set({
      dstChain: dstChain,
    }),
  setSrcToken: (srcToken) =>
    set({
      srcToken: srcToken,
    }),
  setDstToken: (dstToken) =>
    set({
      dstToken: dstToken,
    }),
  setSrcAmount: (srcAmount) =>
    set({
      srcAmount: srcAmount,
    }),
  setDstAmount: (dstAmount) =>
    set({
      dstAmount: dstAmount,
    }),
  setSender: (sender) =>
    set({
      sender: sender,
    }),
  setReceiver: (receiver) =>
    set({
      receiver: receiver,
    }),
  setTxHash: (txHash) =>
    set({
      txHash: txHash,
    }),
  setError: (error) =>
    set({
      error: error,
    }),
  setGasFees: (gasFees) =>
    set({
      gasFees: gasFees,
    }),
  setTxData: (txData) =>
    set({
      txData: txData,
    }),
  setOrderID: (orderID) =>
    set({
      orderID: orderID,
    }),
  setSelectedTokenMaxAmount: (selectedTokenMaxAmount) =>
    set({
      selectedTokenMaxAmount: selectedTokenMaxAmount,
    }),
}));

export default useBridgeStore;
