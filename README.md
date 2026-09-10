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
