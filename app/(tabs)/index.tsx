import "react-native-get-random-values"; // Add this import at the top of the file
import { useState } from "react";
import { StyleSheet, Image } from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { createNewWallet } from "@/helpers/wallet";
import { Button, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { fetchPortfolioDetails } from "@/helpers/1inch";

// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {
  const [data, setData] = useState<string>("");
  const router = useRouter();

  async function readNdef() {
    console.log("Scanning for NFC tags...");
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      console.log("Technology requested");
      const tag = await NfcManager.getTag();
      let msg: Uint8Array | undefined;

      if (tag?.ndefMessage[0]?.payload) {
        msg = new Uint8Array(tag.ndefMessage[0].payload);
      } else {
        msg = undefined;
      }
      const text = Ndef.text.decodePayload(msg!);
      console.log("NFC Data:", text);
      setData("NFC Data: " + text);
    } catch (ex) {
      console.log("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef(): Promise<boolean> {
    console.log("Creating wallet...");
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const walletCode = await createNewWallet("password");
      console.log("Wallet code:", walletCode);
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify({ key: walletCode })),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
        console.log("Wallet code written successfully");
      }
    } catch (ex) {
      console.warn("Error writing wallet code:", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
      <Image
        source={require("@/assets/images/magic.png")}
        resizeMode="contain"
        style={{ width: 350, height: 350 }}
        alt="Magic Wallet"
      />
      <Text fontSize="$9" marginTop="$6" color="#000" fontWeight="semibold">
        Welcome to Magic Wallet
      </Text>
      <Text fontSize="$5" marginTop="$2" textAlign="center" color="#9AA0A6">
        A chain-abstracted magic spender on Mobile
      </Text>
      <Button
        onPress={async () => {
          router.push("/wallet");
        }}
        style={styles.button}
      >
        Create Wallet
      </Button>
      <Text
        fontSize="$5"
        marginTop="$6"
        marginEnd="$2"
        textAlign="center"
        color="#9AA0A6"
      >
        by using Magic Wallet, you agree to accept our{" "}
        <Text fontWeight="semibold">Terms of Use</Text> and{" "}
        <Text fontWeight="semibold">Privacy Policy</Text>
      </Text>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#8357FF",
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "semibold",
    color: "#fff",
    fontSize: 18,
    width: "80%",
  },
});

export default App;
