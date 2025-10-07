# ✅ Advanced To-Do & Component Showcase

This is an advanced to-do list application built with React Native and Expo. It's designed to be a comprehensive showcase of modern mobile development techniques, including robust state management, dynamic theming, offline support, and a variety of sophisticated UI patterns.

[![Deploy with Vercel](https://vercel.com/button)](https://my-to-do-app-lac.vercel.app/)

**[➡️ View the Live Demo Here!](https://my-to-do-app-lac.vercel.app/)**



## ## Key Features

This application is packed with features that demonstrate a polished and professional user experience.

* **📝 Full To-Do Functionality**: A complete system for adding tasks, managed through a centralized `TodoContext` for robust state management.
* **🎨 Advanced Theming**: Includes custom-built **Light and Dark themes** that automatically adapt to your device's system settings for a seamless look and feel.
* **📴 Offline Support**: The app intelligently detects when your network connection is lost and alerts you that your work is being saved locally, ready to sync when you're back online.
* **📱 Modern Modal Showcase**: Demonstrates a variety of native modal presentation styles available through Expo Router, including:
    * Standard Modals
    * Resizable Form Sheets
    * Transparent Modals
* **✨ Glass UI Effects**: Utilizes `expo-glass-effect` to create beautiful, blurred UI components that mimic the modern aesthetic of native platforms.
* **📳 Haptic Feedback**: Enhances user interaction with subtle haptic feedback using `expo-haptics` when a new task is successfully added.
* **⌨️ Polished UX**: The "Add Task" form includes thoughtful details like `KeyboardAvoidingView`, input validation, and confirmation alerts to prevent accidental data loss.

## ## Technology Stack

* **Framework**: React Native & Expo
* **Language**: TypeScript
* **Navigation**: Expo Router
* **State Management**: React Context API (`TodoProvider`, `WidgetProvider`)
* **Native Features**: Expo Network, Expo Haptics
* **UI Libraries**: `expo-glass-effect`
* **Deployment**: Vercel

## ## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jay-Beo/my-to-do-app.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd my-to-do-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the application:**
    ```bash
    npx expo start
    ```
    This will open the Expo development server, allowing you to run the app on an iOS simulator, Android emulator, or on your physical device using the Expo Go app.
