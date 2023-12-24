import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodScreen from './src/screens/FoodScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import { Icon, Text } from 'react-native-magnus';

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
   title: 'Business search',
  },
 }
);

const TabNavigator = createBottomTabNavigator(
 {
  Home: FoodStack,
  Bookmarks: FoodScreen,
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
       focused={focused}
       name={icon}
       backgroundColor="#000"
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
