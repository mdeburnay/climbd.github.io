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
  View,
} from "react-native";

// Hooks
import { useEffect, useState } from "react";

// Constants
import { CURRENT_DATE } from "./constants";

export default function App() {
  const [distance, setDistance] = useState<string>("");
  const [incline, setIncline] = useState<string>("");
  const [elevation, setElevation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [date, setDate] = useState<string>(CURRENT_DATE);
  const [time, setTime] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // Calculate metres climbed when distance or incline changes
  useEffect(() => {
    if (distance && incline) {
      const elevationGain = Number(distance) * Number(incline) * 10; // Convert km and % to meters
      setElevation(elevationGain.toString());
    }
  }, [distance, incline]);

  const calculatedHeight = Dimensions.get("window").height;

  const reset = () => {
    setDistance("");
    setIncline("");
    setElevation("");
    setDuration("");
    setDate("");
    setTime("");
    setTitle("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <TouchableWithoutFeedback
        style={{ backgroundColor: "#000" }}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
        >
          <Text style={styles.title}>Climbed</Text>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Title (e.g. Hill Run)"
                placeholderTextColor="#7e7e7e"
                onChangeText={(val) => setTitle(val)}
                value={title}
              />
              <TextInput
                style={styles.input}
                placeholder="Distance (km)"
                placeholderTextColor="#7e7e7e"
                onChangeText={(val) => setDistance(val)}
                value={distance}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration (hh/mm/ss)"
                placeholderTextColor="#7e7e7e"
                onChangeText={(val) => setDuration(val)}
                value={duration}
              />
              <TextInput
                style={styles.input}
                placeholder="Date (dd/mm/yyyy)"
                placeholderTextColor="#7e7e7e"
                onChangeText={(val) => setDate(val)}
                value={date}
              />
              <TextInput
                style={styles.input}
                placeholder="Time (hh/mm)/AM/PM"
                placeholderTextColor="#7e7e7e"
                onChangeText={(val) => setTime(val)}
                value={time}
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
                value={elevation}
              />
            </View>
            <Button
              title="Upload Your Run"
              onPress={() => console.log("Upload Your Run button pressed")}
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
  inputContainer: {
    paddingBottom: 160,
  },
  input: {
    fontSize: 28,
    color: "#FFF",
    height: 50,
  },
  button: {
    padding: 10,
  },
  title: {
    fontSize: 34,
    color: "#FFF",
    textAlign: "center",
    paddingBottom: 120,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
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
