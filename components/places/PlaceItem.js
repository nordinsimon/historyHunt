import { Image, View, View, Pressable } from "react-native";

const PlaceItem = ({ place, pressHandler }) => {
  return (
    <Pressable onPress={pressHandler}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.adress}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
