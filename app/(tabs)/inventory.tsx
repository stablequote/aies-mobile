// App/(tabs)/inventory.tsx
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Paragraph, Title } from "react-native-paper";
import api from "../../services/api";
import { InventoryItem } from "../../types";

export default function InventoryScreen() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/inventory");
      setItems(res.data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} />;

  return (
    <View style={styles.container}>
      <Title>Inventory</Title>
      <FlatList
        data={items}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Content>
              <Paragraph style={{ fontWeight: "700" }}>{item.productName || item.product}</Paragraph>
              <Paragraph>Stock: {item.stock}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
