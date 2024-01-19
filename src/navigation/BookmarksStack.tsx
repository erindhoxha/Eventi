import React from "react";
import { RootStackParamList } from "../../App";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions } from "../constants/constants";
import BookmarksScreen from "../screens/BookmarksScreen";

const Stack = createStackNavigator<RootStackParamList>();

const BookmarksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export default BookmarksStack;
