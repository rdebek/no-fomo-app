import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    paddingHorizontal: 5,
    margin: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    width: 250,
    height: 50,
    fontSize: 20,
    color: "#101820FF",
    borderRadius: 10,
  },
  appName: {
    position: "absolute",
    top: 35,
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 40,
  },
  logo: {
    position: "absolute",
    width: 250,
    height: 150,
    top: 50,
  },
  logIn: {
    backgroundColor: Colors.primary,
    width: 160,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 5,
  },
  logInText: {
    fontSize: 25,
    color: "white",
  },
  register: {
    marginTop: 10,
  },
  registerButton: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
});
