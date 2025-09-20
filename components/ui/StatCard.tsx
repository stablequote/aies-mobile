// components/ui/StatCard.tsx
import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";

interface Props {
  label: string;
  value: string | number;
}

export default function StatCard({ label, value }: Props) {
  return (
    <Card style={{ flex: 1, margin: 6 }}>
      <Card.Content>
        <Title>{value}</Title>
        <Paragraph>{label}</Paragraph>
      </Card.Content>
    </Card>
  );
}