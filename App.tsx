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
  NativeEventEmitter,
  NativeModules,
} from "react-native";

// Components
import { Input } from "./components/Input";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Hooks
import { useEffect, useState } from "react";

// Constants
import { CURRENT_DATE, CURRENT_TIME } from "./constants";

// Supabase
import { supabase } from "./utils/supabase";

export default function App() {
  // State
  const [distance, setDistance] = useState<string>("");
  const [incline, setIncline] = useState<string>("");
  const [elevation, setElevation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [date, setDate] = useState<string>(CURRENT_DATE);
  const [time, setTime] = useState<string>(CURRENT_TIME);
  const [title, setTitle] = useState<string>("");

  // Environment Variables
  const ACCESS_TOKEN = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
  const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.EXPO_PUBLIC_REFRESH_TOKEN;
  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
  const REDIRECT_URL = process.env.EXPO_PUBLIC_REDIRECT_URL;

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

  const uploadRunToStrava = () => {
    // Fetch access token
    // Fetch athlete details
    // Fetch activity details
    // Upload activity
  };

  useEffect(() => {
    // This function will be called when a redirect URL is opened
    const handleRedirect = (event) => {
      let data = Linking.parse(event.url);
      if (data.queryParams && data.queryParams.code) {
        const code = data.queryParams.code;
        console.log("Authorization code:", code);
        // Implement the exchange of the code for an access token here
      }
    };

    // Subscribe to incoming links
    const subscription = Linking.addEventListener("url", handleRedirect);

    // Return a cleanup function to unsubscribe
    return () => subscription.remove();
  }, []);

  const login = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&approval_prompt=force&scope=read,activity:read_all`
      );

      console.log(result);

      if (result.type === "success") {
        const { code } = Linking.parse(result.url).queryParams;
        console.log(code);
        WebBrowser.dismissBrowser();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
          >
            <View style={styles.titleContainer}>
              <View style={{ flex: 1 }} />
              <Text style={[styles.title, { flex: 1 }]}>Climbd</Text>
              <Text onPress={login} style={[styles.login, { flex: 1 }]}>
                Login
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.container}
              scrollEnabled={false}
            >
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
              <Button title="Upload" onPress={() => console.log("Upload")} />
              <Button title="Reset" onPress={() => reset()} />
              <StatusBar style="light" />
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 120,
  },
  title: {
    fontSize: 34,
    color: "#FFF",
    textAlign: "center",
  },
  login: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
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
