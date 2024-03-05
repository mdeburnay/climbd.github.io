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
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";

// Hooks
import { useState } from "react";

export default function App() {
  const [distance, setDistance] = useState<string>("");
  const [incline, setIncline] = useState<string>("");
  const [metresClimbed, setMetresClimbed] = useState<number>(0);

  const calculatedHeight = Dimensions.get("window").height;

  const calculateMetresClimbed = (
    distanceKm: number,
    inclinePercentage: number
  ) => {
    const distanceMeters = distanceKm * 1000;
    const metresClimbed = (inclinePercentage / 100) * distanceMeters;
    setMetresClimbed(metresClimbed);
  };

  const reset = () => {
    setDistance("");
    setIncline("");
    setMetresClimbed(0);
  };

  return (
    <TouchableWithoutFeedback
      style={{ backgroundColor: "#000" }}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            {
              paddingTop: calculatedHeight / 2.5,
              height: calculatedHeight,
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Distance (km)"
            placeholderTextColor="#7e7e7e"
            onChangeText={(val) => setDistance(val)}
            value={distance}
          />
          <TextInput
            style={styles.input}
            placeholder="Incline (%)"
            placeholderTextColor="#7e7e7e"
            onChangeText={(val) => setIncline(val)}
            value={incline}
          />
          <Text
            style={[
              styles.metresNumber,
              { paddingTop: calculatedHeight / 4.5 },
            ]}
          >
            {metresClimbed}m
          </Text>
          <Button
            title="Calculate"
            onPress={() => calculateMetresClimbed(+distance, +incline)}
          />
          <Button title="Reset" onPress={() => reset()} />
          <StatusBar style="light" />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 30,
  },
  input: {
    fontSize: 28,
    color: "#FFF",
    height: 50,
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
  },
  metresNumber: {
    fontSize: 40,
    color: "#FFF",
    textAlign: "center",
  },
});

const Button = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text
        style={[
          styles.text,
          { textAlign: "center", textTransform: "uppercase" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
