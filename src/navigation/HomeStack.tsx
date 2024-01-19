import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp, RootStackParamList } from "../../App";
import { useAuthContext } from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Logo from "../components/Logo/Logo";
import { Pressable } from "react-native";
import { Text } from "react-native-magnus";
import { headerOptions } from "../constants/constants";
import ResultScreen from "../screens/ResultScreen";
import LoginScreen from "../screens/LoginScreen";
import BookmarksScreen from "../screens/BookmarksScreen";

const Stack = createStackNavigator<RootStackParamList>();

function HomeStack() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { session } = useAuthContext();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Logo />,
          headerRight: () =>
            !session ? (
              <Pressable
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text fontWeight="500" color="white" fontSize={16} mx="lg">
                  Sign in
                </Text>
              </Pressable>
            ) : null,
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Restaurant"
        component={ResultScreen}
        options={(props) => ({
          title: props.route.params?.restaurantName || "Restaurant Details",
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: "Sign in or register",
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
