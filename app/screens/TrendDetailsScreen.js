import React from "react";
import { View, Text } from "react-native";

import { BarChart } from "react-native-gifted-charts";
import { styles } from "../styles/TrendDetailsScreenStyles";

function TrendDetailsScreen({ route, navigation }) {
  const trend = route.params;
  const data = [{ value: 50 }, { value: 80 }, { value: 50 }];
  return (
    <View style={styles.container}>
      <BarChart data={data} width={200} height={300} />
      <Text onPress={() => console.log(trend)}> help</Text>
    </View>
  );
}

export default TrendDetailsScreen;
