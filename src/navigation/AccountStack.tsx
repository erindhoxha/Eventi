import React from "react";
import { RootStackParamList, RoutePropWithParams } from "../../App";
import { createStackNavigator } from "@react-navigation/stack";
import { headerOptions } from "../constants/constants";
import AccountScreen from "../screens/AccountScreen";
import { NavigationProp } from "@react-navigation/native";

const Stack = createStackNavigator<RootStackParamList>();

const AccountStack = ({
  route,
}: {
  route: RoutePropWithParams<"Account">;
  navigation: NavigationProp<RootStackParamList>;
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        initialParams={route.params}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
