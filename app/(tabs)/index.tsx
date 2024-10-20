import "react-native-get-random-values";
import { useState } from "react";
import { StyleSheet, Image } from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { Button, Text, YStack } from "tamagui";
import { createNewWallet, executeTransaction } from "@/helpers/wallet";
import CenteredDivider from "@/components/Separator";

// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {
  const [data, setData] = useState<string>("");

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
      const parsedText = JSON.parse(text);
      console.log("NFC Data:", parsedText.key);
      setData(parsedText.key);
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
        Ndef.textRecord(
          JSON.stringify({
            key: walletCode?.encryptedKey,
          })
        ),
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
        style={{ width: 350, height: 350, marginTop: 15 }}
        alt="Magic Wallet"
      />
      <Text fontSize="$9" marginTop="$6" color="#000" fontWeight="semibold">
        SOON Pay
      </Text>

      <Button
        onPress={async () => {
          console.log("Creating wallet...");
          const walletCode = await createNewWallet("password");
          console.log("Wallet code:", walletCode);
          await writeNdef();
        }}
        style={styles.button}
      >
        Create Wallet
      </Button>
      <CenteredDivider text="OR" />
      <Button
        onPress={async () => {
          await readNdef();
          console.log("Reading NFC tag...", data);
          executeTransaction(
            data,
            "password",
            "FVP39NNZMKfEDzbg3BWWZEiYPH3wyFp5kmtuN3M2AZFo",
            0.0001
          );
        }}
        style={styles.outlineButton}
      >
        Receive funds via NFC
      </Button>
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
  outlineButton: {
    marginTop: 3,
    backgroundColor: "transparent",
    borderRadius: 32,
    borderColor: "#8357FF",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "semibold",
    color: "#8357FF",
    fontSize: 18,
    width: "80%",
  },
});

export default App;
