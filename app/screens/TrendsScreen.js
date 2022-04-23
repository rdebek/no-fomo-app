import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "../styles/TrendsScreenStyles";
import { getValueFor } from "../components/SecureStore";
import * as Notifications from "expo-notifications";
import { getFollowedTrends } from "../components/Api";
import { height, width } from "../components/Utility";
import { randomHSL } from "../components/Utility";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function TrendsScreen({ navigation }) {
  //   const email = getValueFor("login");
  const email = "123";
  const [followedTrends, setFollowedTrends] = React.useState([]);
  const [selectedTrend, setSelectedTrend] = React.useState();

  React.useEffect(async () => {
    const res = await getFollowedTrends(email);
    const trends = await res.json();
    setFollowedTrends(trends.data);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          borderBottomWidth: 2,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 0.15 }}></View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.footerText}>FOLLOWED TRENDS</Text>
        </View>
        <View style={{ flex: 0.15, alignItems: "flex-end" }}>
          <Ionicons name="add-circle-sharp" size={40} color="black" />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {followedTrends.map((trend, i) => (
          <View style={styles.tile} key={i}>
            <Text>{trend.name}</Text>
            <Text>{trend.percentage}</Text>
            <Text>{getCurrentPercentage(trend["7_days_data"]["data"])} </Text>
            <View style={{ flexDirection: "row" }}></View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  function getCurrentPercentage(data) {
    const counts_array = [];
    data.map((item) => {
      counts_array.push(item.tweet_count);
    });
    const avg = computeAverage(counts_array.slice(0, counts_array.length - 1));
    const percentage = computePercent(
      avg,
      counts_array[counts_array.length - 1]
    );
    return percentage;
  }

  function computeAverage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }

  function computePercent(avg, lastCount) {
    return ((lastCount - avg) / avg) * 100;
  }

  async function getToken() {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    return token;
  }
}
export default TrendsScreen;
