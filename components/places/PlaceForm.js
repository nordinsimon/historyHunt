import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/styles";
import ImagePicker from "../camera/ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import Place from "../../models/Place";
import { useCallback, useState } from "react";

const PlaceForm = ({ addPlaceHandler }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const titleHandler = (text) => {
    setTitle(text);
  };

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((locationInfo) => {
    setLocation(locationInfo);
  }, []);

  const savePoint = () => {
    const place = new Place(title, image, location);
    console.log("savedPOINT", place);
    addPlaceHandler(place);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.input} onChange={titleHandler} value={title} />
      </View>
      <ImagePicker ImageHandler={imageHandler} />
      <LocationPicker locationHandler={locationHandler} />
      <Button style={styles.button} onPress={savePoint}>
        Save point
      </Button>
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    color: Colors.primary800,
    borderBottomWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: Colors.primary100,
    opacity: 0.8,
  },
  button: {
    marginBottom: 24,
  },
});
