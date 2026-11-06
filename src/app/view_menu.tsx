import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { getDishById, deleteDish } from "./dishStorage";
import type { Dish } from "./dishStorage";

export default function ViewMenu() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [dish, setDish] = useState<Dish | undefined>();

  useEffect(() => {
    loadDish();
  }, [id]);

  const loadDish = async () => {
    if (!id) return;

    const selectedDish = await getDishById(id);

    setDish(selectedDish);
  };

  const handleEdit = () => {
    if (!dish) return;

    router.push({
      pathname: "/add_menu_item",
      params: {
        id: dish.id,
      },
    });
  };

  const handleDelete = () => {
    if (!dish) return;

    Alert.alert(
      "Delete Dish",
      `Are you sure you want to delete ${dish.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteDish(dish.id);
            router.replace("/menu_manager");
          },
        },
      ],
    );
  };

  if (!dish) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading dish...</Text>

 <TouchableOpacity onPress={() => router.replace("/menu_manager")}>
  <Text style={styles.buttonText}>Go Back</Text>
</TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>View Menu</Text>

          <View style={{ width: 35 }} />
        </View>

        <View style={styles.headerLine} />

        {/* DISH IMAGE */}

        {dish.imageUri ? (
          <Image
            source={{ uri: dish.imageUri }}
            style={styles.dishImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}

        {/* DISH DETAILS */}

        <View style={styles.detailsContainer}>
          <Text style={styles.dishName}>{dish.name}</Text>

          <Text style={styles.course}>{dish.course}</Text>

          <Text style={styles.description}>{dish.description}</Text>

          <Text style={styles.price}>R {Number(dish.price).toFixed(2)}</Text>
        </View>

        {/* EDIT BUTTON */}

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit Dish</Text>
        </TouchableOpacity>

        {/* DELETE BUTTON */}

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Dish</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  backArrow: {
    color: "#FFFFFF",
    fontSize: 34,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  headerLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
  },

  dishImage: {
    width: "85%",
    height: 230,
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 25,
  },

  imagePlaceholder: {
    width: "85%",
    height: 230,
    backgroundColor: "#969A9B",
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  detailsContainer: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 25,
    marginTop: 25,
    padding: 20,
    borderRadius: 18,
  },

  dishName: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "800",
  },

  course: {
    color: "#555555",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "600",
  },

  description: {
    color: "#333333",
    fontSize: 16,
    marginTop: 15,
    lineHeight: 24,
  },

  price: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 18,
  },

  editButton: {
    height: 50,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    marginHorizontal: 28,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    height: 50,
    backgroundColor: "#D9534F",
    borderRadius: 12,
    marginHorizontal: 28,
    marginTop: 15,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
  },

  backButton: {
    backgroundColor: "#969A9B",
    padding: 15,
    margin: 30,
    borderRadius: 12,
    alignItems: "center",
  },
});
