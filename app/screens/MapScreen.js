import React, { useRef } from "react";
import { styles } from "../styles/MapScreenStyles";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Animated,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { width, height, handleSearch } from "../components/Utility";
import { slideIn, slideOut } from "../components/Animations";
import Slider from "@react-native-community/slider";
import { Colors } from "../styles/Colors";
import { MediaType } from "../components/MediaType";
import * as WebBrowser from "expo-web-browser";

function MapScreen({ navigation }) {
  const [cords, setCords] = React.useState(null);
  const [confirm, setConfirm] = React.useState(false);
  const [twitterChosen, setTwitterChosen] = React.useState(true);
  const [radius, setRadius] = React.useState(0);
  const [minLikes, setMinLikes] = React.useState(0);
  const [minRetweets, setMinRetweets] = React.useState(0);
  const [advanced, setAdvanced] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [chosenType, setChosenType] = React.useState(null);

  const slideAnimation = useRef(new Animated.Value(width)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const getMode = () => {
    const hour = new Date().getHours();
    return hour >= 20 || hour <= 7;
  };
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        userInterfaceStyle={getMode() ? "dark" : "light"}
        style={styles.map}
        onPress={(e) => {
          if (!confirm) setCords(e.nativeEvent.coordinate);
          else {
            slideOut(slideAnimation, opacityAnimation);
            setTimeout(() => setConfirm(false), 1500);
          }
        }}
      >
        {cords && (
          <Marker
            coordinate={{
              latitude: cords.latitude,
              longitude: cords.longitude,
            }}
            title="nice"
            onPress={() =>
              Linking.openURL(
                "https://twitter.com/search?q=%20geocode%3A25.767578743134663%2C-80.16185911319963%2C25km&src=typed_query&f=live"
              )
            }
          />
        )}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="hello"
          description="piewszy marker"
          pinColor="purple"
        >
          <Callout>
            <Text
              on
              onPress={() =>
                Linking.openURL(
                  "https://twitter.com/search?q=%20geocode%3A25.767578743134663%2C-80.16185911319963%2C25km&src=typed_query&f=live"
                )
              }
            >
              go to google
            </Text>
            <Image
              source={{
                uri: "https://picsum.photos/100",
                width: 100,
                height: 100,
              }}
              style={{
                alignSelf: "center",
              }}
            />
          </Callout>
        </Marker>
      </MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MenuScreen")}
      >
        <Image
          style={styles.backButtonImage}
          source={require("../assets/back_button.jpg")}
        />
      </TouchableOpacity>

      {cords && !confirm && (
        <TouchableOpacity
          onPress={() => {
            console.log("klik");
            setConfirm(true);
            slideIn(slideAnimation, opacityAnimation);
          }}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>CONFIRM</Text>
        </TouchableOpacity>
      )}
      {confirm && (
        <Animated.View
          style={[
            styles.popupView,
            {
              left: slideAnimation,
              opacity: opacityAnimation,
            },
          ]}
        >
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              style={[
                styles.twitterContainer,
                { backgroundColor: twitterChosen ? "black" : null },
              ]}
              onPress={() => setTwitterChosen(true)}
            >
              <Image
                style={{ width: 50, height: 41.125 }}
                source={require("../assets/twitter_logo.webp")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.instagramContainer,
                { backgroundColor: twitterChosen ? null : "black" },
              ]}
              onPress={() => setTwitterChosen(false)}
            >
              <Image
                style={{ width: 45, height: 45 }}
                source={require("../assets/instagram_logo.png")}
              />
            </TouchableOpacity>
          </View>
          {twitterChosen && (
            <View
              style={{
                flex: 1,
                borderTopWidth: 2,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    RADIUS
                  </Text>
                  <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={30}
                    step={1}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="red"
                    onValueChange={setRadius}
                  ></Slider>
                  <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {radius}km
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    height: 50,
                    marginTop: -10,
                    backgroundColor: Colors.primary,
                    width: 150,
                    borderRadius: 30,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    WebBrowser.dismissBrowser();
                    WebBrowser.openBrowserAsync(
                      handleSearch(
                        cords,
                        radius,
                        minLikes,
                        minRetweets,
                        query,
                        chosenType
                      )
                    ).catch(function (error) {
                      Alert.alert("Don't use polish characters");
                    });
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    SEARCH
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  height: 25,
                }}
              >
                <Text
                  onPress={() => {
                    setAdvanced(!advanced);
                  }}
                  style={{ textDecorationLine: "underline" }}
                >
                  {advanced ? "Hide" : "Show"} advanced options
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {advanced && (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={styles.advancedOptionsText}>QUERY</Text>
                      <TextInput
                        textAlign="center"
                        autoCapitalize="none"
                        selectionColor="black"
                        style={styles.textInput}
                        onChangeText={setQuery}
                      />

                      <Text style={styles.advancedOptionsText}>MIN LIKES</Text>
                      <Slider
                        style={{ width: 200, height: 30 }}
                        minimumValue={0}
                        maximumValue={1000}
                        step={1}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="#1DA1F2"
                        onValueChange={setMinLikes}
                      ></Slider>
                      <Text
                        style={[
                          styles.advancedOptionsText,
                          { marginBottom: 10 },
                        ]}
                      >
                        {minLikes}
                      </Text>
                      <Text style={styles.advancedOptionsText}>
                        MIN RETWEETS
                      </Text>
                      <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1000}
                        step={1}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="#1DA1F2"
                        onValueChange={setMinRetweets}
                      ></Slider>
                      <Text
                        style={[
                          styles.advancedOptionsText,
                          { marginBottom: 10 },
                        ]}
                      >
                        {minRetweets}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={styles.advancedOptionsText}>MEDIA TYPE</Text>
                    </View>
                    {MediaType(0, "All tweets", chosenType, setChosenType)}
                    {MediaType(
                      1,
                      "Images and videos",
                      chosenType,
                      setChosenType
                    )}
                    {MediaType(2, "Images", chosenType, setChosenType)}
                    {MediaType(3, "Videos", chosenType, setChosenType)}
                  </ScrollView>
                )}
              </View>
            </View>
          )}

          {!twitterChosen && (
            <View
              style={{
                flex: 1,
                borderTopWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          )}
        </Animated.View>
      )}
    </View>
  );
}

export default MapScreen;
