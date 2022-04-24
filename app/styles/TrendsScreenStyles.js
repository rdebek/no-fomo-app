import { StyleSheet } from "react-native";
import { width } from "../components/Utility";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tile: {
    width: width / 2.12,
    height: width / 2.12,
    margin: width / 71,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    borderRadius: 20,
  },
  footerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  arrow: {
    width: 15,
    height: 15,
  },
  trendName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  notificationPercentage: {
    fontSize: 15,
  },
  currentPercentage: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    paddingHorizontal: 5,
    marginBottom: 15,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    width: "85%",
    height: 50,
    fontSize: 20,
    color: "#101820FF",
    borderRadius: 10,
  },
  modalText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
