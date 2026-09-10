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
  const params = useLocalSearchParams<{
    dish?: string | string[];
    imageUri?: string | string[];
  }>();

  const [dishes, setDishes] = useState<Dish[]>([]);

  /*
  ============================================================
  GET A PARAMETER AS A STRING
  ============================================================
  */
  const getParamString = (
    value: string | string[] | undefined
  ): string => {
    if (value === undefined) {
      return "";
    }

    if (Array.isArray(value)) {
      return value[0] || "";
    }

    return String(value);
  };

  /*
  ============================================================
  READ DISH FROM ADD_MENU_ITEM
  ============================================================
  */
  useEffect(() => {
    const dishParameter = getParamString(params.dish);
    const separateImageUri = getParamString(params.imageUri);

    if (!dishParameter && !separateImageUri) {
      return;
    }

    try {
      let newDish: Dish | null = null;

      /*
      ----------------------------------------------------------
      TRY TO READ THE COMPLETE DISH
      ----------------------------------------------------------
      */

      if (dishParameter) {
        try {
          /*
           * First try the parameter normally.
           */
          newDish = JSON.parse(dishParameter);
        } catch {
          /*
           * If it was URL encoded, decode it.
           */
          try {
            const decodedDish = decodeURIComponent(dishParameter);
            newDish = JSON.parse(decodedDish);
          } catch (error) {
            console.log("Could not decode dish:", error);
          }
        }
      }

      /*
      ----------------------------------------------------------
      IF THE IMAGE WAS SENT SEPARATELY
      ----------------------------------------------------------
      */

      if (newDish) {
        /*
         * Make sure imageUri is always a string.
         */
        let receivedImage = "";

        if (
          typeof newDish.imageUri === "string" &&
          newDish.imageUri.trim() !== ""
        ) {
          receivedImage = newDish.imageUri;
        }

        /*
         * If the dish did not contain the image,
         * use the separate imageUri parameter.
         */
        if (!receivedImage && separateImageUri) {
          try {
            receivedImage = decodeURIComponent(separateImageUri);
          } catch {
            receivedImage = separateImageUri;
          }
        }

        const completeDish: Dish = {
          ...newDish,
          imageUri: receivedImage,
        };

        console.log("--------------------------------");
        console.log("DISH RECEIVED");
        console.log("Name:", completeDish.name);
        console.log("Course:", completeDish.course);
        console.log("Price:", completeDish.price);
        console.log("IMAGE URI:", completeDish.imageUri);
        console.log("--------------------------------");

        /*
         * Add the dish to the Menu Manager.
         */
        setDishes((currentDishes) => {
          const alreadyExists = currentDishes.some(
            (dish) => dish.id === completeDish.id
          );

          if (alreadyExists) {
            return currentDishes;
          }

          return [...currentDishes, completeDish];
        });
      }
    } catch (error) {
      console.log("ERROR READING DISH:", error);
    }
  }, [params.dish, params.imageUri]);

  /*
  ============================================================
  ADD MENU ITEM
  ============================================================
  */
  const handleAddMenuItem = () => {
    router.push("/add_menu_item");
  };

  /*
  ============================================================
  VIEW MENU
  ============================================================
  */
  const handleViewDish = (dish: Dish) => {
    router.push({
      pathname: "/view_menu",
      params: {
        dish: JSON.stringify(dish),
      },
    });
  };

  /*
  ============================================================
  BACK BUTTON
  ============================================================
  */
  const handleBack = () => {
    router.replace("/");
  };

  /*
  ============================================================
  SCREEN
  ============================================================
  */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ==================================================
            HEADER
        ================================================== */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Menu Manager
          </Text>

          <View style={styles.headerSpacer} />

        </View>

        <View style={styles.headerLine} />

        {/* ==================================================
            ADD MENU ITEM BUTTON
        ================================================== */}

        <TouchableOpacity
          style={styles.addMenuButton}
          onPress={handleAddMenuItem}
          activeOpacity={0.8}
        >
          <Text style={styles.addMenuButtonText}>
            + Add Menu Item
          </Text>
        </TouchableOpacity>

        {/* ==================================================
            MENU ITEMS
        ================================================== */}

        <Text style={styles.sectionTitle}>
          MENU ITEMS
        </Text>

        <View style={styles.dishArea}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              dishes.length === 0
                ? styles.emptyScrollContent
                : null,
            ]}
          >

            {/* ==================================================
                NO DISH
            ================================================== */}

            {dishes.length === 0 ? (

              <Text style={styles.noDishText}>
                No dish
              </Text>

            ) : (

              /* ==================================================
                 DISH LIST
              ================================================== */

              dishes.map((dish) => (

                <TouchableOpacity
                  key={dish.id}
                  style={styles.dishCard}
                  onPress={() => handleViewDish(dish)}
                  activeOpacity={0.8}
                >

                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  {dish.imageUri &&
                  dish.imageUri.trim() !== "" ? (

                    <Image
                      key={dish.imageUri}
                      source={{
                        uri: dish.imageUri,
                      }}
                      style={styles.dishImage}
                      resizeMode="cover"
                      onLoad={() => {
                        console.log(
                          "IMAGE SUCCESSFULLY LOADED:",
                          dish.imageUri
                        );
                      }}
                      onError={(error) => {
                        console.log(
                          "IMAGE FAILED TO LOAD:",
                          error.nativeEvent
                        );

                        console.log(
                          "IMAGE URI:",
                          dish.imageUri
                        );
                      }}
                    />

                  ) : (

                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>
                        No image
                      </Text>
                    </View>

                  )}

                  {/* ==================================================
                      DISH INFORMATION
                  ================================================== */}

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

        {/* ==================================================
            STATISTICS
        ================================================== */}

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

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#2FA9D9",
  },

  container: {
    flex: 1,
    backgroundColor: "#2FA9D9",
  },

  /* ==========================================================
     HEADER
  ========================================================== */

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

  /* ==========================================================
     ADD MENU ITEM
  ========================================================== */

  addMenuButton: {
    height: 50,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    marginHorizontal: 28,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addMenuButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  /* ==========================================================
     MENU ITEMS TITLE
  ========================================================== */

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 10,
  },

  /* ==========================================================
     DISH AREA
  ========================================================== */

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

  /* ==========================================================
     DISH CARD
  ========================================================== */

  dishCard: {
    width: "100%",
    minHeight: 125,
    backgroundColor: "#D9D9D9",
    borderRadius: 18,
    marginBottom: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  /* ==========================================================
     DISH IMAGE
  ========================================================== */

  dishImage: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },

  imagePlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePlaceholderText: {
    color: "#969A9B",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ==========================================================
     DISH INFORMATION
  ========================================================== */

  dishInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  dishName: {
    color: "#000000",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 5,
  },

  dishCourse: {
    color: "#555555",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },

  dishPrice: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "800",
  },

  /* ==========================================================
     STATISTICS
  ========================================================== */

  statisticsButton: {
    height: 52,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    marginHorizontal: 28,
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