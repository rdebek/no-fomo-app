import * as React from "react";
import { StatusBar } from "expo-status-bar";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Linking,
  Image,
  Switch,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="kliknij" onPress={() => navigation.navigate("Map")} />
      <Button
        title="kliknij do welcome screena"
        onPress={() => navigation.navigate("WelcomeScreen")}
      />
    </View>
  );
}

function helper() {
  arr = [];
  for (i = 0; i < 5; i++) {
    arr.push(i);
  }
  return arr;
}

function Map({ navigation }) {
  const [count, setCount] = React.useState(0);
  const [props, setProps] = React.useState("properties");
  const [visible, setVisible] = React.useState(true);
  const [marker, setMarker] = React.useState(0);
  const [markers, setMarkers] = React.useState([]);
  // const [displayMode, setDisplayMode] = React.useState(false);
  // const changeMode = () => {
  //   setDisplayMode(!displayMode);
  // };
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
          let cords = e.nativeEvent.coordinate;
          let helper = markers;
          helper.push(cords);
          setMarkers(helper);
          setMarker(cords);
        }}
      >
        {markers.map((coordinates) => (
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
          />
        ))}
        {/* 
        {
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        } */}
        {/* <Switch
          style={{
            position: "absolute",
            top: 200,
            right: 20,
            transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          }}
          thumbColor={displayMode ? "black" : "white"}
          value={displayMode}
          ios_backgroundColor="red"
          onValueChange={changeMode}
        /> */}

        {helper().map((int) => (
          <Text
            key={int}
            style={{
              position: "absolute",
              bottom: int * 100,
            }}
          >
            {int.toString()} element
          </Text>
        ))}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="siema"
          description="piewszy marker"
          pinColor="purple"
        >
          <Callout>
            <Text on onPress={() => Linking.openURL("https://google.com")}>
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
          navigation.navigate("Home");
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
      {visible && (
        <TouchableOpacity
          onPress={() => {
            setCount(count + 1);
            setProps(`${count} props`);
            setVisible(false);
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
              {props}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

let state = true;

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Map" component={Map} />
        <stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
});

const getDataUsingGet = () => {
  //GET request
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "GET",
    //Request Type
  })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      //Success
      alert(responseJson.body);
      console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      //Error
      alert(JSON.stringify(error));
      console.error(error);
    });
};
