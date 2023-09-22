//Main
import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllPlacesScreen from "./screens/AllPlacesScreen";
import AddplaceScreen from "./screens/AddPlaceScreen";
import MapScreen from "./screens/MapScreen";

import ProfilePage from "./components/profilePage/ProfilePage";

//Tools
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* Får inte mapscreen till att fungera här...  */}
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("appToken");
      if (token) {
        authCtx.authenticate(token);
      }
    };
    fetchToken();
  }, [authCtx]);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? (
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: "white",
            contentStyle: { backgroundColor: Colors.primary100 },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
          <Drawer.Screen name="ProfilePage" component={ProfilePage} />
          <Drawer.Screen
            name="AllPlacesScreen"
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Drawer.Screen name="AddPlace" component={AddplaceScreen} />
          <Drawer.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ title: "Choose location" }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
