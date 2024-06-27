import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { Icon } from "react-native-magnus";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationStackProp } from "react-navigation-stack";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { AuthProvider } from "./src/context/AuthContext";
import HomeStack from "./src/navigation/HomeStack";
import BookmarksStack from "./src/navigation/BookmarksStack";
import AccountStack from "./src/navigation/AccountStack";
import { getIconByRoute } from "./src/utils/getIconByRoute";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Bookmarks: undefined;
  Account: undefined;
  Restaurant: {
    restaurantName: string;
    id: string;
  };
};

export type RootStackProps = {
  [Route in keyof RootStackParamList]: NavigationStackProp<
    "params",
    RootStackParamList[Route]
  >;
};

export type RoutePropWithParams<Route extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, Route>;

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AutocompleteDropdownContextProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                const icon = getIconByRoute(route.name);
                return (
                  <Icon
                    name={icon}
                    fontSize={size}
                    color={color}
                    fontFamily="FontAwesome"
                  />
                );
              },
              tabBarActiveTintColor: "#fff",
              tabBarInactiveTintColor: "#bababa",
              tabBarStyle: {
                backgroundColor: "#000",
              },
            })}
          >
            <Tab.Screen
              name="TabHome"
              options={{
                title: "Home",
              }}
              component={HomeStack}
              initialParams={{ session }}
            />
            <Tab.Screen
              name="TabBookmarks"
              options={{
                title: "Bookmarks",
              }}
              component={BookmarksStack}
            />
            {session && session.user ? (
              <Tab.Screen
                name="TabAccount"
                options={{
                  title: "Account",
                }}
                initialParams={{ session }}
                component={AccountStack}
              />
            ) : null}
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
</AutocompleteDropdownContextProvider>
  );
}
