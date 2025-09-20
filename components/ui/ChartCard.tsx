// components/ui/ChartCard.tsx
import React from "react";
import { Card } from "react-native-paper";

export default function ChartCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Title title={title} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}