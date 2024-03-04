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
  const [distance, setDistance] = useState<string>("");
  const [incline, setIncline] = useState<string>("");
  const [metresClimbed, setMetresClimbed] = useState<number>(0);

  const CalculateMetresClimbed = (
    distanceKm: number,
    inclinePercentage: number
  ) => {
    const distanceMeters = distanceKm * 1000;
    const metresClimbed = (inclinePercentage / 100) * distanceMeters;
    setMetresClimbed(metresClimbed);
  };

  return (
    <>
      <DismissKeyboard>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Distance (km)"
            placeholderTextColor="#7e7e7e"
            onChangeText={(val) => setDistance(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Incline (%)"
            placeholderTextColor="#7e7e7e"
            onChangeText={(val) => setIncline(val)}
          />
        </View>
      </DismissKeyboard>
      <Text style={{ backgroundColor: "#000", color: "#FFF" }}>
        {metresClimbed}
      </Text>
      <Button
        title="Calculate"
        onPress={() => CalculateMetresClimbed(+distance, +incline)}
      />
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
