import React, { useState } from "react";
import { View } from "react-native";

import StartHunter from "../components/game/StartHunter.js";
import GameMap from "../components/game/GameMap.js";

const GameScreen = ({ route, navigation }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { huntData } = route.params;

  const { lat, lng } = huntData.places[0].location;

  const onStartGame = () => {
    console.log("started game");
    setGameStarted(true);
  };
  const quitGame = () => {
    setGameStarted(false);
    navigation.navigate("Profile");
  };

  return (
    <View>
      {gameStarted ? (
        <GameMap quitGame={quitGame} gameLocations={huntData.places} />
      ) : (
        <StartHunter onStartGame={onStartGame} firstLocation={{ lat, lng }} />
      )}
    </View>
  );
};

export default GameScreen;
