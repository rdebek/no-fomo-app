import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";
import { width, height } from "../components/Utility";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  confirmButton: {
    width: 100,
    height: 45,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 0.02 * height,
    left: 70,
  },
  confirmText: { color: "black", fontWeight: "bold" },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    bottom: 0.02 * height,
  },
  backButtonImage: {
    width: 40,
    height: 40,
  },
});
