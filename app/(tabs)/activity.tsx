// TODO: Implement Activity Tab
import { StyleSheet } from "react-native";
import { Image, ScrollView, Text, View, XStack, YStack } from "tamagui";

const tokens = [
  {
    intent: "Received",
    balance: 5,
    symbol: "SOL",
    image: require("@/assets/images/solana.png"),
  },
  {
    intent: "Sent",
    balance: 1.2,
    symbol: "ETH",
    image: require("@/assets/images/eth.png"),
  },
  {
    intent: "Received",
    balance: 12981,
    symbol: "DEGEN",
    image: require("@/assets/images/base.png"),
  },
];

function Activity() {
  return (
    <YStack flex={1} alignItems="center" marginTop="$9" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Activity
      </Text>
      <ScrollView style={styles.tokenList}>
        {tokens.map((token, index) => (
          <View style={styles.tokenItem} key={index}>
            <XStack alignItems="center" gap="$3">
              <View style={styles.imageContainer}>
                <Image
                  source={token.image}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                  alt="Magic Wallet"
                />
                <Image
                  source={token.image}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 100,
                    position: "absolute",
                    bottom: -2,
                    right: -3,
                  }}
                  alt="Magic Wallet"
                />
              </View>
              <YStack gap="$1">
                <Text fontSize="$3" color="#737373">
                  {token.intent}
                </Text>
                <Text fontSize="$5" fontWeight="bold">
                  {token.symbol}
                </Text>
              </YStack>
            </XStack>
            <Text
              fontSize="$5"
              fontWeight="bold"
              color={token.intent === "Received" ? "#22c55e" : "#FF0000"}
            >
              {token.intent === "Received" ? "+" : "-"} {token.balance}{" "}
              {token.symbol}
            </Text>
          </View>
        ))}
      </ScrollView>
    </YStack>
  );
}

export default Activity;

const styles = StyleSheet.create({
  tokenList: {
    marginTop: 10,
    width: "100%",
  },
  tokenItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 8,
    paddingLeft: 8,
  },
  imageContainer: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
