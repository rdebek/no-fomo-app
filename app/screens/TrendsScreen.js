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
  Image,
  TextInput,
} from "react-native";
import { styles } from "../styles/TrendsScreenStyles";
import { getValueFor } from "../components/SecureStore";
import * as Notifications from "expo-notifications";
import { getFollowedTrends } from "../components/Api";
import { height, width } from "../components/Utility";
import { randomHSL } from "../components/Utility";
import { Ionicons, Feather } from "@expo/vector-icons";

function TrendsScreen({ navigation }) {
  //   const email = getValueFor("login");
  const email = "123";
  const [followedTrends, setFollowedTrends] = React.useState([]);
  const [selectedTrend, setSelectedTrend] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [newTrendName, setNewTrendName] = React.useState();

  const percentages = [];

  React.useEffect(async () => {
    const res = await getFollowedTrends(email);
    const trends = await res.json();
    setFollowedTrends(trends.data);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View
          style={{
            width: "75%",
            height: "75%",
            alignSelf: "center",
            marginTop: "25%",
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: "50%",
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
          }}
        >
          <Text onPress={() => setShowModal(!showModal)}>exit</Text>
          <View style={{ alignItems: "center" }}>
            <TextInput
              autoCorrect={false}
              spellCheck={false}
              autoCapitalize="none"
              selectionColor="black"
              style={styles.textInput}
              placeholder={"example: elon musk, #lgbt"}
              placeholderTextColor="gray"
              value={newTrendName}
              onChangeText={setNewTrendName}
            />
          </View>
        </View>
      </Modal>

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
          <Ionicons
            name="add-circle-sharp"
            size={40}
            color="black"
            onPress={() => setShowModal(!showModal)}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {followedTrends.map((trend, i) => (
          <View style={styles.tile} key={i}>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <Feather
                name="x"
                size={26}
                color="black"
                style={{ marginHorizontal: 5, marginTop: 5 }}
              />
            </View>
            <View
              style={{
                // justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={styles.trendName}>{trend.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <Text style={styles.notificationPercentage}>
                  Notification at:{" "}
                </Text>
                <Text style={styles.currentPercentage}>
                  {trend.percentage}%
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Currently: </Text>
                <Text style={styles.currentPercentage}>
                  {parseFloat(
                    getCurrentPercentage(trend["7_days_data"]["data"]).toFixed(
                      2
                    )
                  )}
                  %
                </Text>
                {percentages[i] >= 0 && (
                  <Image
                    style={styles.arrow}
                    source={require("../assets/arrowUp.png")}
                  />
                )}
                {percentages[i] < 0 && (
                  <Image
                    style={styles.arrow}
                    source={require("../assets/arrowDown.png")}
                  />
                )}
              </View>
            </View>
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
    percentages.push(percentage);
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
    return token;
  }
}
export default TrendsScreen;
