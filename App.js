import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FoodScreen from './src/screens/FoodScreen';
import { Text } from 'react-native-magnus';

const navigator = createStackNavigator(
  {
    Food: FoodScreen,
  },
  {
    initialRouteName: 'Food',
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
      title: 'Business search',
    },
  }
);

export default createAppContainer(navigator);
