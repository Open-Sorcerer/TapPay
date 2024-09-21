// TODO: Implement wallet screen
import { fetchPortfolioDetails } from "@/helpers/1inch";
import { getSigner, sendTransactionFromKey } from "@/helpers/wallet";
import { Button, Text, View, XStack, YStack } from "tamagui";
import { base, baseSepolia } from "viem/chains";

function WalletScreen() {
  const encrypted =
    "a5ca001ff7b689d376e726768ed64127:487f70f2a6e1aa10f2e230af92dcb6f8abde428a66a1cd892ce69d56fa3e34e9e6aea5a8b319aa8263b4de29632b6b4b63d2e0b12aebc9c44c80dceaf50686ca9dbeeb881d0d92e2029aae20e76bfc95";

  return (
    <YStack flex={1} marginTop='$4' padding='$2'>
      <XStack justifyContent='space-between' width='100%' marginBottom='$4'>
        <Text fontSize='$6' fontWeight='bold'>
          My Wallet
        </Text>
      </XStack>
      <Text fontSize='$12' fontWeight='bold'>
        <Text color='#a3a3a3' fontWeight='semibold'>
          $
        </Text>
        9500.27
      </Text>
      <View className='w-full flex flex-row items-center pt-10'>
        <View className='w-1/2 pr-1'>
          <Button
            className='bg-black rounded-xl text-white'
            onPress={async () => {
              // sendTransactionFromKey(encrypted, "ethsingapore");
              // const signer = await getSigner(encrypted, "ethsingapore");
              // const response = await fetchPortfolioDetails(
              //   signer.address,
              //   base.id
              // );
              // console.log(response);
            }}
          >
            Send
          </Button>
        </View>
        <View className='w-1/2 pl-1'>
          <Button className='bg-black rounded-xl text-white'>Receive</Button>
        </View>
      </View>
    </YStack>
  );
}

export default WalletScreen;
