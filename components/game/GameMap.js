import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import ImagePicker from "../camera/ImagePicker";

import Button from "../ui/Button";
import { set } from "react-native-reanimated";

const GameMap = ({ navigation, quitGame, gameLocations }) => {
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);
  const [mode, setMode] = useState("game");
  const [markers, setMarkers] = useState(gameLocations.length);
  const [completedMarkers, setCompletedMarkers] = useState(0);
  const [imageGlobal, setImageGlobal] = useState();

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

  const TakePicture = () => {
    const [image, setImage] = useState();
    const imageHandler = (uri) => {
      setImage(uri);
      console.log("imageHandler", uri);
    };

    const previewPhotoMode = () => {
      setMode("previewPhoto");
      setImageGlobal(image);
      setCompletedMarkers(completedMarkers + 1);
    };

    return (
      <ScrollView style={styles.scrollView}>
        <ImagePicker imageHandler={imageHandler} />
        <Button style={styles.button} onPress={previewPhotoMode}>
          PrewiewPhoto
        </Button>
        <View style={{ height: 30 }}></View>
      </ScrollView>
    );
  };

  const PrewiewPhoto = () => {
    const photoCompleted = () => {
      setMode("game");
      setImageGlobal(null);
    };

    return (
      <View>
        <Image style={styles.image} source={{ uri: imageGlobal }} />
        <Text>
          {completedMarkers}/{markers}completed
        </Text>
        <Button style={styles.button} onPress={photoCompleted}>
          Save Photo
        </Button>
      </View>
    );
  };

  const Markers = () => {
    return gameLocations.map((location, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: location.location.lat,
            longitude: location.location.lng,
          }}
          title={location.title}
          onPress={() => setMode("photo")}
        />
      );
    });
  };

  const Game = () => {
    return (
      <View>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={initialRegion}
        >
          <Markers />
          <Button style={styles.button} onPress={completeHandler}>
            Complete
          </Button>
        </MapView>
      </View>
    );
  };

  switch (mode) {
    case "game":
      return <Game />;
    case "photo":
      return <TakePicture />;
    case "previewPhoto":
      return <PrewiewPhoto />;
  }
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
  image: {
    height: 130,
    width: 130,
  },
});
