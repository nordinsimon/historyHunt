import PlaceForm from "../components/hunts/PlaceForm";

const AddPlaceScreen = ({ navigation }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("AddHunt", { place });
  };
  return <PlaceForm addPlaceHandler={addPlaceHandler} />;
};

export default AddPlaceScreen;
