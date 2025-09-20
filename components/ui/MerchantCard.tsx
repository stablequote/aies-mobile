// components/ui/MerchantCard.tsx
import React from "react";
import { Card, Text } from "react-native-paper";

interface Props {
  name: string;
  contact?: string;
  status?: string;
}

export default function MerchantCard({ name, contact, status }: Props) {
  return (
    <Card style={{ marginBottom: 8 }}>
      <Card.Content>
        <Text style={{ fontWeight: "700" }}>{name}</Text>
        {contact ? <Text>{contact}</Text> : null}
        {status ? <Text>Status: {status}</Text> : null}
      </Card.Content>
    </Card>
  );
}
