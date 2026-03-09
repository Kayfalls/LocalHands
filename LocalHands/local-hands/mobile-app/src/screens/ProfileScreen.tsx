import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

import { WorkerProfileCard } from "@/components/WorkerProfileCard";

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Worker Profile</Text>
        <WorkerProfileCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff7f8" },
  content: { padding: 16, gap: 14 },
  title: { fontSize: 24, fontWeight: "700", color: "#1a1a1a" },
});
