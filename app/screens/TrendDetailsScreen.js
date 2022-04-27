import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Easing,
  Linking,
  Pressable,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { styles } from "../styles/TrendDetailsScreenStyles";
import { Ionicons } from "@expo/vector-icons";
import { width, height } from "../components/Utility";
import { StatsRow } from "../components/StatsRow";
import { Colors } from "../styles/Colors";

function TrendDetailsScreen({ route, navigation }) {
  const trend = route.params;
  const kFlag = dataFormat();

  function dataFormat() {
    for (let i = 0; i < trend["7_days_data"]["data"].length; i++) {
      if (trend["7_days_data"]["data"][i].tweet_count < 1000) {
        return false;
      }
    }
    return true;
  }

  const data = trend["7_days_data"]["data"].map((item) => ({
    value: kFlag ? item.tweet_count / 1000 : item.tweet_count,
    label: item.start.slice(8, 10) + "/" + item.start.slice(5, 7),
    labelTextStyle: {
      fontSize: 10,
      marginLeft: 6,
      marginBottom: 5,
    },
    labelWidth: 40,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footer}>
        <Pressable
          style={styles.footerItem}
          onPress={() => navigation.navigate("TrendsScreen")}
        >
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </Pressable>
        <View style={styles.footerMainSection}>
          <Text style={styles.footerText}>{trend.name}</Text>
        </View>
        <Pressable
          style={styles.footerItem}
          onPress={() =>
            Linking.openURL(
              `https://twitter.com/search?q=\"${trend.name}\"&src=typed_query&f=live`
            )
          }
        >
          <Ionicons name="ios-logo-twitter" size={40} color="black" />
        </Pressable>
      </View>
      <View style={styles.chartView}>
        <BarChart
          data={data}
          width={0.85 * width}
          height={0.3 * height}
          initialSpacing={10}
          spacing={1}
          //   yAxisTextStyle={{ fontSize: 10 }}
          //   hideYAxisText={true}
          barWidth={34}
          yAxisLabelWidth={45}
          isAnimated={true}
          yAxisLabelSuffix={kFlag ? "k" : ""}
          animationDuration={800}
          //   cappedBars={true}
          // maxValue={Math.max(data.map((dataPoint) => dataPoint.value))}
          //   capColor="red"
          frontColor={trend.color}
          barBorderRadius={5}
          hideRules={true}
          noOfSections={8}
          xAxisThickness={2}
          yAxisThickness={2}
          hideOrigin={true}
          // lineData={{value: }}
        />
      </View>
      <View style={styles.statsView}>
        {StatsRow(
          "Total tweets",
          trend["7_days_data"]["total_count"],
          trend.color
        )}
        {StatsRow("Average daily tweets", parseInt(trend.avg), trend.color)}
        {StatsRow(
          "Today tweets",
          trend["7_days_data"]["data"].at(-1)["tweet_count"],
          trend.color
        )}
        {StatsRow(
          "Percentage change",
          parseFloat(trend.actualPercentage.toFixed(2)),
          trend.color,
          1,
          true
        )}
      </View>
    </SafeAreaView>
  );
}

export default TrendDetailsScreen;
