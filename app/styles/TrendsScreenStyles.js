import { StyleSheet } from "react-native";
import { width } from "../components/Utility";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
