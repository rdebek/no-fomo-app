import React from "react";
import { styles } from "../styles/MapScreenStyles";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

function MapScreen({ navigation }) {
  const [cords, setCords] = React.useState(0);

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
          console.log(cords);
        }}
      >
        {cords != 0 && (
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
          title="siema"
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
        onPress={() => {
          navigation.navigate("MenuScreen");
        }}
      >
        <View
          style={{
            height: 50,
            backgroundColor: "tomato",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            GO HOME
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MapScreen;
