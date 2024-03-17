// Packages
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

// Components
import { Input } from "./components/Input";

// Hooks
import { useEffect, useState } from "react";

// Constants
import { CURRENT_DATE, CURRENT_TIME } from "./constants";

export default function App() {
  const [distance, setDistance] = useState<string>("");
  const [incline, setIncline] = useState<string>("");
  const [elevation, setElevation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [date, setDate] = useState<string>(CURRENT_DATE);
  const [time, setTime] = useState<string>(CURRENT_TIME);
  const [title, setTitle] = useState<string>("");

  // Calculate metres climbed when distance or incline changes
  useEffect(() => {
    if (distance && incline) {
      const elevationGain = Number(distance) * Number(incline) * 10; // Convert km and % to meters
      setElevation(elevationGain.toString());
    }
  }, [distance, incline]);

  const reset = () => {
    setDistance("");
    setIncline("");
    setElevation("");
    setDuration("");
    setDate(CURRENT_DATE);
    setTime(CURRENT_TIME);
    setTitle("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
        >
          <Text style={styles.title}>Climbd</Text>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Title (e.g. My Morning Run)"
                value={title}
                onChange={setTitle}
              />
              <Input
                placeholder="Distance (km)"
                value={distance}
                onChange={setDistance}
              />
              <Input
                placeholder="Duration (hh:mm:ss)"
                value={duration}
                onChange={setDuration}
              />
              <Input
                placeholder="Date (dd/mm/yyyy)"
                value={date}
                onChange={setDate}
              />
              <Input
                placeholder="Time (hh:mm)"
                value={time}
                onChange={setTime}
              />
              <Input
                placeholder="Incline (%)"
                value={incline}
                onChange={setIncline}
              />
              <Input
                placeholder="Elevation (m)"
                value={elevation}
                onChange={setElevation}
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
    paddingHorizontal: 30,
  },
  inputContainer: {
    paddingBottom: 140,
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
