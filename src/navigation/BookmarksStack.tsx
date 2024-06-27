import React from "react";
import { RootStackParamList } from "../../App";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions } from "../constants/constants";
import BookmarksScreen from "../screens/BookmarksScreen";
import ResultScreen from "../screens/ResultScreen"; // Import the ResultScreen

const Stack = createStackNavigator<RootStackParamList>();

const BookmarksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Restaurant"
        component={ResultScreen}
        options={(props) => ({
          title: props.route.params?.restaurantName || "Restaurant Details",
          headerBackTitle: "Back",
          ...headerOptions,
        })}
      />
    </Stack.Navigator>
  );
};

export default BookmarksStack;
