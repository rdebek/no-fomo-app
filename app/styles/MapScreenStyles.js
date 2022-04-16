import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";
import { width, height } from "../components/Utility";

export const styles = StyleSheet.create({
  container: {
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
    borderWidth: 2,
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
    borderWidth: 2,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  popupView: {
    height: 0.8 * height,
    width: 0.8 * width,
    position: "absolute",
    top: 0.1 * height,
    borderWidth: 5,
    borderRadius: 40,
    backgroundColor: "white",
  },
  iconsContainer: {
    height: 50,
    flexDirection: "row",
  },
  twitterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
  },
  instagramContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 25,
  },
  textInput: {
    margin: 5,
    marginBottom: 15,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    width: 200,
    height: 50,
    fontSize: 20,
    color: "#101820FF",
    borderRadius: 10,
  },
  advancedOptionsText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  instagramButton: {
    width: 200,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
  },
  instagramSearchText: {
    fontWeight: "bold",
    fontSize: 25,
    textShadowColor: "white",
    textShadowRadius: 1,
  },
  centerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  twitterSearchButton: {
    height: 50,
    marginTop: -10,
    backgroundColor: Colors.primary,
    width: 150,
    borderRadius: 30,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  twitterSearchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  advancedOptionsView: {
    alignItems: "center",
    height: 25,
  },
  borderTopView: {
    flex: 1,
    borderTopWidth: 2,
  },
  containerAlignCenter: {
    flex: 1,
    alignItems: "center",
  },
  markerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  markerLogo: {
    width: 50,
    height: 50,
  },
  twitterLogo: {
    width: 50,
    height: 41.125,
  },
  instagramLogo: {
    width: 45,
    height: 45,
  },
  sliderText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  slider: {
    width: 200,
    height: 40,
  },
  instagramHeader: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
