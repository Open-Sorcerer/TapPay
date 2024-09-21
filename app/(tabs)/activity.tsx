// TODO: Implement Activity Tab
import { Text, XStack, YStack } from "tamagui";

function Activity() {
  return (
    <YStack flex={1} alignItems="center" marginTop="$9" padding="$4">
      <XStack justifyContent="space-between" width="100%" marginBottom="$4">
        <Text fontSize="$6" fontWeight="bold">
          Your transactions
        </Text>
      </XStack>
    </YStack>
  );
}

export default Activity;
