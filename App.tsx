import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
 createStackNavigator,
 NavigationStackProp,
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodScreen from './src/screens/FoodScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import { Icon, Image, Text } from 'react-native-magnus';
import BookmarksScreen from './src/screens/BookmarksScreen';
import { RestaurantCardProps } from './src/components/RestaurantCard/types';

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

const BookmarksStack = createStackNavigator(
 {
  Bookmarks: {
   screen: BookmarksScreen,
   navigationOptions: {
    title: 'Bookmarks',
   },
  },
 },
 {
  defaultNavigationOptions: {
   headerTintColor: '#fff',
   headerStyle: {
    backgroundColor: '#000',
    shadowColor: 'transparent', // this covers iOS
    elevation: 0, // this covers Android
   },
   title: 'Eventi',
  },
 }
);

function LogoTitle() {
 return (
  <Image
   style={{ width: 200, height: 35 }}
   resizeMode="contain"
   source={require('./assets/eventi.png')}
  />
 );
}

const RootStack = createStackNavigator(
 {
  Food: {
   screen: FoodScreen,
   navigationOptions: {
    headerTitle: () => <LogoTitle />,
   },
  },
  Restaurant: {
   screen: RestaurantScreen,
   navigationOptions: ({ navigation }) => ({
    title: navigation.getParam('restaurantName', 'Restaurant Details'),
   }),
  },
  Bookmarks: {
   screen: BookmarksScreen,
   navigationOptions: {
    title: 'Bookmarks',
   },
  },
 },
 {
  defaultNavigationOptions: {
   headerTintColor: '#fff',
   headerStyle: {
    backgroundColor: '#000',
    shadowColor: 'transparent', // this covers iOS
    elevation: 0, // this covers Android
   },
   title: 'Eventi',
  },
 }
);

const TabNavigator = createBottomTabNavigator(
 {
  Home: RootStack,
  Bookmarks: BookmarksStack,
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
