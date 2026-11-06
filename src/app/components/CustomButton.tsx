import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 28,
    marginVertical: 8,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});