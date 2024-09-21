type TokenAction = {
  chainId: string;
  address: string;
  standard: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  direction: string;
};

type EventDetails = {
  txHash: string;
  chainId: number;
  blockNumber: number;
  blockTimeSec: number;
  status: string;
  type: string;
  tokenActions: TokenAction[];
  fromAddress: string;
  toAddress: string;
  orderInBlock: number;
  nonce: number;
  feeInWei: string;
  nativeTokenPriceToUsd: number | null;
};

type EventItem = {
  timeMs: number;
  address: string;
  type: number;
  rating: string;
  direction: string;
  details: EventDetails;
  id: string;
  eventOrderInTransaction: number;
};

type ApiResponse = {
  items: EventItem[];
};

type PortfolioResult = {
  chain_id: number;
  contract_address: string;
  amount: number;
  price_to_usd: number;
  value_usd: number;
  abs_profit_usd: number;
  roi: number;
  status: number;
};

type SystemMeta = {
  click_time: number;
  node_time: number;
  microservices_time: number;
  redis_time: number;
  total_time: number;
};

type Meta = {
  system: SystemMeta;
};

type PortfolioResponse = {
  result: PortfolioResult[];
  meta: Meta;
};

type PriceResponse = {
  [key: string]: string;
};

type TokenDetails = {
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  isFoT: boolean;
  rating: number;
  tags: [
    {
      value: string;
      provider: string;
    },
    {
      value: string;
      provider: string;
    },
    {
      value: string;
      provider: string;
    }
  ];
  providers: string[];
};

type PortfolioToken = {
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  amount: string;
  price_to_usd: string;
  value_usd: string;
  status: string;
};
type portfolio = {
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  amount: number;
  price_to_usd: number;
  value_usd: number;
  status: number;
};
export type userPortfolio = portfolio[];
const BASE_URL = "https://api.1inch.dev";

const headers = {
  Authorization: `Bearer rWtOI0gGIJmXd4P58f2pZg4oXqq3xirw`,
};

export const config: RequestInit = {
  headers,
};

async function walletHistory(address: string, chainId: number): Promise<void> {
  const url = `${BASE_URL}/history/v2.0/history/${address}/events?chainId=${chainId}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching wallet history:", error);
  }
}

async function fetchPortfolioDetails(
  address: string,
  chainId: number
): Promise<userPortfolio | null> {
  const url = `${BASE_URL}/portfolio/portfolio/v4/overview/erc20/details?addresses=${address}&chain_id=${chainId}`;
  let userPortfolio: userPortfolio = [];
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PortfolioResponse = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      for (let index = 0; index < data.result.length; index++) {
        const token = await fetch(
          `https://api.1inch.dev/token/v1.2/${chainId}/custom/${data.result[index].contract_address}`,
          {
            headers: {
              Authorization: "Bearer rWtOI0gGIJmXd4P58f2pZg4oXqq3xirw",
            },
          }
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const tokenData: TokenDetails = await token.json();
          userPortfolio.push({
            symbol: tokenData.symbol,
            name: tokenData.name,
            address: tokenData.address,
            chainId: tokenData.chainId,
            decimals: tokenData.decimals,
            logoURI: tokenData.logoURI,
            amount: data.result[index].amount,
            price_to_usd: data.result[index].price_to_usd,
            value_usd: data.result[index].value_usd,
            status: data.result[index].status,
          });
        } catch (error) {
          console.error(
            "Error fetching token details:",
            error,
            data.result[index].contract_address
          );
        }
      }
    } catch (error) {}

    return userPortfolio;
  } catch (error) {
    console.error("Error fetching portfolio details:", error);
    return null;
  }
}

async function fetchPriceData(
  contractAddress: string,
  currency: string
): Promise<PriceResponse | null> {
  const url = `${BASE_URL}/price/v1.1/1/${contractAddress}?currency=${currency}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PriceResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    return null;
  }
}

export { walletHistory, fetchPortfolioDetails, fetchPriceData };
