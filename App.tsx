import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to</Text>
      <TextInput placeholder="Distance" />
      <TextInput placeholder="Incline %" />
      <TextInput placeholder="Metres Climbed" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
  },
});
