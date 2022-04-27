import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  footerItem: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  footerMainSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartView: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    paddingTop: 20,
  },
  statsView: {
    flex: 1,
  },
});
