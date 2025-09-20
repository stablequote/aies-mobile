// App/(tabs)/analytics.tsx
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";
import api from "../../services/api";
import { AnalyticsResponse } from "../../types";

const { width } = Dimensions.get("window");
const chartWidth = width - 32;

export default function AnalyticsScreen() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/analytics");
      setData(res.data);
    } catch (err) {
      console.warn("fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} />;

  const prod = data?.production;
  const rev = data?.revenue;
  const dist = data?.distribution;

  const productionBar = {
    labels: ["Today", "Flips", "This Week"],
    datasets: [{ data: [prod?.today || 0, prod?.flipsToday || 0, prod?.week || 0] }],
  };

  const revenueBar = {
    labels: ["Net Today", "Net Week"],
    datasets: [{ data: [rev?.netToday || 0, rev?.netWeek || 0] }],
  };

  // Example trend data for unitCost if you want to show simple three-point line
  const unitLine = {
    labels: ["-2d", "-1d", "Today"],
    datasets: [{ data: [rev?.unitCost ? rev.unitCost * 0.95 : 0, rev?.unitCost ? rev.unitCost * 0.98 : 0, rev?.unitCost || 0] }],
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Title>Analytics</Title>

     
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
