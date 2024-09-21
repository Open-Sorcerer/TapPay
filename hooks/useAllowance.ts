import { formatUnits, parseEther, parseUnits } from "viem";
import {
  erc20ABI,
  useAccount,
  useChainId,
  useContractWrite,
  useSendTransaction,
  useSwitchNetwork,
} from "wagmi";
import { ABI } from "../utils/dlnTypes";
import useBridgeStore from "../store/bridgeStore";
import { BridgeToken } from "../utils/dlnTypes";
import getViemPublicClient from "../utils/getViemPublicClient";

export default function useAllowance() {
  const { address } = useAccount();
  const chainID = useChainId();
  const { srcChain, srcToken, srcAmount, txData } = useBridgeStore();
  const { switchNetwork } = useSwitchNetwork();
  const { writeAsync } = useContractWrite({
    abi: erc20ABI,
    address: srcToken?.address as `0x${string}`,
    functionName: "approve",
  });

  async function checkAllowance(
    contract: `0x${string}`,
    spender: `0x${string}`,
    token: BridgeToken
  ) {
    if (!address) return;
    const client = getViemPublicClient(srcChain.chainId);
    const data = await client.readContract({
      abi: ABI,
      functionName: "allowance",
      args: [address, spender],
      address: contract,
    });
    return formatUnits(data, token.decimals);
  }

  async function approveAllowance() {
    try {
      if (!address) return;
      const client = getViemPublicClient(srcChain.chainId);
      if (chainID !== srcChain.chainId) {
        switchNetwork?.(srcChain.chainId);
      }

      const { hash } = await writeAsync({
        args: [
          txData.tx.to as `0x${string}`,
          parseUnits(srcAmount, srcToken.decimals),
        ],
      });

      await client.waitForTransactionReceipt({
        hash: hash,
      });

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { checkAllowance, approveAllowance };
}
