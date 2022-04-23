import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/PlacesScreenStyles";
import { Picker } from "@react-native-picker/picker";
import { getPlaces, getTrends } from "../components/Twitter";
import { TrendTile } from "../components/TrendTile";
import { formatData } from "../components/Twitter";
import { Navbar } from "../components/Navbar";

function PlacesScreen({ navigation }) {
  const [selectedPlace, setSelectedPlace] = React.useState();
  const [availablePlaces, setAvailablePlaces] = React.useState([]);
  const [trends, setTrends] = React.useState();
  const [helper, sethelper] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [allAreasChosen, setAllAreasChosen] = React.useState(true);

  let data_array_of_arrays = [];

  React.useEffect(async () => {
    const places = await getPlaces();
    setAvailablePlaces(places);
  }, []);

  async function helperFunction(currentTrends) {
    data_array_of_arrays = [];
    for (let i = 0; i < currentTrends.length; i++) {
      let data_array = await formatData(currentTrends[i].name, "hour");
      data_array_of_arrays.push(data_array);
    }
    return data_array_of_arrays;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          borderBottomWidth: 2,
        }}
      >
        <Picker
          selectedValue={selectedPlace}
          onValueChange={async (itemValue, itemIndex) => {
            if (itemValue == selectedPlace) {
              return;
            }
            setLoading(true);
            setSelectedPlace(itemValue);
            let currentTrends = await getTrends(itemValue);
            let p = await helperFunction(currentTrends);
            sethelper(p);
            setTrends(currentTrends);
            setLoading(false);
          }}
          numberOfLines={1}
          itemStyle={{
            height: 90,
            width: 330,
            fontSize: 25,
            fontWeight: "bold",
            marginLeft: 20,
            // color: "purple",
          }}
        >
          {availablePlaces.map((place, i) => (
            <Picker.Item label={place.name} value={place.woeid} key={i} />
          ))}
        </Picker>
        <ActivityIndicator
          size="large"
          color={"black"}
          style={{ marginRight: 25 }}
          animating={loading}
        />
      </View>
      <ScrollView>
        {trends &&
          helper &&
          trends.map((trend, i) => TrendTile(trend, i, helper[i]))}
      </ScrollView>
      {/* {Navbar(allAreasChosen, setAllAreasChosen)} */}
    </SafeAreaView>
  );
}

export default PlacesScreen;
