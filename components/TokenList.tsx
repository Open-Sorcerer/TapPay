import { userPortfolio } from "@/helpers/1inch";
import { StyleSheet } from "react-native";
import { Image, ScrollView, Text, View, XStack, YStack } from "tamagui";

function TokenList({ portfolio }: { portfolio: userPortfolio | null }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Assets</Text>
      <ScrollView style={styles.tokenList}>
        {portfolio?.map((token, index) => (
          <View style={styles.tokenItem} key={index}>
            <XStack alignItems="center" gap="$3">
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: token.logoURI,
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                  alt="Magic Wallet"
                />
                <Image
                  source={{
                    uri:
                      token.chainId === 1
                        ? "https://cryptologos.cc/logos/ethereum-eth-logo.png"
                        : token.chainId === 137
                        ? "https://w7.pngwing.com/pngs/48/858/png-transparent-polygon-crypto-polygon-logo-polygon-coin-polygon-sign-polygon-symbol-polygon-3d-icon.png"
                        : "https://avatars.githubusercontent.com/u/108554348?v=4",
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    backgroundColor: "#fff",
                  }}
                  alt="Magic Wallet"
                />
              </View>
              <YStack gap="$1">
                <Text fontSize="$5" fontWeight="bold">
                  {token.name}
                </Text>
                <Text fontSize="$3" color="#737373">
                  {token.amount} {token.symbol}
                </Text>
              </YStack>
            </XStack>
            <Text fontSize="$5" fontWeight="800">
              ${token.value_usd?.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
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
