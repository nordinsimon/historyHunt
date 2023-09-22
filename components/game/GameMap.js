import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import Button from "../ui/Button";

const GameMap = ({ navigation, quitGame, gameLocations }) => {
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    if (gameLocations.length > 0) {
      const firstLocation = gameLocations[0].location;
      setInitialRegion({
        latitude: firstLocation.lat,
        longitude: firstLocation.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [gameLocations]);

  const completeHandler = () => {
    setMarkAsCompleted(true);
    setInitialRegion(null);
    quitGame();
  };

  return (
    <View>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={initialRegion}
      >
        {gameLocations.map((location, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: location.location.lat,
                longitude: location.location.lng,
              }}
              title={location.title}
            />
          );
        })}
        <Button style={styles.button} onPress={completeHandler}>
          Complete
        </Button>
      </MapView>
    </View>
  );
};

export default GameMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
