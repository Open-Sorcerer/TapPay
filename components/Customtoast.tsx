import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

interface CustomToastProps {
  text1: string;
  text2?: string;
  link?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, link }) => {
  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastText}>{text2}</Text>}
      {link && (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          <Text style={styles.linkText}>View Transaction</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    fontSize: 16,
  },
  linkText: {
    color: "blue",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default CustomToast;
