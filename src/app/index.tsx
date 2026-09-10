import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const chefImage = require("../../assets/images/logo.png");

export default function Index() {
  const handleGetStarted = () => {
    /*
     * Go directly to Menu_manager.tsx
     */
    router.replace("/menu_manager");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* CHEF IMAGE */}

        <Image
          source={chefImage}
          style={styles.chefImage}
          resizeMode="contain"
        />

        {/* APP NAME */}

        <Text style={styles.appName}>
          MY CHEFMANAGER
        </Text>

        {/* DESCRIPTION BOX */}

        <View style={styles.descriptionBox}>
          <Text style={styles.welcomeText}>
            Welcome
          </Text>

          <Text style={styles.descriptionText}>
            A smart and easy to use mobile app that helps you
            create, organize and design your menu
          </Text>
        </View>

        {/* GET STARTED */}

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>
            get started
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2FA9D9",
  },

  container: {
    flex: 1,
    backgroundColor: "#2FA9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  chefImage: {
    width: 190,
    height: 220,
    marginBottom: 15,
  },

  appName: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#000000",
    marginBottom: 35,
  },

  descriptionBox: {
    width: 190,
    minHeight: 102,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  welcomeText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: 4,
  },

  descriptionText: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },

  getStartedButton: {
    width: 145,
    height: 38,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },

  getStartedText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
