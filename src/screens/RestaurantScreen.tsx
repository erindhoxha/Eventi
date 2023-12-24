import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Text as MagnusText, ThemeProvider } from 'react-native-magnus';

const RestaurantScreen = ({ route }) => {
 const { restaurant } = route?.params || {};
 return (
  <ThemeProvider>
   <StatusBar barStyle="dark-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <MagnusText>Restaurant Screen</MagnusText>
   </SafeAreaView>
  </ThemeProvider>
 );
};

export default RestaurantScreen;
