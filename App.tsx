import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  return (
    <>
      <DismissKeyboard>
        <View style={styles.container}>
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
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
