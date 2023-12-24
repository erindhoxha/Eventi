import React from 'react';
import {
 NavigationNavigator,
 NavigationProp,
 NavigationState,
 createAppContainer,
} from 'react-navigation';
import {
 createStackNavigator,
 NavigationStackProp,
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodScreen from './src/screens/FoodScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import { Icon, Text } from 'react-native-magnus';
import { RestaurantCardProps } from './src/components/RestaurantCard/RestaurantCard';

export type RootStackParamList = {
 Food: undefined;
 Bookmarks: undefined;
 Restaurant: {
  restaurantName: string;
  restaurant: RestaurantCardProps['item'];
 };
};

export type RootStackProps = {
 [Route in keyof RootStackParamList]: NavigationStackProp<
  'params',
  RootStackParamList[Route]
 >;
};

const RootStack = createStackNavigator(
 {
  Food: FoodScreen,
  Bookmarks: FoodScreen,
  Restaurant: {
   screen: RestaurantScreen,
   navigationOptions: ({ navigation }) => ({
    title: navigation.getParam('restaurantName', 'Restaurant Details'),
   }),
  },
 },
 {
  defaultNavigationOptions: {
   headerTintColor: '#fff',
   headerStyle: {
    backgroundColor: '#000',
   },
   title: 'Foodle',
  },
 }
);

const FoodStack = createStackNavigator(
 {
  Food: FoodScreen,
  Restaurant: {
   screen: RestaurantScreen,
   navigationOptions: ({ navigation }) => ({
    title: navigation.getParam('restaurantName', 'Restaurant Details'),
   }),
  },
 },
 {
  defaultNavigationOptions: {
   headerTintColor: '#fff',
   headerStyle: {
    backgroundColor: '#000',
   },
   title: 'Foodle',
  },
 }
);

const TabNavigator = createBottomTabNavigator(
 {
  Home: FoodStack,
  Bookmarks: RootStack,
 },
 {
  tabBarOptions: {
   safeAreaInset: { bottom: 24 },
   activeTintColor: '#fff',
   labelStyle: {
    display: 'none',
   },
   style: {
    backgroundColor: '#000',
    padding: 24,
   },
  },
  defaultNavigationOptions: ({ navigation }) => ({
   tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state;
    let icon = 'home';
    if (routeName === 'Bookmarks') {
     icon = 'book';
    }
    return (
     <>
      <Icon
       name={icon}
       color={tintColor}
       fontSize={24}
       fontFamily="FontAwesome"
      />
      <Text mt="sm" color={tintColor}>
       {routeName}
      </Text>
     </>
    );
   },
  }),
 }
);

export default createAppContainer(TabNavigator);
