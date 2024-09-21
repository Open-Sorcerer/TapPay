// TODO: Implement wallet screen

import { useState } from "react";
import { fetchPortfolioDetails } from "@/helpers/1inch";
import { getSigner, sendTransactionFromKey } from "@/helpers/wallet";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

const CustomBottomSheet = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [amount, setAmount] = useState("");
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <XStack justifyContent="space-between">
            <Text style={styles.text}>Receive Amount</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </XStack>
          <YStack>
            <Text fontSize="$5" fontWeight="medium" marginBottom="$2">
              Chain
            </Text>
            <Input
              placeholder="Base"
              keyboardType="default"
              value={amount}
              onChangeText={setAmount}
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
              value={amount}
              onChangeText={setAmount}
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
              placeholder="USDC"
              keyboardType="default"
              value={amount}
              onChangeText={setAmount}
            />
            <Button style={styles.receiveButton}>
              <Text style={styles.receiveButtonText}>Accept Payment</Text>
            </Button>
          </YStack>
        </View>
      </View>
    </Modal>
  );
};

function WalletScreen() {
  const encrypted =
    "a5ca001ff7b689d376e726768ed64127:487f70f2a6e1aa10f2e230af92dcb6f8abde428a66a1cd892ce69d56fa3e34e9e6aea5a8b319aa8263b4de29632b6b4b63d2e0b12aebc9c44c80dceaf50686ca9dbeeb881d0d92e2029aae20e76bfc95";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <YStack flex={1} padding="$4" className="bg-white">
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
        <View className="w-full flex flex-row items-center pt-8">
          <View className="w-1/2 pr-1">
            <Button
              className="bg-black rounded-xl text-white"
              onPress={() => {
                setIsOpen(true);
              }}
            >
              Receive Payment
            </Button>
            <CustomBottomSheet
              visible={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </View>
        </View>
      </YStack>
    </>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});
