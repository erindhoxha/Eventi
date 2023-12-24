import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import {
 Box,
 Host,
 Image,
 Text as MagnusText,
 ThemeProvider,
} from 'react-native-magnus';

const RestaurantScreen = ({ navigation }) => {
 const restaurant = navigation.getParam('restaurant');
 return (
  <ThemeProvider>
   <StatusBar barStyle="dark-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <Host>
     <View>
      <Image source={{ uri: restaurant?.image_url }} h={300} />
      <Box pt="lg" px="lg">
       <MagnusText
        color="dark"
        fontWeight="bold"
        fontSize="4xl"
        mt="md"
        mb="md"
       >
        {restaurant?.name}
       </MagnusText>
       <Box
        style={{
         gap: 8,
        }}
       >
        <MagnusText color="gray600" fontSize="xl">
         {restaurant?.location.address1}
        </MagnusText>
        <MagnusText color="gray600" fontSize="xl">
         {restaurant?.display_phone}
        </MagnusText>
       </Box>
      </Box>
     </View>
    </Host>
   </SafeAreaView>
  </ThemeProvider>
 );
};

export default RestaurantScreen;
