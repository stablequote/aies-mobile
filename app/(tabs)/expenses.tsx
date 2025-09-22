// App/(tabs)/expenses.tsx
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import api from "../../services/api";
import { ExpenseItem } from "../../types";

export default function ExpensesScreen() {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [list, setList] = useState<ExpenseItem[]>([]);

  async function fetchList() {
    try {
      const res = await api.get("/expenses");
      setList(res.data);
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const submit = async () => {
    if (!amount) return;
    await api.post("/expenses/create", {
      amount: Number(amount),
      category,
      description: notes,
      paymentMethod,
    });
    setAmount("");
    setCategory("");
    setNotes("");
    setPaymentMethod("")
    fetchList();
  };

  return (
    <View style={styles.container}>
      <Title>Expenses</Title>
      <TextInput label="Amount" value={amount} keyboardType="numeric" onChangeText={setAmount} style={{ marginBottom: 8 }} />
      <TextInput label="Description" value={notes} onChangeText={setNotes} style={{ marginBottom: 8 }} />
      <TextInput label="Payment Method" value={paymentMethod} onChangeText={setPaymentMethod} style={{ marginBottom: 8 }} />
      <TextInput label="Category" value={category} onChangeText={setCategory} style={{ marginBottom: 8 }} />
      <Button mode="contained" onPress={submit} style={{ marginBottom: 12 }}>
        Save Expense
      </Button>

      <FlatList
        data={list}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Content>
              <Paragraph>{item.category} — ${item.amount}</Paragraph>
              <Paragraph>{new Date(item.createdAt).toLocaleString()}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
});
