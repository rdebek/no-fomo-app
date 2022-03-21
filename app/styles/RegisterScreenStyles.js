import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  appName: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  logo: {
    width: 100,
    height: 30,
  },
  container: {
    flex: 1,
  },
  containerJustify: { justifyContent: "center", flex: 0.7 },
  formInput: {
    paddingHorizontal: 5,
    margin: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    height: 50,
    fontSize: 20,
    color: "#101820FF",
    borderRadius: 10,
  },
  textDescriptors: {
    paddingHorizontal: 6,
    paddingTop: 5,
  },
  register: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 200,
    height: 50,
    marginTop: 10,
  },
  registerText: {
    fontSize: 25,
    color: "white",
  },
});
