import { ChainType, CHAINS, BridgeRoute } from "../utils/dlnTypes";
import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchNetwork,
} from "wagmi";
import useBridgeStore from "../store/bridgeStore";
import useAllowance from "../hooks/useAllowance";

const url = "https://api.dln.trade/v1.0/dln/order/";

export default function useBridge() {
  const {
    srcChain,
    dstChain,
    srcToken,
    dstToken,
    srcAmount,
    receiver,
    orderID,
    setOrderID,
    setGasFees,
    setTxData,
    txData,
    setTxHash,
    txHash,
    dstAmount,
    gasFees,
  } = useBridgeStore();
  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const chainID = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { approveAllowance } = useAllowance();

  async function getQuote() {
    try {
      const amount = Number(srcAmount) * Math.pow(10, srcToken.decimals);
      const response = await fetch(
        `${url}quote?srcChainId=${srcChain?.chainId}&srcChainTokenIn=${srcToken?.address}&srcChainTokenInAmount=${amount}&dstChainId=${dstChain?.chainId}&dstChainTokenOut=${dstToken?.address}&prependOperatingExpenses=true&affiliateFeePercent=0.1`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createOrder() {
    try {
      const outAmount: any = await getQuote();
      const amount = outAmount.estimation.srcChainTokenIn.amount;
      const sourceAddress = address;
      const destinationAddress = receiver;
      const response = await fetch(
        `${url}create-tx?srcChainId=${srcChain?.chainId}&srcChainTokenIn=${srcToken?.address}&srcChainTokenInAmount=${amount}&dstChainId=${dstChain?.chainId}&dstChainTokenOut=${dstToken?.address}&dstChainTokenOutAmount=${outAmount.estimation.dstChainTokenOut.recommendedAmount}&dstChainTokenOutRecipient=${destinationAddress}&srcChainOrderAuthorityAddress=${sourceAddress}&dstChainOrderAuthorityAddress=${destinationAddress}&affiliateFeePercent=0.1&affiliateFeeRecipient=${sourceAddress}`
      );
      const data: any = await response.json();
      setOrderID(data.orderId);

      const chain = CHAINS.filter(
        (chain) => chain.chainId === srcChain.chainId
      );

      setGasFees(Number(chain[0].DLNFee));

      // for (
      //   let index = 0;
      //   index < data.estimation.costsDetails.length;
      //   index++
      // ) {
      //   const currentItem = data.estimation.costsDetails[index];

      // if (
      //   currentItem.payload &&
      //   (currentItem.type === "DlnProtocolFee" ||
      //     currentItem.type === "AfuseAllowancefiliateFee" ||
      //     currentItem.type === "TakerMargin" ||
      //     currentItem.type === "EstimatedOperatingExpenses")
      // ) {
      //   const tokenIn = currentItem.tokenIn;

      //   if (tokenIn.startsWith("0x")) {
      //     const tokenInfo = await getEVMTokenInfo(
      //       tokenIn,
      //       srcChain.chainId === 7565164 ? dstChain.chainId : srcChain.chainId
      //     );
      //     const tokenPrice = await getEVMTokenPrice(
      //       tokenIn,
      //       srcChain.chainId === 7565164 ? dstChain.name : srcChain.name
      //     );
      //     const converted =
      //       Number(currentItem.payload.feeAmount) /
      //       Number(Math.pow(10, tokenInfo.decimals));
      //     gasFees += converted * tokenPrice;
      //   } else {
      //     const tokenPrice = await getTokenPrice(tokenIn);
      //     const tokenInfo = await getTokenInfo(tokenIn);
      //     const converted =
      //       Number(currentItem.payload.feeAmount) /
      //       Number(Math.pow(10, tokenInfo.result.decimals));
      //     gasFees += converted * tokenPrice;
      //   }
      // }
      // }

      setTxData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function executeOrder() {
    if (!txData) return;

    if (srcChain.type === ChainType.EVM) {
      try {
        if (!isConnected) return;

        if (srcToken.address !== "0x0000000000000000000000000000000000000000") {
          const allowance = await approveAllowance();
        }

        if (chainID !== srcChain.chainId) {
          switchNetwork?.(srcChain.chainId);
        }

        const {} = await sendTransactionAsync({
          to: txData.tx.to,
          data: txData.tx.data as `0x${string}`,
          value: BigInt(txData.tx.value),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return { getQuote, createOrder, executeOrder };
}
