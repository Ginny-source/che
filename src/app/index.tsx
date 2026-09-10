import { router } from "expo-router";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

/*
 * Splash / Welcome Screen
 *
 * This screen matches the first screen in the reference design.
 *
 * IMPORTANT:
 * The chef image is a real image asset, NOT an icon.
 *
 * Add your image here:
 * assets/logo.png
 */

// Import the actual chef image from the assets folder
const chefImage = require("../../assets/images/logo.png");

export default function Index() {
  /*
   * Navigate to Menu_manager.tsx when the
   * "Get Started" button is pressed.
   */
  const handleGetStarted = () => {
    router.push("../Menu_manager");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ------------------------------------------------
            CHEF IMAGE
            This is an actual image, not an icon.
        ------------------------------------------------- */}
        <Image
          source={chefImage}
          style={styles.chefImage}
          resizeMode="contain"
        />

        {/* ------------------------------------------------
            APP TITLE
        ------------------------------------------------- */}
        <Text style={styles.appName}>MY CHEFMANAGER</Text>

        {/* ------------------------------------------------
            GET STARTED BUTTON
            Connects to Menu_manager.tsx
        ------------------------------------------------- */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>get started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ======================================================
   STYLES
====================================================== */

const styles = StyleSheet.create({
  /*
   * Safe area fills the entire phone screen.
   */
  safeArea: {
    flex: 1,
    backgroundColor: "#2FA8D8",
  },

  /*
   * Main screen container.
   */
  container: {
    flex: 1,
    backgroundColor: "#2FA8D8",
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * Actual chef image from the assets folder.
   *
   * Adjust the width/height if your image is a
   * different size.
   */
  chefImage: {
    width: 190,
    height: 220,
    marginBottom: 20,
  },

  /*
   * "MY CHEFMANAGER" text underneath the image.
   */
  appName: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#000000",
    marginBottom: 155,
  },

  /*
   * Get Started button.
   */
  getStartedButton: {
    position: "absolute",
    bottom: 120,
    backgroundColor: "#EFEFEF",
    width: 145,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * Get Started button text.
   */
  getStartedText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
