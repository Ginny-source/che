import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';


import { router, useLocalSearchParams } from 'expo-router';

/*
==============================================================
CHEF'S MENU MANAGER
VIEW MENU SCREEN
==============================================================

This screen displays the details of the dish selected from
the Menu Manager screen.

Navigation from menu.tsx:

    Dish Card
        ↓
    /view_menu?id=123

This screen reads the ID using:

    useLocalSearchParams()

==============================================================

IMPORTANT
--------------------------------------------------------------

The Edit and Delete buttons are intentionally NON-FUNCTIONAL
for now, as requested.

==============================================================
*/


/*
==============================================================
COLOUR TOKENS
==============================================================
*/

const COLORS = {
  blue: '#2FA9D9',
  white: '#FFFFFF',
  black: '#111111',
  grey: '#969A9B',
  lightGrey: '#E8E8E8',
};


/*
==============================================================
DISH TYPE
==============================================================
*/

type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
  course: string;
  imageUri?: string;
};


/*
==============================================================
TEMPORARY DISH DATA
==============================================================

This is only used so the screen can render while you are
building the application.

When your shared dish state/context is connected, this section
should be replaced with the actual dish retrieved using the
ID passed from menu.tsx.

==============================================================
*/

const exampleDish: Dish = {
  id: '1',
  name: 'Chicken Pasta',
  description:
    'Creamy pasta with grilled chicken, mushrooms and parmesan',
  price: '90.00',
  course: 'Main Course',
};


/*
==============================================================
MAIN SCREEN
==============================================================
*/

export default function ViewMenu() {

  /*
  ------------------------------------------------------------
  GET THE DISH ID
  ------------------------------------------------------------
  */

  const params = useLocalSearchParams();

  const dishId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;


  /*
  ------------------------------------------------------------
  CURRENT DISH
  ------------------------------------------------------------

  For now we use exampleDish.

  Once your Add Menu Item screen and shared state are connected,
  use dishId to find the actual dish.
  ------------------------------------------------------------
  */

  const dish = exampleDish;


  /*
  ------------------------------------------------------------
  BACK TO MENU
  ------------------------------------------------------------
  */

  const goBackToMenu = () => {
    router.back();
  };


  /*
  ============================================================
  SCREEN
  ============================================================
  */

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ----------------------------------------------------
          STATUS BAR
      ----------------------------------------------------- */}

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.blue}
        translucent={false}
      />


      <View style={styles.container}>

        {/* ==================================================
            HEADER
        ================================================== */}

        <View style={styles.header}>

          {/* Back arrow */}

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={goBackToMenu}
          >

           

          </TouchableOpacity>


          {/* Header title */}

          <Text style={styles.headerTitle}>
            View Menu
          </Text>


          {/* Empty space to keep title centered */}

          <View style={styles.headerRight} />

        </View>


        {/* Header divider */}

        <View style={styles.divider} />


        {/* ==================================================
            CONTENT
        ================================================== */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >

          {/* =================================================
              DISH IMAGE
          ================================================= */}

          <View style={styles.imageContainer}>

           

          </View>


          {/* =================================================
              DISH NAME + PRICE
          ================================================= */}

          <View style={styles.namePriceRow}>

            <Text
              style={styles.dishName}
              numberOfLines={2}
            >
              {dish.name}
            </Text>


            <Text style={styles.price}>
              R{dish.price}
            </Text>

          </View>


          {/* =================================================
              DESCRIPTION TITLE
          ================================================= */}

          <Text style={styles.sectionTitle}>
            DESCRIPTION
          </Text>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text style={styles.description}>
            {dish.description}
          </Text>


          {/* =================================================
              COURSE TITLE
          ================================================= */}

          <Text style={styles.sectionTitle}>
            COURSE
          </Text>


          {/* =================================================
              COURSE PILL
          ================================================= */}

          <View style={styles.coursePill}>

            <Text style={styles.courseText}>
              {dish.course}
            </Text>

          </View>


          {/* =================================================
              EDIT + DELETE
          ================================================= */}

          <View style={styles.actionRow}>

            {/* EDIT */}

            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.8}
              onPress={() => {
                // Edit functionality will be added later.
              }}
            >

              <Text style={styles.editText}>
                Edit
              </Text>

            </TouchableOpacity>


            {/* DELETE */}

            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.8}
              onPress={() => {
                // Delete functionality will be added later.
              }}
            >

              <Text style={styles.deleteText}>
                Delete
              </Text>

            </TouchableOpacity>

          </View>


          {/* =================================================
              BACK TO MENU
          ================================================= */}

          <TouchableOpacity
            style={styles.backToMenuButton}
            activeOpacity={0.8}
            onPress={goBackToMenu}
          >

            <Text style={styles.backToMenuText}>
              Back to Menu
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </View>

    </SafeAreaView>
  );
}


/*
==============================================================
STYLES
==============================================================
*/

const styles = StyleSheet.create({

  /*
  ============================================================
  SAFE AREA
  ============================================================
  */

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },


  /*
  ============================================================
  CONTAINER
  ============================================================
  */

  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },


  /*
  ============================================================
  HEADER
  ============================================================
  */

  header: {
    height: 82,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 18,
  },


  backButton: {
    width: 42,

    height: 42,

    alignItems: 'center',

    justifyContent: 'center',
  },


  headerTitle: {
    color: COLORS.white,

    fontSize: 27,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },


  headerRight: {
    width: 42,

    height: 42,
  },


  divider: {
    width: '100%',

    height: 1,

    backgroundColor: 'rgba(255,255,255,0.85)',
  },


  /*
  ============================================================
  SCROLL VIEW
  ============================================================
  */

  scrollView: {
    flex: 1,

    backgroundColor: COLORS.blue,
  },


  contentContainer: {
    paddingHorizontal: 22,

    paddingTop: 30,

    paddingBottom: 40,
  },


  /*
  ============================================================
  IMAGE
  ============================================================
  */

  imageContainer: {
    width: '100%',

    height: 172,

    backgroundColor: '#D9D9D9',

    borderRadius: 10,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 27,
  },


  /*
  ============================================================
  NAME + PRICE
  ============================================================
  */

  namePriceRow: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 18,
  },


  dishName: {
    flex: 1,

    color: COLORS.black,

    fontSize: 29,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',

    marginRight: 12,
  },


  price: {
    color: COLORS.white,

    fontSize: 25,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },


  /*
  ============================================================
  SECTION TITLE
  ============================================================
  */

  sectionTitle: {
    color: COLORS.white,

    fontSize: 20,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',

    marginTop: 3,

    marginBottom: 6,
  },


  /*
  ============================================================
  DESCRIPTION
  ============================================================
  */

  description: {
    color: COLORS.black,

    fontSize: 17,

    lineHeight: 25,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: '600',

    marginBottom: 14,

    maxWidth: '95%',
  },


  /*
  ============================================================
  COURSE PILL
  ============================================================
  */

  coursePill: {
    alignSelf: 'flex-start',

    backgroundColor: COLORS.grey,

    borderRadius: 10,

    paddingHorizontal: 16,

    paddingVertical: 7,

    marginTop: 2,

    marginBottom: 42,
  },


  courseText: {
    color: COLORS.black,

    fontSize: 16,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },


  /*
  ============================================================
  ACTION BUTTONS
  ============================================================
  */

  actionRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    width: '100%',

    marginBottom: 39,
  },


  /*
  ============================================================
  EDIT BUTTON
  ============================================================
  */

  editButton: {
    width: '44%',

    height: 38,

    backgroundColor: COLORS.grey,

    borderRadius: 9,

    alignItems: 'center',

    justifyContent: 'center',
  },


  editText: {
    color: COLORS.white,

    fontSize: 17,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },


  /*
  ============================================================
  DELETE BUTTON
  ============================================================
  */

  deleteButton: {
    width: '44%',

    height: 38,

    backgroundColor: COLORS.lightGrey,

    borderRadius: 9,

    alignItems: 'center',

    justifyContent: 'center',
  },


  deleteText: {
    color: COLORS.black,

    fontSize: 17,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },


  /*
  ============================================================
  BACK TO MENU
  ============================================================
  */

  backToMenuButton: {
    width: '100%',

    height: 38,

    backgroundColor: COLORS.lightGrey,

    borderRadius: 9,

    alignItems: 'center',

    justifyContent: 'center',
  },


  backToMenuText: {
    color: COLORS.black,

    fontSize: 17,

    fontFamily: 'Georgia',

    fontStyle: 'italic',

    fontWeight: 'bold',
  },

});