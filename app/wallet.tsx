// TODO: Implement wallet screen
import { Button, Text, View, XStack, YStack } from "tamagui";

function WalletScreen() {
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
          <Button className='bg-black rounded-xl text-white'>Send</Button>
        </View>
        <View className='w-1/2 pl-1'>
          <Button className='bg-black rounded-xl text-white'>Receive</Button>
        </View>
      </View>
    </YStack>
  );
}

export default WalletScreen;
