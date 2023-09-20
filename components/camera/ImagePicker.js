import { View, StyleSheet, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import IconButton from "../ui/IconButton";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const ImagePicker = () => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [isCameraReady, setCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  if (!cameraPermission) {
    return <View />;
  }
  if (!cameraPermission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera.</Text>
        <IconButton icon="yes" onPress={requestCameraPermission} />
      </View>
    );
  }

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      setPhoto(photo);
    }
  };

  let previewContent = <Text>no potato yet</Text>;
  if (photo) {
    previewContent = <Image source={{ uri: photo.uri }} style={styles.photo} />;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        onCameraReady={handleCameraReady}
      >
        <IconButton
          icon="camera"
          size={32}
          color="white"
          onPress={takePicture}
        />
      </Camera>
      <View style={styles.preview}>{previewContent}</View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: width,
    height: height / 2.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  preview: {
    width: width,
    height: height / 3,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});
