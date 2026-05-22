# Foodiee App

## Project Overview
Foodiee is a modern, responsive food delivery application built using React Native and Expo. It provides a seamless user experience from onboarding to ordering, featuring dynamic restaurant menus, a global cart system, persistent authentication, and an interactive drawer for profile settings. The app is fully typed with TypeScript and is configured for both native mobile platforms (iOS/Android) and the web.

## Tech Stack
- **Framework:** Expo & React Native
- **Routing:** Expo Router (File-based routing, Typed routes, Unstable Native Tabs)
- **Language:** TypeScript
- **Styling:** React Native Stylesheet (Vanilla CSS on Web, animated components)
- **State Management:** React Context API (`AuthProvider`, `CartProvider`)
- **Storage:** `@react-native-async-storage/async-storage` (with an intelligent in-memory fallback helper)
- **Icons:** `@expo/vector-icons` (Ionicons) & custom icons

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd foodiee
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
- **Start the Expo Dev Server:**
  ```bash
  npm start
  ```
- **Run on Web:**
  ```bash
  npm run web
  ```
- **Run on Android/iOS Emulator:**
  ```bash
  npm run android
  npm run ios
  ```

### Code Quality Checks
- **Type Checking:** `npx tsc --noEmit`
- **Linting:** `npm run lint`

## Navigation Structure
The application utilizes Expo Router with an intelligent authentication gating mechanism:

- **Root Layout (`_layout.tsx`):** Wraps the app in Context Providers. Checks authentication state; routes unauthenticated users to the auth flow, and authenticated users to the main application tabs.
- **Auth Flow:**
  - `(auth)/onboarding`: Welcome and feature introduction screens.
  - `(auth)/login`: User login screen.
  - `(auth)/register`: User registration screen.
- **Main App (Native Tabs):**
  - **Home (`/`):** Dashboard with categories, popular items, and a quick cart access header.
  - **Search (`/search`):** Search functionality with trending cuisines.
  - **Orders (`/orders`):** Order history and active order tracking (features a notification badge).
  - **Profile (`/profile`):** User profile details via an animated slide-in drawer.
- **Deep/Dynamic Routes:**
  - `restaurant/[id]`: Dynamic detail page showcasing individual restaurant menus.
  - `/cart`: Checkout flow calculating totals (including GST and delivery fees in Rupees).

## Deep Linking Setup
The app is configured for deep linking using the `foodiee://` scheme. 
Deep linking is automatically mapped to Expo Router paths. For example, a link to a specific restaurant will look like:
`foodiee://restaurant/1`

Configuration is located in `app.json`:
```json
{
  "expo": {
    "scheme": "foodiee",
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

## Screenshots
*(Add real application screenshots here once deployed or captured from the simulator)*

## Assumptions Made
1. **Authentication Storage:** We assume `AsyncStorage` might not always have its native bindings fully linked in every dev client environment. Therefore, a custom `safeStorage` helper was implemented to silently fall back to an in-memory runtime store (or `localStorage` on the web) to prevent fatal red-screen crashes.
2. **Pricing Currency:** All prices are hardcoded to display in Indian Rupees (`Rs.`).
3. **Tab Icons:** We assume `@expo/vector-icons` (Ionicons) provides the highest fidelity on native tab bars compared to inline SVGs or raw PNGs. Custom SVG markup is avoided for tab triggers in favor of native VectorIcon components.
