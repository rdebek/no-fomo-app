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
} from "react-native";
import App1 from "./App2";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="kliknij" onPress={() => navigation.navigate("Map")} />
    </View>
  );
}

function Map({ navigation }) {
  const [count, setCount] = React.useState(0);
  const [props, setProps] = React.useState("properties");
  const [visible, setVisible] = React.useState(true);
  return (
    <View style={styles.container}>
      <MapView
        ref={(map) => {
          this.map = map;
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => console.log("wtf")}
      >
        <Text
          style={{
            position: "absolute",
            bottom: 100,
          }}
        >
          dsdsadsd
        </Text>
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
        <stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "siema" }}
        />
        <stack.Screen name="Map" component={Map} />
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
