import { StyleSheet } from "react-native";
import { Image, Text, View, XStack, YStack } from "tamagui";

const tokens = [
  {
    name: "Solana",
    symbol: "SOL",
    balance: 23,
    price: 2497.69,
    image: require("@/assets/images/solana.png"),
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: 1.2,
    price: 2487.69,
    image: require("@/assets/images/eth.png"),
  },
  {
    name: "DEGEN",
    symbol: "DEGEN",
    balance: 12981,
    price: 2413.69,
    image: require("@/assets/images/base.png"),
  },
];

function TokenList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Assets</Text>
      <View style={styles.tokenList}>
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
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                  }}
                  alt="Magic Wallet"
                />
              </View>
              <YStack gap="$1">
                <Text fontSize="$5" fontWeight="bold">
                  {token.name}
                </Text>
                <Text fontSize="$3" color="#737373">
                  {token.balance} {token.symbol}
                </Text>
              </YStack>
            </XStack>
            <Text fontSize="$5" fontWeight="800">
              ${token.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default TokenList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tokenList: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 10,
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
