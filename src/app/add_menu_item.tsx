import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

type Course = "Starter" | "Main Course" | "Dessert";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  imageUri: string;
};

type PopupType = "success" | "warning" | "error";

export default function AddMenuItem() {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<Course | "">("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Custom popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>("error");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  /*
   * Use a ref instead of state for the popup action.
   * This prevents the navigation callback from getting lost
   * while the popup is closing.
   */
  const popupActionRef = useRef<(() => void) | null>(null);

  const showCutePopup = (
    type: PopupType,
    title: string,
    message: string,
    action?: () => void
  ) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMessage(message);

    popupActionRef.current = action ?? null;

    setPopupVisible(true);
  };

  /*
   * Close popup first, then navigate.
   * The small delay gives the Modal time to close before
   * Expo Router changes screens.
   */
  const closeCutePopup = () => {
    const action = popupActionRef.current;

    popupActionRef.current = null;
    setPopupVisible(false);

    if (action) {
      setTimeout(() => {
        action();
      }, 250);
    }
  };

  /*
   * IMPORTANT:
   * Do not use router.back() here.
   *
   * If this screen is opened directly, there may be no
   * previous route. replace() guarantees that Menu Manager
   * becomes the screen we return to.
   */
  const handleBackToMenuManager = () => {
    router.replace("../menu_manager");
  };

  /*
   * Process and resize the selected image.
   */
  const processSelectedImage = async (
    selectedImage: ImagePicker.ImagePickerAsset
  ) => {
    try {
      setImageLoading(true);

      const imageWidth = selectedImage.width ?? 0;
      const imageHeight = selectedImage.height ?? 0;

      // Image must be at least 400 x 400
      if (imageWidth < 400 || imageHeight < 400) {
        setImageUri(null);
        setImageError(true);

        showCutePopup(
          "warning",
          "Image too small",
          "Please choose an image that is at least 400 x 400 pixels."
        );

        return;
      }

      let processedImage: ImageManipulator.ImageResult;

      /*
       * Crop the image into a square using the largest possible
       * centered square, then resize it to exactly 400 x 400.
       */
      if (imageWidth > 0 && imageHeight > 0) {
        const size = Math.min(imageWidth, imageHeight);

        const cropX = (imageWidth - size) / 2;
        const cropY = (imageHeight - size) / 2;

        processedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [
            {
              crop: {
                originX: cropX,
                originY: cropY,
                width: size,
                height: size,
              },
            },
            {
              resize: {
                width: 400,
                height: 400,
              },
            },
          ],
          {
            compress: 0.9,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );
      } else {
        processedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [
            {
              resize: {
                width: 400,
                height: 400,
              },
            },
          ],
          {
            compress: 0.9,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );
      }

      setImageUri(processedImage.uri);
      setImageError(false);
    } catch (error) {
      console.log("IMAGE PROCESSING ERROR:", error);

      setImageUri(null);
      setImageError(true);

      showCutePopup(
        "error",
        "Image error",
        "There was a problem processing that image. Please choose another image."
      );
    } finally {
      setImageLoading(false);
    }
  };

  /*
   * Pick image from gallery.
   */
  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        showCutePopup(
          "warning",
          "Permission required",
          "Please allow photo library access so you can choose a dish image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        selectionLimit: 1,
      });

      if (result.canceled) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        await processSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.log("IMAGE PICKER ERROR:", error);

      showCutePopup(
        "error",
        "Image error",
        "Unable to open your photo library. Please try again."
      );
    }
  };

  /*
   * Handles Android/Expo cases where the image picker activity
   * is killed and returns a pending result.
   */
  useEffect(() => {
    let mounted = true;

    const checkPendingImage = async () => {
      try {
        const pendingResult = await ImagePicker.getPendingResultAsync();

        if (!mounted) {
          return;
        }

        if (
          pendingResult &&
          "canceled" in pendingResult &&
          !pendingResult.canceled &&
          "assets" in pendingResult &&
          pendingResult.assets &&
          pendingResult.assets.length > 0
        ) {
          await processSelectedImage(pendingResult.assets[0]);
        }
      } catch (error) {
        console.log("PENDING IMAGE ERROR:", error);
      }
    };

    checkPendingImage();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Dish name:
   * Maximum 30 characters.
   */
  const handleNameChange = (text: string) => {
    if (text.length <= 30) {
      setDishName(text);
      setNameError(false);
    }
  };

  /*
   * Description:
   * Letters and spaces only.
   * Maximum 250 characters.
   */
  const handleDescriptionChange = (text: string) => {
    const lettersAndSpacesOnly = text.replace(/[^a-zA-Z\s]/g, "");

    if (lettersAndSpacesOnly.length <= 250) {
      setDescription(lettersAndSpacesOnly);
      setDescriptionError(false);
    }
  };

  /*
   * Price:
   * Numbers and one decimal point.
   */
  const handlePriceChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");

    const decimalParts = cleaned.split(".");

    if (decimalParts.length > 2) {
      return;
    }

    setPrice(cleaned);
    setPriceError(false);
  };

  /*
   * Select course.
   */
  const handleSelectCourse = (selectedCourse: Course) => {
    setCourse(selectedCourse);
    setCourseError(false);
    setCourseModalVisible(false);
  };

  /*
   * Validate and save dish.
   */
  const handleSaveDish = () => {
    const cleanName = dishName.trim();
    const cleanDescription = description.trim();
    const cleanPrice = price.trim();

    const missingName = cleanName.length === 0;
    const missingDescription = cleanDescription.length === 0;
    const missingCourse = course === "";
    const missingPrice = cleanPrice.length === 0;
    const missingImage = !imageUri;

    setNameError(missingName);
    setDescriptionError(missingDescription);
    setCourseError(missingCourse);
    setPriceError(missingPrice);
    setImageError(missingImage);

    /*
     * Stop here if anything is missing.
     */
    if (
      missingName ||
      missingDescription ||
      missingCourse ||
      missingPrice ||
      missingImage
    ) {
      showCutePopup(
        "error",
        "Dish not added",
        "Please complete all the required fields before adding your dish."
      );

      return;
    }

    /*
     * Validate numeric price.
     */
    const numericPrice = Number.parseFloat(cleanPrice);

    if (!Number.isFinite(numericPrice)) {
      setPriceError(true);

      showCutePopup(
        "error",
        "Invalid price",
        "Please enter a valid price for your dish."
      );

      return;
    }

    /*
     * Create the dish.
     */
    const newDish: Dish = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      name: cleanName,
      description: cleanDescription,
      course: course as Course,
      price: numericPrice,
      imageUri: imageUri,
    };

    /*
     * Show success popup.
     *
     * When Okay is pressed, the popup closes and then
     * Menu Manager is opened with the new dish.
     */
    showCutePopup(
      "success",
      "Dish added",
      `${cleanName} has been added to your menu.`,
      () => {
        router.replace({
          pathname: "../menu_manager",
          params: {
            dish: JSON.stringify(newDish),
          },
        });
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToMenuManager}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add Menu Item</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.headerLine} />

        {/* CONTENT */}
        <View style={styles.formContainer}>
          {/* DISH NAME */}
          <Text style={styles.label}>Dish Name</Text>

          <TextInput
            style={[
              styles.input,
              nameError && styles.inputError,
            ]}
            value={dishName}
            onChangeText={handleNameChange}
            placeholder="Enter dish name"
            placeholderTextColor="#E5E5E5"
            maxLength={30}
          />

          <Text style={styles.counterText}>
            {dishName.length}/30
          </Text>

          {nameError && (
            <Text style={styles.errorText}>
              Dish name is required.
            </Text>
          )}

          {/* DESCRIPTION */}
          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[
              styles.descriptionInput,
              descriptionError && styles.inputError,
            ]}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Enter dish description"
            placeholderTextColor="#E5E5E5"
            multiline
            textAlignVertical="top"
            maxLength={250}
          />

          <Text style={styles.counterText}>
            {description.length}/250
          </Text>

          {descriptionError && (
            <Text style={styles.errorText}>
              Description is required.
            </Text>
          )}

          {/* COURSE - BEFORE PRICE */}
          <Text style={styles.label}>Course</Text>

          <TouchableOpacity
            style={[
              styles.selectButton,
              courseError && styles.inputError,
            ]}
            onPress={() => {
              setCourseModalVisible(true);
              setCourseError(false);
            }}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.selectButtonText,
                !course && styles.placeholderText,
              ]}
            >
              {course || "Select course"}
            </Text>

            <Text style={styles.dropdownArrow}>⌄</Text>
          </TouchableOpacity>

          {courseError && (
            <Text style={styles.errorText}>
              Course is required.
            </Text>
          )}

          {/* PRICE */}
          <Text style={styles.label}>Price</Text>

          <View
            style={[
              styles.priceContainer,
              priceError && styles.inputError,
            ]}
          >
            <Text style={styles.currency}>R</Text>

            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={handlePriceChange}
              placeholder="0.00"
              placeholderTextColor="#E5E5E5"
              keyboardType="decimal-pad"
            />
          </View>

          {priceError && (
            <Text style={styles.errorText}>
              Price is required.
            </Text>
          )}

          {/* IMAGE */}
          <Text style={styles.label}>Dish Image</Text>

          <TouchableOpacity
            style={[
              styles.imageButton,
              imageError && styles.inputError,
            ]}
            onPress={handlePickImage}
            activeOpacity={0.8}
            disabled={imageLoading}
          >
            {imageLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.imageButtonText}>
                {imageUri ? "Change Image" : "Choose Image"}
              </Text>
            )}
          </TouchableOpacity>

          {imageError && (
            <Text style={styles.errorText}>
              Dish image is required.
            </Text>
          )}

          {/* IMAGE PREVIEW */}
          {imageUri && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            </View>
          )}

          {/* ADD DISH BUTTON */}
          <TouchableOpacity
            style={styles.addDishButton}
            onPress={handleSaveDish}
            activeOpacity={0.8}
          >
            <Text style={styles.addDishText}>Add Dish</Text>
          </TouchableOpacity>
        </View>

        {/* COURSE MODAL */}
        <Modal
          visible={courseModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCourseModalVisible(false)}
        >
          <View style={styles.courseOverlay}>
            <View style={styles.courseModal}>
              <Text style={styles.courseModalTitle}>
                Select Course
              </Text>

              <TouchableOpacity
                style={styles.courseOption}
                onPress={() =>
                  handleSelectCourse("Starter")
                }
                activeOpacity={0.8}
              >
                <Text style={styles.courseOptionText}>
                  Starter
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.courseOption}
                onPress={() =>
                  handleSelectCourse("Main Course")
                }
                activeOpacity={0.8}
              >
                <Text style={styles.courseOptionText}>
                  Main Course
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.courseOption}
                onPress={() =>
                  handleSelectCourse("Dessert")
                }
                activeOpacity={0.8}
              >
                <Text style={styles.courseOptionText}>
                  Dessert
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.courseCancelButton}
                onPress={() =>
                  setCourseModalVisible(false)
                }
                activeOpacity={0.8}
              >
                <Text style={styles.courseCancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* CUSTOM POPUP */}
        <Modal
          visible={popupVisible}
          transparent
          animationType="fade"
          onRequestClose={closeCutePopup}
        >
          <View style={styles.popupOverlay}>
            <View style={styles.cutePopup}>
              {/* POPUP SYMBOL */}
              <View
                style={[
                  styles.popupCircle,
                  popupType === "success"
                    ? styles.successCircle
                    : popupType === "warning"
                    ? styles.warningCircle
                    : styles.errorCircle,
                ]}
              >
                <Text style={styles.popupSymbol}>
                  {popupType === "success"
                    ? "✓"
                    : popupType === "warning"
                    ? "!"
                    : "×"}
                </Text>
              </View>

              <Text style={styles.popupTitle}>
                {popupTitle}
              </Text>

              <Text style={styles.popupMessage}>
                {popupMessage}
              </Text>

              <TouchableOpacity
                style={[
                  styles.popupButton,
                  popupType === "success"
                    ? styles.popupSuccessButton
                    : styles.popupNormalButton,
                ]}
                onPress={closeCutePopup}
                activeOpacity={0.8}
              >
                <Text style={styles.popupButtonText}>
                  {popupType === "success"
                    ? "Okay"
                    : "Close"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },

  /* HEADER */
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

  /* FORM */
  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 7,
  },

  input: {
    height: 48,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    paddingHorizontal: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },

  descriptionInput: {
    height: 85,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },

  inputError: {
    borderWidth: 2,
    borderColor: "#FF6B81",
  },

  counterText: {
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "right",
    marginTop: 3,
  },

  errorText: {
    color: "#FFE5EA",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  /* COURSE */
  selectButton: {
    height: 48,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  placeholderText: {
    color: "#E5E5E5",
  },

  dropdownArrow: {
    color: "#FFFFFF",
    fontSize: 24,
    marginTop: -5,
  },

  /* PRICE */
  priceContainer: {
    height: 48,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  currency: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginRight: 8,
  },

  priceInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: 48,
  },

  /* IMAGE */
  imageButton: {
    height: 48,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  imagePreviewContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },

  /* ADD BUTTON */
  addDishButton: {
    height: 52,
    backgroundColor: "#8FD9A8",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },

  addDishText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  /* COURSE MODAL */
  courseOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  courseModal: {
    width: "100%",
    backgroundColor: "#FFF9FC",
    borderRadius: 25,
    padding: 22,
  },

  courseModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 15,
  },

  courseOption: {
    height: 50,
    backgroundColor: "#969A9B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  courseOptionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  courseCancelButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  courseCancelText: {
    color: "#555555",
    fontSize: 15,
    fontWeight: "600",
  },

  /* CUSTOM POPUP */
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  cutePopup: {
    width: "100%",
    backgroundColor: "#FFF9FC",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 28,
    alignItems: "center",
  },

  popupCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  successCircle: {
    backgroundColor: "#8FD9A8",
  },

  warningCircle: {
    backgroundColor: "#F5D77A",
  },

  errorCircle: {
    backgroundColor: "#FF9CAD",
  },

  popupSymbol: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "700",
  },

  popupTitle: {
    color: "#333333",
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  popupMessage: {
    color: "#666666",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },

  popupButton: {
    width: "100%",
    height: 48,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  popupSuccessButton: {
    backgroundColor: "#8FD9A8",
  },

  popupNormalButton: {
    backgroundColor: "#969A9B",
  },

  popupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});