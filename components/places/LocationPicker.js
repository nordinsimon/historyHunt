import { View, StyleSheet, Image, Text } from "react-native";
import { useState } from "react";
import { getCurrentPositionAsync } from "expo-location";

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/styles";
import { createLocationUrl } from "../../util/http";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();

  const getLocation = async () => {
    const location = await getCurrentPositionAsync();
    console.log("location", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMap = () => {
    navigation.navigate("MapScreen");
  };

  let previewContent = <Text>No picked location... yet!</Text>;

  if (pickedLocation) {
    previewContent = (
      <Image
        source={{ uri: createLocationUrl(pickedLocation) }}
        style={styles.mapPreview}
      />
    );
  }

  return (
    <View>
      <View style={styles.preview}>{previewContent}</View>

      <View style={styles.buttonsContainer}>
        <OutlinedButton icon="location" pressHandler={getLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" pressHandler={pickOnMap}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 25,
  },
  mapPreview: {
    width: "90%",
    height: "90%",
  },
});
