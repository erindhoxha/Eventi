import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ResultScreen from "./src/screens/ResultScreen";
import BookmarksScreen from "./src/screens/BookmarksScreen";
import { Icon, Image, Text } from "react-native-magnus";
import { QueryClient, QueryClientProvider } from "react-query";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationStackProp } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import Account from "./src/screens/AccountScreen";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { AuthProvider, useAuthContext } from "./src/context/AuthContext";

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

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 35 }}
      resizeMode="contain"
      source={require("./assets/eventi.png")}
    />
  );
}

const headerOptions = {
  headerStyle: {
    backgroundColor: "#000",
    shadowColor: "transparent", // this covers iOS
    elevation: 0, // this covers Android
  },
  headerTintColor: "#fff",
};

function HomeStack() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { session } = useAuthContext();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () =>
            !session ? (
              <Pressable
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  // if (session) {
                  //   supabase.auth.signOut().then(() => {
                  //     navigation.navigate("Login");
                  //   });
                  // } else {
                  navigation.navigate("Login"); // if the user is not logged in, navigate to the login screen
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

function BookmarksStack({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

function AccountStack({
  route,
  navigation,
}: {
  route: RoutePropWithParams<"Account">;
  navigation: NavigationProp<RootStackParamList>;
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        initialParams={route.params}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                // Note to self: I can use `focused` here if I need to
                let icon = "home";

                if (route.name === "TabBookmarks") {
                  icon = "book";
                }

                if (route.name === "TabAccount") {
                  icon = "user";
                }

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
  );
}
