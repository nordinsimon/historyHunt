import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";

const MapScreen = ({ navigation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const savePickedLocation = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert("No location picked!");
      return;
    }
    navigation.navigate("AddPlace", pickedLocation);
  }, [navigation, pickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation]);

  const initialRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const pressHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setPickedLocation({
      latitude,
      longitude,
    });
  };

  return (
    <MapView
      style={styles.container}
      initialRegion={initialRegion}
      onPress={pressHandler}
    >
      <Marker coordinate={pickedLocation} />
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
