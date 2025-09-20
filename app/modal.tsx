// App/modal.tsx
// import { CloseButton } from "expo-router"; // optional
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Title>Modal</Title>
      <Button onPress={() => {}}>Close</Button>
      {/* <CloseButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
});
