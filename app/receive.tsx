import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";
import { ccipTransfer } from "@/helpers/ccip";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { executeTransaction } from "@/helpers/wallet";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

NfcManager.start();

function Receive() {
  const [token, setToken] = useState("BnM");
  const [chain, setChain] = useState("Gnosis");
  const [address, setAddress] = useState("vrajdesai.eth");
  const [amount, setAmount] = useState("");
  const [key, setKey] = useState("");

  async function readNdef() {
    console.log("Scanning for NFC tags...");
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      let msg: Uint8Array | undefined;

      if (tag?.ndefMessage[0]?.payload) {
        msg = new Uint8Array(tag.ndefMessage[0].payload);
      } else {
        msg = undefined;
      }
      const text = JSON.parse(Ndef.text.decodePayload(msg!));
      setKey(text.key);
      await ccipTransfer(text.key, "password", Number(amount));
      Toast.show({
        text1: "Payment Successful",
        type: "success",
        position: "bottom",
      });
      // await executeTransaction(text.key, "password", address, Number(amount));
      console.log("NFC Data:", text);
    } catch (ex) {
      console.log("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.modalContainer}>
      <XStack justifyContent='space-between'>
        <Text style={styles.text}>Generate Payment Receipt</Text>
      </XStack>
      <YStack>
        <Text fontSize='$5' fontWeight='medium' marginBottom='$2'>
          Receiving Address (Optional)
        </Text>
        <Input
          placeholder='0x314...45j7'
          keyboardType='default'
          value={address}
          onChangeText={setAddress}
        />
        <Text
          fontSize='$5'
          fontWeight='medium'
          marginTop='$4'
          marginBottom='$2'
        >
          Chain
        </Text>
        <Input
          placeholder='Base'
          keyboardType='default'
          value={chain}
          onChangeText={setChain}
        />
        <Text
          fontSize='$5'
          fontWeight='medium'
          marginTop='$4'
          marginBottom='$2'
        >
          Token
        </Text>
        <Input
          placeholder='USDC'
          keyboardType='default'
          value={token}
          onChangeText={setToken}
        />
        <Text
          fontSize='$5'
          fontWeight='medium'
          marginTop='$4'
          marginBottom='$2'
        >
          Amount
        </Text>
        <Input
          placeholder='100'
          keyboardType='default'
          value={amount}
          onChangeText={setAmount}
        />
        <Button style={styles.receiveButton} onPress={readNdef}>
          <Text style={styles.receiveButtonText}>Initiate Request</Text>
        </Button>
      </YStack>
    </View>
  );
}

export default Receive;

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 18,
    height: 30,
  },
  closeButtonText: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  receiveButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#8357FF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "semibold",
    color: "#fff",
    fontSize: 18,
  },
  receiveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  resetButton: {
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#dc2626",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "semibold",
    fontSize: 18,
  },
  resetButtonText: {
    color: "#dc2626",
    fontSize: 18,
  },
});
