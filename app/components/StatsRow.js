import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AnimateNumber from "react-native-animate-number";

const styles = StyleSheet.create({
  statsRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsRowText: {
    margin: "3%",
    fontSize: 20,
  },
  statsRowNumber: {
    margin: "3%",
    fontSize: 30,
  },
});

export const StatsRow = (
  description,
  stat,
  color,
  countBy = Math.floor(stat / 45),
  percentFlag = false
) => (
  <View style={styles.statsRowView}>
    <Text style={styles.statsRowText}>{description}</Text>
    <Text style={[styles.statsRowNumber, { color: color }]}>
      <AnimateNumber value={stat} countBy={countBy} />
      {percentFlag ? "%" : ""}
    </Text>
  </View>
);
