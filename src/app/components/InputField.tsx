import React from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function InputField({
  label,
  error,
  ...inputProps
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          inputProps.multiline && styles.multilineInput,
          error && styles.errorInput,
        ]}
        placeholderTextColor="#777777"
        {...inputProps}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginVertical: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  errorInput: {
    borderColor: "#FF3333",
    borderWidth: 2,
  },

  errorText: {
    color: "#FF3333",
    fontSize: 12,
    marginTop: 5,
  },
});