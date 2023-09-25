import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FoodScreen from './src/screens/FoodScreen';

const navigator = createStackNavigator(
 {
  Food: FoodScreen,
 },
 {
  initialRouteName: 'Food',
  defaultNavigationOptions: {
   title: 'Business search',
  },
 }
);

export default createAppContainer(navigator);
