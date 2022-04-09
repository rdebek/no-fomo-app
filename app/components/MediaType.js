import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";

const styles = StyleSheet.create({
  rowView: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    borderColor: Colors.twitterColor,
    height: 25,
    width: 25,
    borderWidth: 3,
    borderRadius: 100,
  },
  textView: {
    height: 20,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 18,
  },
});

export const MediaType = (index, text, chosenType, setChosenType) => (
  <View style={styles.rowView}>
    <Pressable
      style={[
        styles.checkbox,
        { backgroundColor: chosenType == index ? Colors.primary : "white" },
      ]}
      onPress={() => setChosenType(index)}
    />
    <View style={styles.textView}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  </View>
);
