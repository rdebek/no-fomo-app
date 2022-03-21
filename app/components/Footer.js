import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appName: {
    color: "#332C29",
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
});

export const footer = (
  <View style={styles.logoView}>
    <Text style={styles.appName}>NO FOMO</Text>
    <Image style={styles.logo} source={require("../assets/app_logo.jpg")} />
  </View>
);
