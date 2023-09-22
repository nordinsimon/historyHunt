import React, { useState } from "react";
import { View, Text } from "react-native";
import StartHunter from "../components/game/StartHunter.js";

const GameScreen = ({ route, navigation }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { adressData } = route.params;

  const { lat, lng } = adressData.places[0].location;

  const onStartGame = () => {
    setGameStarted(true);
  };

  return (
    <View>
      {gameStarted ? (
        <Text>Game started</Text>
      ) : (
        <StartHunter onStartGame={onStartGame} firstLocation={{ lat, lng }} />
      )}
    </View>
  );
};

export default GameScreen;
