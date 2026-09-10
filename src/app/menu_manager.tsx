import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

type Course = "Starter" | "Main Course" | "Dessert";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  imageUri: string;
};

export default function MenuManager() {
  const params = useLocalSearchParams();

  const [dishes, setDishes] = useState<Dish[]>([]);

  /*
   * RECEIVE THE DISH FROM ADD MENU ITEM
   */
  useEffect(() => {
    if (!params.dish) {
      return;
    }

    try {
      let dishText: string;

      /*
       * Expo Router may return a parameter as a string
       * or as an array of strings.
       */
      if (Array.isArray(params.dish)) {
        dishText = params.dish[0];
      } else {
        dishText = String(params.dish);
      }

      /*
       * Decode the parameter if necessary.
       */
      let newDish: Dish;

      try {
        newDish = JSON.parse(dishText);
      } catch {
        newDish = JSON.parse(decodeURIComponent(dishText));
      }

      /*
       * Make sure the dish has an image URI.
       */
      console.log("DISH RECEIVED:", newDish);
      console.log("IMAGE RECEIVED:", newDish.imageUri);

      if (!newDish.imageUri) {
        console.log("WARNING: No image URI was received.");
      }

      /*
       * Add the dish to the list.
       */
      setDishes((oldDishes) => {
        const alreadyAdded = oldDishes.some(
          (dish) => dish.id === newDish.id
        );

        if (alreadyAdded) {
          return oldDishes;
        }

        return [...oldDishes, newDish];
      });
    } catch (error) {
      console.log("ERROR READING DISH:", error);
    }
  }, [params.dish]);

  /*
   * ADD MENU ITEM
   */
  const handleAddMenuItem = () => {
    router.push("../add_menu_item");
  };

  /*
   * VIEW DISH
   */
  const handleViewDish = (dish: Dish) => {
    router.push({
      pathname: "../view_menu",
      params: {
        dish: JSON.stringify(dish),
      },
    });
  };

  /*
   * BACK BUTTON
   *
   * If there is a previous screen, go back.
   * Otherwise go to the main screen.
   */
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Menu Manager
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.headerLine} />

        {/* ================= ADD MENU ITEM ================= */}

        <TouchableOpacity
          style={styles.addMenuButton}
          onPress={handleAddMenuItem}
          activeOpacity={0.8}
        >
          <Text style={styles.addMenuButtonText}>
            + Add Menu Item
          </Text>
        </TouchableOpacity>

        {/* ================= MENU ITEMS ================= */}

        <Text style={styles.sectionTitle}>
          MENU ITEMS
        </Text>

        <View style={styles.dishArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              dishes.length === 0 &&
                styles.emptyScrollContent,
            ]}
          >
            {/* NO DISH */}
            {dishes.length === 0 ? (
              <Text style={styles.noDishText}>
                No dish
              </Text>
            ) : (
              /* DISH LIST */
              dishes.map((dish) => (
                <TouchableOpacity
                  key={dish.id}
                  style={styles.dishCard}
                  onPress={() => handleViewDish(dish)}
                  activeOpacity={0.8}
                >
                  {/* ================= IMAGE ================= */}

                  {dish.imageUri ? (
                    <Image
                      source={{
                        uri: dish.imageUri,
                      }}
                      style={styles.dishImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>
                        No image
                      </Text>
                    </View>
                  )}

                  {/* ================= DISH INFORMATION ================= */}

                  <View style={styles.dishInfo}>
                    <Text
                      style={styles.dishName}
                      numberOfLines={2}
                    >
                      {dish.name}
                    </Text>

                    <Text style={styles.dishCourse}>
                      {dish.course}
                    </Text>

                    <Text style={styles.dishPrice}>
                      R {Number(dish.price).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* ================= STATISTICS ================= */}

        <TouchableOpacity
          style={styles.statisticsButton}
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <Text style={styles.statisticsText}>
            Statistics
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2FA9D9",
  },

  container: {
    flex: 1,
    backgroundColor: "#2FA9D9",
  },

  /* ================= HEADER ================= */

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backArrow: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "300",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  headerSpacer: {
    width: 50,
  },

  headerLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
  },

  /* ================= ADD BUTTON ================= */

  addMenuButton: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 22,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addMenuButtonText: {
    color: "#2FA9D9",
    fontSize: 17,
    fontWeight: "700",
  },

  /* ================= SECTION ================= */

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 10,
  },

  /* ================= DISH AREA ================= */

  dishArea: {
    flex: 1,
    marginHorizontal: 22,
  },

  scrollContent: {
    paddingTop: 5,
    paddingBottom: 20,
  },

  emptyScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noDishText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  /* ================= DISH CARD ================= */

  dishCard: {
    width: "100%",
    minHeight: 125,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  /* ================= DISH IMAGE ================= */

  dishImage: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#969A9B",
  },

  imagePlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#969A9B",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePlaceholderText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ================= DISH INFO ================= */

  dishInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  dishName: {
    color: "#333333",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 5,
  },

  dishCourse: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },

  dishPrice: {
    color: "#2FA9D9",
    fontSize: 17,
    fontWeight: "800",
  },

  /* ================= STATISTICS ================= */

  statisticsButton: {
    height: 52,
    backgroundColor: "#8FD9A8",
    borderRadius: 15,
    marginHorizontal: 22,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  statisticsText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});