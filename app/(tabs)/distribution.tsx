// App/(tabs)/distribution.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, Snackbar, TextInput, Title } from "react-native-paper";
import api from "../../services/api";
import { DistributionCreatePayload } from "../../types";

export default function DistributionScreen() {
  const [merchant, setMerchant] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [unitPrice, setUnitPrice] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<{ show: boolean; msg?: string }>({ show: false });

  const submit = async () => {
    if (!merchant || !product || !quantity || !unitPrice) {
      setSnack({ show: true, msg: "Please fill merchant, product, quantity and price" });
      return;
    }
    const payload: DistributionCreatePayload = {
      merchant,
      product,
      quantity,
      unitSalePrice: unitPrice,
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      date: date ? date.toISOString() : undefined,
    };

    try {
      setSaving(true);
      await api.post("/distributions", payload);
      setSnack({ show: true, msg: "Saved and stock updated" });
      // reset form
      setMerchant("");
      setProduct("");
      setQuantity(null);
      setUnitPrice(null);
      setDate(new Date());
    } catch (err: any) {
      console.warn(err);
      setSnack({ show: true, msg: err?.response?.data?.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.cardContainer}>
        <Title style={styles.title}>Log In New Distribution</Title>
        <TextInput label="Merchant" value={merchant} onChangeText={setMerchant} style={styles.input} />
        <TextInput label="Product" value={product} onChangeText={setProduct} style={styles.input} />
        <View style={styles.row}>
          <TextInput
            label="Quantity"
            keyboardType="numeric"
            value={quantity?.toString() || ""}
            onChangeText={(v) => setQuantity(v ? Number(v) : null)}
            style={styles.input}
          />
          <TextInput
            label="Unit Sale Price"
            keyboardType="numeric"
            value={unitPrice?.toString() || ""}
            onChangeText={(v) => setUnitPrice(v ? Number(v) : null)}
            style={styles.input}
          />
        </View>
        <View>
          <Title style={styles.mediumTitle}>Pick Date</Title>
          <Button onPress={() => setShowPicker(true)} style={{ marginBottom: 12, backgroundColor: "rgb(222 225 227)" }}>
            {date ? new Date(date).toLocaleString() : "Pick date"}
          </Button>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selected) => {
              setShowPicker(Platform.OS === "ios"); // keep on ios
              if (selected) setDate(selected);
              else setShowPicker(false);
            }}
          />
        )}
        <View style={styles.row}>
          <Paragraph>{false ? "Saving locally..." : ""}</Paragraph>
          <Button buttonColor="rgb(18 73 127)" mode="contained" onPress={submit} loading={saving}>
            Save Distribution
          </Button>
        </View>
      </View>
      <Snackbar visible={snack.show} onDismiss={() => setSnack({ show: false })} duration={2500}>
        {snack.msg}
      </Snackbar>
      <View>
        <Title style={styles.title}>Recent Distributions</Title>
        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <View style={styles.shop}>
              <Title style={styles.mediumTitle}>Al Rayyan</Title>
              <Paragraph>22 Sep, 2025</Paragraph>
            </View>
            <View style={styles.info}>
              <Title style={styles.mediumTitle}>SDG 140.00</Title>
              <View style={[styles.badge, styles.badgeSynced]}>
                <Paragraph style={{color: "green", fontWeight: 400}}>synced</Paragraph>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <View style={styles.shop}>
              <Title style={styles.mediumTitle}>ُAl Aqsa</Title>
              <Paragraph>21 Sep, 2025</Paragraph>
            </View>
            <View style={styles.info}>
              <Title style={styles.mediumTitle}>SDG 79.00</Title>
              <View style={[styles.badge, styles.badgeUnSynced]}>
                <Paragraph style={{color: "#2f2010", fontWeight: 400}}>unsynced</Paragraph>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { padding: 10, backgroundColor: "#f1f6f9" },
  cardContainer: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginBottom: 10, backgroundColor: "white", flex: 1, margin: 6 },
  row: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  mediumTitle: { fontSize: 20, fontWeight: 600 },
  smallTitle: { fontSize: 16, fontWeight: 200 },
  progressBar: { height: 15, borderRadius: 30 },
  resetFlex: { flex: -1},
  input: { width: 150, paddingVertical: 0, marginBottom: 12, backgroundColor: "rgb(225 218 218)", borderWidth: 1, borderStyle: "solid", borderColor: " rgb(171 161 161)", borderRadius: 10 },
  badge: {width: 70, maxWidth: 90, height: 25, padding: 5, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center"},
  badgeSynced: {backgroundColor: "rgb(154 205 154)"},
  badgeUnSynced: {backgroundColor: "#db9d54"},
  shop: {},
  info: {},
})

// const styles = StyleSheet.create({
//   container: { padding: 16 },
//   input: { marginBottom: 12 },
// });
