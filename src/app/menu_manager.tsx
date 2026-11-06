import { useCallback, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useFocusEffect } from "expo-router";

import type { Dish, Course} from "./dishStorage";
import { getDishes } from "./dishStorage";

export default function MenuManager() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  // SEARCH AND FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState<Course | "All">("All");

  // LOAD SAVED DISHES
  const loadDishes = async () => {
    try {
      setLoading(true);

      const savedDishes = await getDishes();

      setDishes(
        Array.isArray(savedDishes) ? savedDishes : []
      );
    } catch (error) {
      console.log("Error loading dishes:", error);
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDishes();
    }, [])
  );

  // SEARCH AND FILTER DISHES
  const normalizedSearch = String(searchText ?? "")
    .trim()
    .toLowerCase();

  const filteredDishes = dishes.filter((dish) => {
    const dishName = String(dish?.name ?? "")
      .trim()
      .toLowerCase();

    const matchesSearch = dishName.includes(normalizedSearch);

    const matchesCourse =
      selectedCourse === "All" ||
      dish?.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  // CLEAR SEARCH AND FILTERS
  const clearFilters = () => {
    setSearchText("");
    setSelectedCourse("All");
  };

  // ADD MENU ITEM
  const handleAddMenuItem = () => {
    router.push("/add_menu_item");
  };

  // VIEW SELECTED DISH
  const handleViewDish = (dish: Dish) => {
    router.push({
      pathname: "/view_menu",
      params: {
        id: dish.id,
      },
    });
  };

  // STATISTICS MODAL
const [showStatistics, setShowStatistics] = useState(false);

// TOTAL NUMBER OF DISHES
const totalDishes = dishes.length;

// AVERAGE PRICE
const totalPrice = dishes.reduce((total, dish) => {
  const price = Number(dish.price);
  return total + (Number.isFinite(price) ? price : 0);
}, 0);

const averagePrice =
  totalDishes > 0 ? totalPrice / totalDishes : 0;

// NUMBER OF DISHES IN EACH COURSE
const starterCount = dishes.filter(
  (dish) => dish.course === "Starter"
).length;

const mainCourseCount = dishes.filter(
  (dish) => dish.course === "Main Course"
).length;

const dessertCount = dishes.filter(
  (dish) => dish.course === "Dessert"
).length;

  // BACK BUTTON
  const handleBack = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Menu Manager</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.headerLine} />

        {/* ADD MENU ITEM BUTTON */}

        <TouchableOpacity
          style={styles.addMenuButton}
          onPress={handleAddMenuItem}
          activeOpacity={0.8}
        >
          <Text style={styles.addMenuButtonText}>+ Add Menu Item</Text>
        </TouchableOpacity>
        

        {/* MENU ITEMS TITLE */}

        <Text style={styles.sectionTitle}>MENU ITEMS</Text>

{/* SEARCH BAR */}

<TextInput
  style={styles.searchInput}
  placeholder="Search dish by name..."
  placeholderTextColor="#777777"
  value={searchText}
  onChangeText={setSearchText}
/>

{/* COURSE FILTERS */}

<View style={styles.filterContainer}>
  {(["All", "Starter", "Main Course", "Dessert"] as const).map(
    (item) => (
      <TouchableOpacity
        key={item}
        style={[
          styles.filterButton,
          selectedCourse === item && styles.activeFilterButton,
        ]}
        onPress={() => setSelectedCourse(item)}
      >
        <Text
          style={[
            styles.filterText,
            selectedCourse === item && styles.activeFilterText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )
  )}
</View>

{/* CLEAR FILTER BUTTON */}

<TouchableOpacity
  style={styles.clearButton}
  onPress={clearFilters}
>
  <Text style={styles.clearButtonText}>
    Clear Search & Filters
  </Text>
</TouchableOpacity>
       
        {/* DISH LIST */}

        <View style={styles.dishArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              dishes.length === 0 ? styles.emptyScrollContent : null,
            ]}
          >
         {loading ? (
  <Text style={styles.noDishText}>
    Loading dishes...
  </Text>
) : filteredDishes.length === 0 ? (
  <Text style={styles.noDishText}>
    {dishes.length === 0
      ? "No dishes added yet."
      : "No matching dishes found."}
  </Text>
) : (
  filteredDishes.map((dish) => (
    <TouchableOpacity
      key={dish.id}
      style={styles.dishCard}
      onPress={() => handleViewDish(dish)}
      activeOpacity={0.8}
    >
     {String(dish?.imageUri ?? "").trim() !== "" ? (
        <Image
          source={{ uri: String(dish.imageUri) }}
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

      <View style={styles.dishInfo}>
        <Text style={styles.dishName} numberOfLines={2}>
          {dish.name || "Unnamed Dish"}
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

    

{/* STATISTICS BUTTON */}

<TouchableOpacity
  style={styles.statisticsButton}
  onPress={() => setShowStatistics(true)}
  activeOpacity={0.8}
>
  <Text style={styles.statisticsText}>
    View Menu Statistics
  </Text>
</TouchableOpacity>

{/* STATISTICS POP-UP GOES HERE */}

<Modal
  visible={showStatistics}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setShowStatistics(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.statisticsModal}>

      <Text style={styles.statisticsTitle}>
        Menu Statistics
      </Text>

      <Text style={styles.statisticsSubtitle}>
        Overview of your restaurant menu
      </Text>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>
          Total Menu Items
        </Text>
        <Text style={styles.statNumber}>
          {totalDishes}
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>
          Average Menu Price
        </Text>
        <Text style={styles.statNumber}>
          R {averagePrice.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.courseHeading}>
        Menu Items Per Course
      </Text>

      <View style={styles.courseRow}>
        <Text style={styles.courseLabel}>Starters</Text>
        <Text style={styles.courseNumber}>{starterCount}</Text>
      </View>

      <View style={styles.courseRow}>
        <Text style={styles.courseLabel}>Main Courses</Text>
        <Text style={styles.courseNumber}>{mainCourseCount}</Text>
      </View>

      <View style={styles.courseRow}>
        <Text style={styles.courseLabel}>Desserts</Text>
        <Text style={styles.courseNumber}>{dessertCount}</Text>
      </View>

      <TouchableOpacity
        style={styles.closeStatisticsButton}
        onPress={() => setShowStatistics(false)}
      >
        <Text style={styles.closeStatisticsText}>
          Close
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

      </View>
    </SafeAreaView>
  );
}
   
// STYLES

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

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginHorizontal: 22,
    marginTop: 25,
    marginBottom: 10,
  },

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
  // SEARCH BAR
searchInput: {
  height: 48,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  marginHorizontal: 22,
  marginTop: 12,
  paddingHorizontal: 15,
  fontSize: 15,
  color: "#000000",
},

// FILTER BUTTONS
filterContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginHorizontal: 15,
  marginTop: 12,
},

filterButton: {
  backgroundColor: "#969A9B",
  paddingVertical: 9,
  paddingHorizontal: 13,
  borderRadius: 20,
  margin: 4,
},

activeFilterButton: {
  backgroundColor: "#FFFFFF",
  borderWidth: 2,
  borderColor: "#969A9B",
},

filterText: {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "600",
},

activeFilterText: {
  color: "#2FA9D9",
  fontWeight: "800",
},

// CLEAR BUTTON
clearButton: {
  alignSelf: "center",
  paddingVertical: 8,
  paddingHorizontal: 15,
  marginTop: 5,
  marginBottom: 8,
},

clearButtonText: {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "700",
  textDecorationLine: "underline",
},
// STATISTICS MODAL

modalBackground: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

statisticsModal: {
  width: "100%",
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  padding: 22,
  alignItems: "center",
},

statisticsTitle: {
  fontSize: 24,
  fontWeight: "800",
  color: "#2FA9D9",
  marginBottom: 5,
},

statisticsSubtitle: {
  fontSize: 13,
  color: "#777777",
  marginBottom: 18,
},

statCard: {
  width: "100%",
  backgroundColor: "#E8F6FC",
  borderRadius: 12,
  padding: 15,
  marginBottom: 12,
  alignItems: "center",
},

statLabel: {
  fontSize: 15,
  color: "#555555",
  fontWeight: "600",
},

statNumber: {
  fontSize: 25,
  fontWeight: "800",
  color: "#2FA9D9",
  marginTop: 5,
},

courseHeading: {
  fontSize: 17,
  fontWeight: "800",
  color: "#333333",
  marginTop: 8,
  marginBottom: 10,
},

courseRow: {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#DDDDDD",
},

courseLabel: {
  fontSize: 15,
  color: "#444444",
  fontWeight: "600",
},

courseNumber: {
  fontSize: 16,
  color: "#2FA9D9",
  fontWeight: "800",
},

closeStatisticsButton: {
  width: "100%",
  backgroundColor: "#2FA9D9",
  borderRadius: 12,
  padding: 14,
  alignItems: "center",
  marginTop: 20,
},

closeStatisticsText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "800",
},
});
