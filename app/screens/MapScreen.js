import React from "react";
import { styles } from "../styles/MapScreenStyles";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { width, height } from "../components/Utility";

function MapScreen({ navigation }) {
  const [cords, setCords] = React.useState(null);

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
          }}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>CONFIRM</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default MapScreen;
