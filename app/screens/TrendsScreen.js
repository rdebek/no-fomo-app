import React, { useRef } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Animated,
  TextInput,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/TrendsScreenStyles";
import { getValueFor } from "../components/SecureStore";
import * as Notifications from "expo-notifications";
import { getFollowedTrends } from "../components/Api";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { Colors, pastelColors } from "../styles/Colors";
import { addNewTrend, removeTrend } from "../components/Api";

function TrendsScreen({ navigation }) {
  const [followedTrends, setFollowedTrends] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [newTrendName, setNewTrendName] = React.useState();
  const [percentage, setPercentage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const animation = Array(50)
    .fill("Ref")
    .map(() => useRef(new Animated.Value(1)).current);

  React.useEffect(async () => {
    await refreshTiles();
  }, []);

  async function refreshTiles() {
    const email = await getValueFor("login");
    const res = await getFollowedTrends(email);
    const trends = await res.json();
    setFollowedTrends(trends.data.reverse());
  }

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
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={styles.modalText}>TREND</Text>
            <TextInput
              autoCorrect={false}
              spellCheck={false}
              autoCapitalize="none"
              selectionColor="black"
              style={styles.textInput}
              placeholder={"elon musk, #lgbt etc."}
              placeholderTextColor="gray"
              value={newTrendName}
              onChangeText={setNewTrendName}
            />
            <Text style={styles.modalText}>RISE/FALL IN INTEREST(%)</Text>
            <NumericInput
              onChange={(value) => setPercentage(value)}
              // iconStyle={{ color: "rgba( 255, 255, 255, 0 )" }}
              inputStyle={{ fontSize: 30, fontWeight: "bold" }}
              borderColor={"black"}
              rightButtonBackgroundColor={"#77DD77"}
              leftButtonBackgroundColor={"#ff6961"}
              onLimitReached={(isMax, msg) =>
                Alert.alert("Value must be between -300 and 300")
              }
              minValue={-301}
              maxValue={301}
              step={5}
              totalWidth={200}
              totalHeight={50}
            />
            <View style={{ width: "90%", marginTop: 15 }}>
              <Text>
                Once interest in certain trend rises or falls by specified %,
                you will be notified via push notification.
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                width: "50%",
                height: "15%",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
              onPress={async () => {
                setLoading(true);
                await handleTrendAdd();
                await refreshTiles();
                setLoading(false);
                setShowModal(!showModal);
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                ADD
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size={"large"}
              color="black"
              style={{ marginTop: "5%" }}
              animating={loading}
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
          <Animated.View
            style={[
              styles.tile,
              {
                backgroundColor: "white",
                transform: [{ scale: animation[i] }],
              },
            ]}
            key={i}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                name="read-more"
                size={30}
                style={{ marginHorizontal: 5, marginTop: 5 }}
                color="black"
                onPress={() => {
                  trend.color = pastelColors[i % pastelColors.length];
                  navigation.navigate("TrendDetailsScreen", trend);
                }}
              />
              <Ionicons
                name="ios-logo-twitter"
                size={26}
                style={{ marginHorizontal: 5, marginTop: 5 }}
                color="black"
                onPress={() =>
                  Linking.openURL(
                    `https://twitter.com/search?q=\"${trend.name}\"&src=typed_query&f=live`
                  )
                }
              />
              <Feather
                name="x"
                size={28}
                color="black"
                style={{ marginHorizontal: 5, marginTop: 5 }}
                onPress={async () => {
                  Animated.timing(animation[i], {
                    useNativeDriver: false,
                    toValue: 0,
                    duration: 1000,
                  }).start(async () => {
                    setFollowedTrends(
                      followedTrends.filter((item) => item !== trend)
                    );
                    await handleTrendRemove(trend.name);
                    animation[i].setValue(1);
                  });
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                borderBottomWidth: 2,
                paddingBottom: 2,
              }}
            >
              <Text style={styles.trendName} numberOfLines={1}>
                {trend.name}
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: pastelColors[i % pastelColors.length],
                paddingTop: 10,
              }}
              onPress={() => {
                trend.color = pastelColors[i % pastelColors.length];
                navigation.navigate("TrendDetailsScreen", trend);
              }}
            >
              <Text style={styles.notificationPercentage}>Notification</Text>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.currentPercentage}>
                  {trend.percentage}%
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: pastelColors[i % pastelColors.length],
                flex: 1,
                borderBottomEndRadius: "20%",
                borderBottomStartRadius: "20%",
              }}
              onPress={() => {
                trend.color = pastelColors[i % pastelColors.length];
                navigation.navigate("TrendDetailsScreen", trend);
              }}
            >
              <Text style={styles.notificationPercentage}>Currently</Text>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.currentPercentage}>
                  {parseFloat(getCurrentPercentage(trend).toFixed(2))}%
                </Text>
                {trend.actualPercentage >= 0 && (
                  <Image
                    style={styles.arrow}
                    source={require("../assets/arrowUp.png")}
                  />
                )}
                {trend.actualPercentage < 0 && (
                  <Image
                    style={styles.arrow}
                    source={require("../assets/arrowDown.png")}
                  />
                )}
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  async function handleTrendAdd() {
    const email = await getValueFor("login");
    const token = await getToken();
    await addNewTrend(email, newTrendName, percentage, token);
  }
  async function handleTrendRemove(trend) {
    const email = await getValueFor("login");
    const res = await removeTrend(email, trend);
  }

  function getCurrentPercentage(trend) {
    const counts_array = [];
    trend["7_days_data"]["data"].map((item) => {
      counts_array.push(item.tweet_count);
    });
    const avg = computeAverage(counts_array.slice(0, counts_array.length - 1));
    const percentage = computePercent(
      avg,
      counts_array[counts_array.length - 1]
    );
    trend.actualPercentage = percentage;
    trend.avg = avg;
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
