import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

export default function App1() {
  const dimensions = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ImageBackground
        source={{
          uri: `https://picsum.photos/${dimensions.width}/${dimensions.height}`,
        }}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        <Image
          source={{
            uri: "https://picsum.photos/100",
            width: 100,
            height: 100,
          }}
          style={{
            alignSelf: "center",
            top: "20%",
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            top: "20%",
            paddingTop: "2%",
          }}
        >
          See what you don't need.
        </Text>
      </ImageBackground>
      <View
        style={{
          height: 60,
          backgroundColor: "tomato",
        }}
      ></View>
      <View
        style={{
          height: 60,
          backgroundColor: "dodgerblue",
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
});
