import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Local Hands 2.0 - Mobile App</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
