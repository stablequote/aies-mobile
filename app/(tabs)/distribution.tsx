// App/(tabs)/distribution.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Snackbar, TextInput, Title } from "react-native-paper";
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
    <View style={styles.container}>
      <Title>New Distribution</Title>
      <TextInput label="Merchant" value={merchant} onChangeText={setMerchant} style={styles.input} />
      <TextInput label="Product" value={product} onChangeText={setProduct} style={styles.input} />
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

      <Button onPress={() => setShowPicker(true)} style={{ marginBottom: 12 }}>
        {date ? new Date(date).toLocaleString() : "Pick date"}
      </Button>

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

      <Button mode="contained" onPress={submit} loading={saving}>
        Save Distribution
      </Button>

      <Snackbar visible={snack.show} onDismiss={() => setSnack({ show: false })} duration={2500}>
        {snack.msg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 12 },
});
