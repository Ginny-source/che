import AsyncStorage from "@react-native-async-storage/async-storage";

export type Course = "Starter" | "Main Course" | "Dessert";

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  imageUri: string;
};

const STORAGE_KEY = "@my_chefmenu_dishes";

export const getDishes = async (): Promise<Dish[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error loading dishes:", error);
    return [];
  }
};

export const saveDishes = async (dishes: Dish[]) => {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(dishes)
  );
};

export const addDish = async (dish: Dish) => {
  const dishes = await getDishes();
  await saveDishes([...dishes, dish]);
};

export const updateDish = async (updatedDish: Dish) => {
  const dishes = await getDishes();

  const updatedDishes = dishes.map((dish) =>
    dish.id === updatedDish.id ? updatedDish : dish
  );

  await saveDishes(updatedDishes);
};

export const deleteDish = async (id: string) => {
  const dishes = await getDishes();

  const updatedDishes = dishes.filter(
    (dish) => dish.id !== id
  );

  await saveDishes(updatedDishes);
};

export const getDishById = async (
  id: string
): Promise<Dish | undefined> => {
  const dishes = await getDishes();

  return dishes.find((dish) => dish.id === id);
};