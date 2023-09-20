import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/AuthContext";

import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";

const WelcomeScreen = () => {
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "https://authentication-app-614a8-default-rtdb.europe-west1.firebasedatabase.app/test.json?auth=" +
          authCtx.token
      )
      .then((resp) => {
        setMessage(resp.data);
      });
  }, []);

  const navigatToAllPlaces = () => {
    navigation.navigate("AllPlacesScreen");
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>Message from server: {message}</Text>
      <Button onPress={navigatToAllPlaces}>Go to places</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.primary100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;
