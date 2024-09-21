type QuoteResponse = {
  quoteId: string;
  srcTokenAmount: string;
  dstTokenAmount: string;
  presets: {
    fast: PresetDetails;
    medium: PresetDetails;
    slow: PresetDetails;
  };
  timeLocks: TimeLocks;
  srcEscrowFactory: string;
  dstEscrowFactory: string;
  srcSafetyDeposit: string;
  dstSafetyDeposit: string;
  whitelist: string[];
  recommendedPreset: string;
  prices: {
    usd: {
      srcToken: string;
      dstToken: string;
    };
  };
  volume: {
    usd: {
      srcToken: string;
      dstToken: string;
    };
  };
  priceImpactPercent: number;
  autoK: number;
  k: number;
  mxK: number;
};

type PresetDetails = {
  auctionDuration: number;
  startAuctionIn: number;
  initialRateBump: number;
  auctionStartAmount: string;
  startAmount: string;
  auctionEndAmount: string;
  exclusiveResolver: string | null;
  costInDstToken: string;
  points: Array<{
    delay: number;
    coefficient: number;
  }>;
  allowPartialFills: boolean;
  allowMultipleFills: boolean;
  gasCost: {
    gasBumpEstimate: number;
    gasPriceEstimate: string;
  };
  secretsCount: number;
};

type TimeLocks = {
  srcWithdrawal: number;
  srcPublicWithdrawal: number;
  srcCancellation: number;
  srcPublicCancellation: number;
  dstWithdrawal: number;
  dstPublicWithdrawal: number;
  dstCancellation: number;
};

async function apiRequest<T>(
  url: string,
  method: "GET" | "POST",
  params?: Record<string, string>,
  body?: any
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
      },
      ...(method === "GET" ? { params } : {}),
      ...(method === "POST" && body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error in API request:", error);
    return null;
  }
}

export async function crossChainQuote(
  srcChain: number,
  dstChain: number,
  srcToken: string,
  dstToken: string,
  amount: number,
  address: string
): Promise<QuoteResponse | null> {
  const url = "https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/receive";

  const params = {
    srcChain: srcChain.toString(),
    dstChain: dstChain.toString(),
    srcTokenAddress: srcToken,
    dstTokenAddress: dstToken,
    amount: amount.toString(),
    walletAddress: address,
    enableEstimate: "true",
  };

  return apiRequest<QuoteResponse>(url, "GET", params);
}

export async function buildTransaction(
  srcChain: number,
  dstChain: number,
  srcToken: string,
  dstToken: string,
  amount: number,
  address: string
) {
  const url = "https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/build";

  const quote = await crossChainQuote(
    srcChain,
    dstChain,
    srcToken,
    dstToken,
    amount,
    address
  );

  if (!quote) {
    console.error("Failed to retrieve a valid quote.");
    return;
  }

  try {
    const response = await apiRequest(url, "POST", undefined, quote);
    if (response) {
      console.log(response);
    } else {
      console.error("Transaction build failed.");
    }
  } catch (error) {
    console.error("Error building transaction:", error);
  }
}
