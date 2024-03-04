// Packages
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from "react-native";

// Hooks
import { useState } from "react";

export default function App() {
  const [distance, setDistance] = useState("");
  const [incline, setIncline] = useState("");
  const [metresClimbed, setMetresClimbed] = useState("");

  return (
    <>
      <DismissKeyboard>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Distance"
            placeholderTextColor="#FFF"
          />

          <TextInput
            style={styles.input}
            placeholder="Incline %"
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            placeholder="Metres Climbed"
            placeholderTextColor="#FFF"
          />
        </View>
      </DismissKeyboard>
      <Button title="Calculate" onPress={() => console.log("Calculate")} />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    color: "#FFF",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
  },
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Button = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.text, { textAlign: "center" }]}>{title}</Text>
    </Pressable>
  );
};
