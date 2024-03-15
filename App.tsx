// Packages
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
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
  const [elevation, setElevation] = useState<string>("");

  const calculatedHeight = Dimensions.get("window").height;

  const calculateElevation = (
    distanceKm: number,
    inclinePercentage: number
  ) => {
    const distanceMeters = distanceKm * 1000;
    const elevation = (inclinePercentage / 100) * distanceMeters;
    setElevation(elevation.toString());
  };

  const reset = () => {
    setDistance("");
    setIncline("");
    setElevation("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
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
            <TextInput
              style={styles.input}
              placeholder="Elevation (m)"
              placeholderTextColor="#7e7e7e"
              onChangeText={(val) => setElevation(val)}
              value={incline}
            />
            <Text
              style={[
                styles.metresNumber,
                { paddingTop: calculatedHeight / 4.5 },
              ]}
            >
              {elevation}m
            </Text>
            <Button
              title="Calculate"
              onPress={() => calculateElevation(+distance, +incline)}
            />
            <Button title="Reset" onPress={() => reset()} />
            <StatusBar style="light" />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
