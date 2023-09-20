import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

const MapScreen = () => {
  const initialRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView style={styles.container} initialRegion={initialRegion}></MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
