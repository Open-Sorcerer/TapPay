// TODO: Implement Activity Tab
import { Button, Text, View, XStack, YStack } from "tamagui";

function Activity() {
  return (
    <YStack flex={1} alignItems="center" marginTop="$12" padding="$4">
      <XStack justifyContent="space-between" width="100%" marginBottom="$4">
        <Text fontSize="$6" fontWeight="bold">
          My Wallet
        </Text>
      </XStack>
      <Text fontSize="$12" fontWeight="semibold">
        <Text color="#a3a3a3">$</Text>
        9500.27
      </Text>

      <View className="flex flex-row w-48 justify-between mt-8 gap-2">
        <Button className="bg-black">
          <Text className="color-white fw-600 fos-20">Send</Text>
        </Button>
        <Button className="bg-black">
          <Text className="color-white fw-600 fos-20">Receive</Text>
        </Button>
      </View>
    </YStack>
  );
}

export default Activity;
