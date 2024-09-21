// TODO: Implement wallet screen
import { Button, Text, View, XStack, YStack } from "tamagui";

function WalletScreen() {
  return (
    <YStack flex={1} marginTop="$4" padding="$6">
      <XStack justifyContent="space-between" width="100%" marginBottom="$4">
        <Text fontSize="$6" fontWeight="bold">
          My Wallet
        </Text>
      </XStack>
      <Text fontSize="$12" fontWeight="bold">
        <Text color="#a3a3a3" fontWeight="semibold">
          $
        </Text>
        9500.27
      </Text>
      <View className="w-60 flex flex-row items-center pt-10 gap-2">
        <Button className="w-full bg-black rounded-xl">
          <Text className="color-white fw-600 fos-20">Send</Text>
        </Button>
        <Button className="w-full bg-black rounded-xl">
          <Text className="color-white fw-600 fos-20">Receive</Text>
        </Button>
      </View>
    </YStack>
  );
}

export default WalletScreen;
