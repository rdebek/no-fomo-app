import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors, pastelColors } from "../styles/Colors";
import AnimateNumber from "react-native-animate-number";

import { LineChart } from "react-native-gifted-charts";

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    marginBottom: 5,
  },
  plotView: {
    flex: 1,
    marginTop: 10,
  },
  trendNameView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trendNameText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },
  tweetVolumeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tweetVolumeText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export const TrendTile = (trend, i, data) => (
  <View
    style={[styles.container, { backgroundColor: pastelColors[i % 4] }]}
    key={i}
  >
    <View style={styles.plotView}>
      <LineChart
        data={data}
        width={75}
        height={75}
        adjustToWidth={true}
        hideRules={true}
        yAxisTextStyle={{ fontSize: 9, color: "white" }}
        thickness={2}
        color={"white"}
        xAxisColor={"white"}
        yAxisColor={"white"}
        initialSpacing={0}
        noOfSections={4}
        hideOrigin={true}
      />
    </View>

    <View style={styles.trendNameView}>
      <Text style={styles.trendNameText} onPress={() => console.log(data)}>
        {trend.name}
      </Text>
    </View>
    <View style={styles.tweetVolumeView}>
      <Text style={styles.tweetVolumeText}>
        <AnimateNumber
          value={trend.tweet_volume}
          countBy={Math.floor(trend.tweet_volume / 45)}
        />
      </Text>
    </View>
  </View>
);
