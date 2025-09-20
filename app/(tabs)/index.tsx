// App/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Paragraph, Title } from "react-native-paper";
import StatCard from "../../components/ui/StatCard";
import api from "../../services/api";
import { AnalyticsResponse } from "../../types/index";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/analytics"); // assumes endpoint /api/analytics
      setAnalytics(data);
    } catch (err) {
      console.warn("fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Dashboard</Title>
      <Paragraph>Overview of today & week</Paragraph>

      <View style={styles.row}>
        <StatCard label="Net Today" value={`$${(analytics?.revenue.netToday || 0).toFixed(2)}`} />
        <StatCard label="Net This Week" value={`$${(analytics?.revenue.netWeek || 0).toFixed(2)}`} />
      </View>

      <View style={styles.row}>
        <StatCard label="Pending Dist." value={`${analytics?.distribution.pendingCount || 0}`} />
        <StatCard label="Pending Amount" value={`$${(analytics?.distribution.pendingAmount || 0).toFixed(2)}`} />
      </View>

      <View style={styles.row}>
        <StatCard label="Production Today" value={`${analytics?.production.today || 0}`} />
        <StatCard label="Production Week" value={`${analytics?.production.week || 0}`} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});