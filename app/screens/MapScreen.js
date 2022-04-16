import React, { useRef } from "react";
import { styles } from "../styles/MapScreenStyles";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { width, height, handleSearch } from "../components/Utility";
import { slideIn, slideOut } from "../components/Animations";
import Slider from "@react-native-community/slider";
import { Colors } from "../styles/Colors";
import { MediaType } from "../components/MediaType";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import { post } from "../components/Api";

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
  const [placesArray, setPlacesArray] = React.useState([]);
  const [instaMarkersVisible, setInstaMarkersVisible] = React.useState(false);
  const [mapRef, setMapRef] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const slideAnimation = useRef(new Animated.Value(width)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const getMode = () => {
    const hour = new Date().getHours();
    return hour >= 20 || hour <= 7;
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        showsUserLocation={true}
        userInterfaceStyle={getMode() ? "dark" : "light"}
        style={styles.container}
        onPress={(e) => {
          if (instaMarkersVisible) {
            return 0;
          } else if (!confirm) setCords(e.nativeEvent.coordinate);
          else {
            slideOut(slideAnimation, opacityAnimation);
            setTimeout(() => setConfirm(false), 1500);
          }
        }}
      >
        {placesArray &&
          placesArray.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.lat, longitude: place.lng }}
            >
              <Callout style={{ width: 120 }}>
                <View style={styles.containerAlignCenter}>
                  <View style={[styles.container, { marginBottom: 10 }]}>
                    <Text style={styles.markerText}>{place.name}</Text>
                  </View>
                  <View style={[styles.container, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      style={[styles.container, { marginRight: 17 }]}
                      onPress={() => {
                        Linking.openURL(
                          `https://www.instagram.com/explore/locations/${place.external_id}/`
                        );
                      }}
                    >
                      <Image
                        source={require("../assets/instagram_logo.png")}
                        style={styles.markerLogo}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.container}
                      onPress={() => {
                        Linking.openURL(`fb://profile/${place.external_id}`);
                      }}
                    >
                      <Image
                        source={require("../assets/fb_logo.png")}
                        style={styles.markerLogo}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        {cords && (
          <Marker
            coordinate={{
              latitude: cords.latitude,
              longitude: cords.longitude,
            }}
          />
        )}
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
      {instaMarkersVisible && (
        <TouchableOpacity
          onPress={() => {
            setInstaMarkersVisible(false);
            setPlacesArray(false);
            setConfirm(false);
          }}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>CLEAR MAP</Text>
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
                style={styles.twitterLogo}
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
                style={styles.instagramLogo}
                source={require("../assets/instagram_logo.png")}
              />
            </TouchableOpacity>
          </View>
          {twitterChosen && (
            <View style={styles.borderTopView}>
              <View style={styles.containerAlignCenter}>
                <View style={styles.centerView}>
                  <Text style={styles.sliderText}>RADIUS</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={30}
                    step={1}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor={Colors.twitterColor}
                    onValueChange={setRadius}
                  ></Slider>
                  <Text style={styles.sliderText}>{radius}km</Text>
                </View>
                <TouchableOpacity
                  style={styles.twitterSearchButton}
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
                    setChosenType(null);
                  }}
                >
                  <Text style={styles.twitterSearchText}>SEARCH</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.advancedOptionsView}>
                <Text
                  onPress={() => {
                    setAdvanced(!advanced);
                  }}
                  style={{ textDecorationLine: "underline" }}
                >
                  {advanced ? "Hide" : "Show"} advanced options
                </Text>
              </View>
              <View style={styles.container}>
                {advanced && (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containerAlignCenter}>
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
                        style={styles.slider}
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
                        style={styles.slider}
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
                    <View style={styles.containerAlignCenter}>
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
            <View style={styles.borderTopView}>
              <View style={styles.container}>
                <View style={styles.centerView}>
                  <Text style={styles.instagramHeader}>INSTAGRAM SEARCH</Text>
                </View>
                <ActivityIndicator
                  size="large"
                  color={"purple"}
                  style={{ marginBottom: 10 }}
                  animating={loading}
                />
                <View style={styles.containerAlignCenter}>
                  <TouchableOpacity onPress={handleInstagram}>
                    <LinearGradient
                      colors={[
                        "#4162F0",
                        "#544CED",
                        "#8F39CE",
                        "#D53692",
                        "#F5326E",
                        "#F74440",
                        "#EE693E",
                        "#FCBB45",
                        "#EFD88A",
                      ]}
                      style={styles.instagramButton}
                    >
                      <Text style={styles.instagramSearchText}>SEARCH</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );

  async function handleInstagram() {
    setLoading(true);
    let res = await post("https://no-fomo-backend.herokuapp.com/instagram", {
      auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
      lat: cords.latitude,
      long: cords.longitude,
    });
    res = await res.json();
    setPlacesArray(res.venues);
    setConfirm(true);
    slideOut(slideAnimation, opacityAnimation);
    setInstaMarkersVisible(true);
    mapRef.animateToRegion(
      {
        latitude: cords.latitude,
        longitude: cords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      1000
    );
    setCords(false);
    setLoading(false);
  }
}

export default MapScreen;
