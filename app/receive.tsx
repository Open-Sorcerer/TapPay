import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

function Receive() {
  const [token, setToken] = useState("");
  const [chain, setChain] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <View style={styles.modalContainer}>
      <XStack justifyContent="space-between">
        <Text style={styles.text}>Generate Payment Receipt</Text>
      </XStack>
      <YStack>
        <Text fontSize="$5" fontWeight="medium" marginBottom="$2">
          Receiving Address (Optional)
        </Text>
        <Input
          placeholder="0x314...45j7"
          keyboardType="default"
          value={address}
          onChangeText={setAddress}
        />
        <Text
          fontSize="$5"
          fontWeight="medium"
          marginTop="$4"
          marginBottom="$2"
        >
          Chain
        </Text>
        <Input
          placeholder="Base"
          keyboardType="default"
          value={chain}
          onChangeText={setChain}
        />
        <Text
          fontSize="$5"
          fontWeight="medium"
          marginTop="$4"
          marginBottom="$2"
        >
          Token
        </Text>
        <Input
          placeholder="USDC"
          keyboardType="default"
          value={token}
          onChangeText={setToken}
        />
        <Text
          fontSize="$5"
          fontWeight="medium"
          marginTop="$4"
          marginBottom="$2"
        >
          Amount
        </Text>
        <Input
          placeholder="100"
          keyboardType="default"
          value={amount}
          onChangeText={setAmount}
        />
        <Button style={styles.receiveButton}>
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
