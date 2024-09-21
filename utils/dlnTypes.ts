export enum ChainType {
  EVM = "EVM",
}

export interface Chain {
  chainId: number;
  type: ChainType;
  name: string;
  symbol: string;
  image: string;
  rpc: string;
  explorer: string;
  minimumBalance: number;
  DLNFee: number;
}

export const CHAINS: Chain[] = [
  {
    chainId: 1,
    type: ChainType.EVM,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://app.dln.trade/assets/images/chain/eth.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://etherscan.io/tx",
    minimumBalance: 0.005,
    DLNFee: 0.001,
  },
  {
    chainId: 137,
    type: ChainType.EVM,
    name: "Polygon",
    symbol: "MATIC",
    image: "https://app.dln.trade/assets/images/chain/polygon.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://polygonscan.com/tx",
    minimumBalance: 2,
    DLNFee: 0.5,
  },
  {
    chainId: 56,
    type: ChainType.EVM,
    name: "Binance Smart Chain",
    symbol: "BSC",
    image: "https://app.dln.trade/assets/images/chain/bnb.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://bscscan.com/tx",
    minimumBalance: 0.01,
    DLNFee: 0.005,
  },
  {
    chainId: 43114,
    type: ChainType.EVM,
    name: "Avalanche",
    symbol: "AVAX",
    image: "https://app.dln.trade/assets/images/chain/avalanche.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://avascan.info/blockchain/c/tx",
    minimumBalance: 0.2,
    DLNFee: 0.05,
  },
  {
    chainId: 42161,
    type: ChainType.EVM,
    name: "Arbitrum",
    symbol: "ETH",
    image: "https://app.dln.trade/assets/images/chain/arbitrum.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://arbiscan.io/tx",
    minimumBalance: 0.005,
    DLNFee: 0.001,
  },
  {
    chainId: 10,
    type: ChainType.EVM,
    name: "Optimism",
    symbol: "ETH",
    image: "https://app.dln.trade/assets/images/chain/optimism.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://optimistic.etherscan.io/tx",
    minimumBalance: 0.005,
    DLNFee: 0.001,
  },
  {
    chainId: 8453,
    type: ChainType.EVM,
    name: "Base",
    symbol: "ETH",
    image: "https://app.dln.trade/assets/images/chain/base.svg",
    rpc: "https://rpc.eth.xyz",
    explorer: "https://basescan.org/tx",
    minimumBalance: 0.005,
    DLNFee: 0.001,
  },
];

export enum BridgeRoute {
  DLN = "DLN",
}

export type BridgeToken = {
  name: string;
  image: string;
  symbol: string;
  address: string;
  decimals: number;
};

export type BridgeActivity = {
  src_address: string;
  dst_address: string;
  src_chain: Chain;
  dst_chain: Chain;
  src_token: BridgeToken;
  dst_token: BridgeToken;
  src_amount: number;
  dst_amount: number;
  txHash: string;
  orderID: string;
  route: BridgeRoute;
  gasFees: number;
  address: string;
};

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
