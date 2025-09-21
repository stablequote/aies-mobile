// App/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Paragraph, ProgressBar, Title } from "react-native-paper";
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

  // const data:any = {{
  //   labels: ["Jan", "Feb"],
  //   datasets: [
  //     {
  //       data: [
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //       ]
  //     }
  //   ]
  // }}

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Title style={styles.title}>Dashboard</Title>
      <Paragraph style={styles.mediumTitle}>Overview of today & week</Paragraph>

      <View style={styles.row}>
        <StatCard style={styles.cardContainer} label="Net Today" value={`$${(analytics?.revenue.netToday || 0).toFixed(2)}`} />
        <StatCard style={styles.cardContainer} label="Net This Week" value={`$${(analytics?.revenue.netWeek || 0).toFixed(2)}`} />
      </View>

      <View style={styles.row}>
        <StatCard style={styles.cardContainer} label="Pending Dist." value={`${analytics?.distribution.pendingCount || 0}`} />
      </View>

      <View style={[styles.row]}>
        <StatCard style={styles.cardContainer} label="Production Today" value={`${analytics?.production.today || 0}`} />
        <StatCard style={styles.cardContainer} label="Production Week" value={`${analytics?.production.week || 0}`} />
      </View>
      <Title style={styles.title}>Expenses</Title>
      <View style={[styles.cardContainer]}>
        <Title style={styles.mediumTitle}>Daily Expenses</Title>
        <Title style={styles.title}>{`SDG 65,5`}</Title>
        <Title style={styles.smallTitle}>Today</Title>
        <View>
          {/* chart goes here */}
          {/* <LineChart 
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ]
                }
              ]
            }}
            width={300}
            height={400}
            // chartConfig={}
          /> */}
        </View>
      </View>

      <Title style={styles.title}>Production</Title>
      <View style={styles.cardContainer}>
        <Title style={styles.mediumTitle}>Production outputs</Title>
        <Title style={styles.title}>{`1200 units`}</Title>
        <Title style={styles.smallTitle}>Today</Title>
        <View>
          {/* chart goes here */}
        </View>
      </View>

      <Title style={styles.title}>Distribution</Title>
      <View style={[styles.cardContainer, styles.resetFlex]}>
        <Title style={styles.mediumTitle}>Distribution Summary</Title>
        <Title style={styles.title}>{`14 deliveries`}</Title>
        <Title style={styles.smallTitle}>Today</Title>
        {/* progress bar goes here */}
        <View style={{marginVertical: 5}}>
          <Paragraph>Delivered</Paragraph>
          <ProgressBar color="green" progress={0.7} style={styles.progressBar} />
        </View>
        <View style={{marginVertical: 5}}>
          <Paragraph>In-Transit</Paragraph>
          <ProgressBar color="#227fcd" progress={0.4} style={styles.progressBar} />
        </View>
        <View style={{marginVertical: 5}}>
          <Paragraph>Pending</Paragraph>
          <ProgressBar color="orange" progress={0.8} style={styles.progressBar} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { padding: 20, backgroundColor: "#f1f6f9" },
  cardContainer: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginBottom: 10, backgroundColor: "white", flex: 1, margin: 6 },
  row: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 24, fontWeight: 700 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  mediumTitle: { fontSize: 20, fontWeight: 400 },
  smallTitle: { fontSize: 16, fontWeight: 200 },
  progressBar: { height: 15, borderRadius: 30 },
  resetFlex: { flex: -1}, 
})

// const styles = StyleSheet.create({
//   container: { padding: 16, backgroundColor: "#f6f7f8" },
//   row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8, backgroundColor: "white", borderRadius: 7, padding: 10 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   cardContainer: { padding: 10, backgroundColor: "#ffffff" }
// });