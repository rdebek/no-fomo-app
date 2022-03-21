import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOptionView: {
    height: 100,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 300,
    margin: 20,
  },
  menuOptionText: {
    fontSize: 30,
    color: "white",
  },
});
