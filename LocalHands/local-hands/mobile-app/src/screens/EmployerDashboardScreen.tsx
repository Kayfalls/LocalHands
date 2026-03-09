import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

export function EmployerDashboardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Employer Dashboard</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.kpiLabel}>Active Jobs</Text>
            <Text style={styles.kpiValue}>247</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.kpiLabel}>Match Rate</Text>
            <Text style={styles.kpiValue}>82%</Text>
          </View>
        </View>
        <Pressable style={styles.action} onPress={() => navigation.navigate("Jobs")}>
          <Text style={styles.actionText}>Go to Job List</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff7f8" },
  container: { padding: 16 },
  title: { fontSize: 26, fontWeight: "700", color: colors.text, marginBottom: 16 },
  grid: { flexDirection: "row", gap: 10 },
  card: { flex: 1, borderRadius: 20, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 14 },
  kpiLabel: { color: colors.muted },
  kpiValue: { marginTop: 8, fontSize: 24, fontWeight: "700", color: colors.red },
  action: { marginTop: 18, backgroundColor: colors.red, borderRadius: 16, paddingVertical: 12, alignItems: "center" },
  actionText: { color: "white", fontWeight: "600" },
});
