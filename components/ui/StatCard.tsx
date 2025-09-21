// components/ui/StatCard.tsx
import React from "react";
import { Card, Paragraph, Title } from "react-native-paper";

interface Props {
  label: string;
  value: string | number;
  style: any;
}

export default function StatCard({ label, value, style }: Props) {
  return (
    <Card style={style}>
      <Card.Content>
        <Title>{value}</Title>
        <Paragraph>{label}</Paragraph>
      </Card.Content>
    </Card>
  );
}