import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerJustify: {
    flex: 1,
    justifyContent: "center",
  },
  infoContainer: {
    flex: 0.9,
    justifyContent: "flex-end",
  },
  textInfo: {
    margin: 10,
    fontSize: 20,
    textAlign: "justify",
  },
  resendContainer: {
    flex: 1,
  },
  codeInput: {
    paddingHorizontal: 5,
    margin: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    height: 70,
    fontSize: 45,
    color: "#101820FF",
    borderRadius: 10,
  },
  textDescriptors: {
    paddingHorizontal: 6,
  },
  verify: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 200,
    height: 50,
    marginTop: 12,
  },
  verifyText: {
    fontSize: 25,
    color: "white",
  },
  resendInfo: {
    fontSize: 17,
    margin: 10,
    textAlign: "justify",
  },
  resend: {
    alignSelf: "center",
    width: 160,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  resendText: { fontSize: 20, color: "white" },
  boldTextCenter: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
