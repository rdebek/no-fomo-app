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
} from "react-native";
import { width, height } from "../components/Utility";
import { slideIn } from "../components/Animations";
import Slider from "@react-native-community/slider";
import { Colors } from "../styles/Colors";

function MapScreen({ navigation }) {
  const [cords, setCords] = React.useState(null);
  const [confirm, setConfirm] = React.useState(false);
  const [twitterChosen, setTwitterChosen] = React.useState(true);
  const [radius, setRadius] = React.useState(0);

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
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => {
          setCords(e.nativeEvent.coordinate);
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

      {cords && (
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
            <View style={{ flex: 1, borderTopWidth: 2 }}>
              <Text>Twitter</Text>
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
            >
              <Text>Radius: {radius}</Text>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={30}
                step={1}
                minimumTrackTintColor="black"
                maximumTrackTintColor="red"
                onValueChange={setRadius}
              ></Slider>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}

export default MapScreen;
