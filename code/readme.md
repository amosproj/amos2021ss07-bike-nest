# Note
- [Expo](https://docs.expo.io) is required
	- to run the app an Expo Account is needed 
	- for the Android Simulator Android Studio is required
	- for the iOS Simulator Xcode is required
- [Yarn](https://yarnpkg.com) as a package manager was used

# General
This folder contains the End-User App which is based on React (Expo). The `App.js` combines all screens which you can find in the `screens` folder.

# To setup and start the Frontend
1. Clone the current project
2. In a CLI navigate to the `code` folder
3. Run `yarn install` to install all used dependencies
3. Run `yarn start` or `expo start` to start the development server
4. Press e.g. `a` in the CLI to start the Android Emulator or select it from the Expo Dev Tools which pop up as soon as the development server started


# Testing
tbd

# CI / CD 
We have a Github Action that will build the application with expo on release. With valid access rights, the APK can then be
downloaded from EXPO.