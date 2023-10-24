import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./src/styles/global.css";
import { Home } from "./src/screens/Home";
import { AppNavigation } from "./src/navigations/app.navigation";
import { TabNavigation } from "./src/navigations/tab.navigations";

export default function App() {
  return <AppNavigation />;
}
