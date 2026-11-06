# Welcome to your Expo app 
# Project Overview
My ChefManager is a TypeScript/React Native mobile application built with Expo and Expo Router. It is designed to help a user create, organise, and manage a restaurant menu.

The current application flow is

Splash / Welcome Screen

Menu Manager

Add Menu Item

View Menu
The design is based on the supplied reference screens, using a blue background with grey and white controls and rounded menu cards.

Features

Splash / Welcome Screen

The welcome screen contains:

Chef image/logo from the assets folder.

Application title: MY CHEFMANAGER

Welcome description: A smart and easy to use mobile app that helps you create, organize and design your menu

get started button.

The get started button must navigate directly to Menu Manager, not to a dashboard.

Menu Manager

Menu Manager contains:

Back button

Menu Manager title

+ Add Menu Item button

MENU ITEMS heading

Dish cards

No dish when the menu is empty

Statistics button at the bottom

Each dish card is a button. Pressing a dish card opens View Menu.

A dish card displays:

Dish image

Dish name

Course

Price

Add Menu Item

The Add Menu Item screen allows the user to enter:

Dish Name

Description

Course

Price

Image

It also contains the existing Cancel and Save Item buttons.

Validation requirements:

Dish name maximum: 30 characters

Description maximum: 250 characters

Description must contain text only

Price must contain numbers and support a decimal/float value

Required fields cannot be empty

Missing required fields should show a custom popup saying Dish not added

When all required fields are valid, show a custom popup saying Dish added

After the dish is added, return to Menu Manager

The newly added dish must be displayed on Menu Manage

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

# author
**Name:** Busisiwe Ngwenya
**Student number:** ST10519363
**Course:** Higher Certificate in Mobile Application and Web Development  
**Module:** MAST5112
**Institution:** Rosebank College  

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.
# Mission Statement
to the help the chef manage his disheshes

# Target audience
the chef

# Navigation
![Navigation](assets/images/Untitled%20(1).png)

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

# User Interface

The supplied reference design uses approximately:

Primary blue: #2FA9D9

Grey controls: #969A9B

Light grey cards: #D9D9D9

The interface uses:

Rounded buttons

Rounded menu cards

White text on the blue background

Back arrow in the header

Statistics button at the bottom of Menu Manager

Dish image on the left side of the dish card

Dish information on the right side
Running the Project

# Install dependencies:

npm install

Start Expo:

npx expo start

# Current Development Goal

The main goal of the current version is to allow a user to:

Open the app.

Press get started.

Go directly to Menu Manager.

Add a menu item.

Validate the dish information.

Select an image.

Save the dish.

Return automatically to Menu Manager.

See the newly added dish and its selected image.

Press the dish card to open View Menu.

The interface should remain consistent with the supplied reference design and should not introduce a dashboard between the splash screen and Menu Manager.


# PART 2 CHANGELOGS 
# ChefMenu – Restaurant Menu Manager

## 1. Project Overview

ChefMenu is a React Native mobile application developed using TypeScript and Expo. The application helps restaurant managers and chefs create, manage, organise and monitor their restaurant menus.

The application allows users to add menu items, view dish information, edit existing dishes, delete dishes, search for menu items and filter dishes according to their course.

It also provides menu statistics to give restaurant managers an overview of their menu.

---

## 2. Technologies Used

- React Native
- TypeScript
- Expo
- Expo Router
- AsyncStorage
- React Native Safe Area Context
- Expo Image Picker
- Expo Image Manipulator

---

## 3. Application Features

### 3.1 Menu Management

The application includes functionality to:

- Add new menu items.
- View saved menu items.
- Edit existing menu items.
- Update menu item information.
- Delete menu items.
- Store menu information using AsyncStorage.
- Display dish images, descriptions, courses and prices.

### 3.2 Search and Filter

Search and filtering functionality was introduced to make managing menu items easier.

Features include:

- Search for dishes using their names.
- Filter dishes by Starter.
- Filter dishes by Main Course.
- Filter dishes by Dessert.
- View all menu items.
- Clear search text and selected filters.
- Display a message when no matching dishes are found.

### 3.3 Menu Statistics

A statistics feature was introduced to provide an overview of the restaurant menu.

The statistics include:

- Total number of menu items.
- Average price of all menu items.
- Total number of starters.
- Total number of main courses.
- Total number of desserts.

Statistics are calculated using the saved menu data and displayed in a modal pop-up.

### 3.4 User Interface Improvements

The application uses a consistent blue and grey colour scheme.

The following interface improvements were introduced:

- Consistent button styling.
- Rounded menu item cards.
- Improved spacing and alignment.
- Search bar and course filter buttons.
- Clear search and filter functionality.
- Statistics modal.
- Improved loading and empty-menu messages.
- Image placeholders for dishes without images.

---

## 4. Code Organisation

The application uses separate files to organise screens, storage functionality and reusable components.

### Project Structure

```text
My_ChefMenu
│
├── src
│   │
│   ├── app
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── menu_manager.tsx
│   │   ├── add_menu_item.tsx
│   │   ├── view_menu.tsx
│   │   └── dishStorage.ts
│   │
│   └── components
│       ├── CustomButton.tsx
│       └── InputField.tsx
│
├── package.json
└── README.md
```

### File Descriptions

| File | Description |
|---|---|
| `_layout.tsx` | Manages application navigation using Expo Router. |
| `index.tsx` | Application splash or welcome screen. |
| `menu_manager.tsx` | Displays, searches and filters menu items and provides menu statistics. |
| `add_menu_item.tsx` | Allows users to add and edit menu items. |
| `view_menu.tsx` | Displays individual menu item information and provides editing and deletion options. |
| `dishStorage.ts` | Handles saving, retrieving, updating and deleting menu items. |
| `CustomButton.tsx` | Reusable button component. |
| `InputField.tsx` | Reusable input field component. |

---

# 5. CHANGELOG

All changes and improvements made during the development of ChefMenu are documented below.

## Version 1.0.0 – Initial Application

### Initial Development

- Created the React Native application using TypeScript.
- Set up the Expo project.
- Configured Expo Router for screen navigation.
- Created the initial splash screen.
- Created the Menu Manager screen.
- Created the Add Menu Item screen.
- Created the View Menu screen.
- Established the blue and grey application colour scheme.

## Version 1.1.0 – Menu Management

### Added

- Added functionality to create menu items.
- Added functionality to view individual dishes.
- Added functionality to delete menu items.
- Added image selection using Expo Image Picker.
- Added image resizing and cropping using Expo Image Manipulator.
- Added support for dish descriptions, prices and courses.

### Improved

- Implemented AsyncStorage for local menu data storage.
- Added functions for retrieving, adding, updating and deleting dishes.
- Improved navigation between menu screens.

## Version 1.2.0 – Search and Filtering

### Added

- Added a search bar for finding dishes by name.
- Added course filtering.
- Added Starter, Main Course and Dessert filters.
- Added an All filter to display every menu item.
- Added a Clear Search and Filters button.

### Improved

- Added messages when no menu items are available.
- Added messages when no matching search results are found.
- Improved handling of missing dish information.

## Version 1.3.0 – Menu Statistics

### Added

- Added a menu statistics button.
- Added a statistics modal.
- Added total menu item calculations.
- Added average menu price calculations.
- Added starter counts.
- Added main course counts.
- Added dessert counts.
- Added a Close button for the statistics modal.

### Improved

- Statistics are calculated using saved menu items.
- Presented statistics in an organised and readable format.

## Version 1.4.0 – Application Enhancements

### Added

- Created a reusable CustomButton component.
- Created a reusable InputField component.

### Improved

- Improved code organisation.
- Used more descriptive variable and function names.
- Improved search and filtering logic.
- Added safer handling of missing dish names and image paths.
- Improved loading and empty-state handling.
- Improved consistency in button and input styling.

### Further Improvements Planned

- Integrate reusable components throughout all application screens.
- Create reusable validation functions.
- Improve form validation and error messages.
- Improve success and deletion confirmation messages.
- Test all application features and navigation.
- Ensure a consistent user experience across all screens.

---

## 6. Data Storage

ChefMenu uses AsyncStorage to store menu items locally on the device.

Each menu item contains:

- Unique dish ID.
- Dish name.
- Dish description.
- Course category.
- Dish price.
- Dish image URI.

The application uses reusable storage functions to add, retrieve, update and delete menu items.

---

## 7. Installation and Running the Application

### Requirements

- Node.js
- Visual Studio Code
- Expo development environment
- Android emulator or Expo Go

### Installation

Open the project folder in Visual Studio Code and run:

```bash
npm install
```

### Start the Application

Run:

```bash
npx expo start -c
```

The application can then be opened using an Android emulator or a compatible Expo development environment.

---

## 8. Conclusion

ChefMenu was developed to simplify restaurant menu management.

The application provides menu creation, viewing, editing, deletion, searching, filtering and statistics functionality.

Development improvements also focused on code organisation, reusable components, validation, user feedback and a consistent interface.

The overall goal is to provide restaurant managers and chefs with a simple, organised and user-friendly tool for managing their restaurant menus.