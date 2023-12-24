import React from 'react';
import { Linking, SafeAreaView, StatusBar, View } from 'react-native';
import {
 Box,
 Button,
 Host,
 Image,
 Text as MagnusText,
 ThemeProvider,
} from 'react-native-magnus';
import { RootStackProps } from '../../App';

const RestaurantScreen = ({
 navigation,
}: {
 navigation: RootStackProps['Restaurant'];
}) => {
 const { restaurant } = navigation.state.params;
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
         gap: 4,
        }}
       >
        <MagnusText color="gray600" fontSize="md">
         {restaurant?.location.address1}
        </MagnusText>
        {restaurant?.display_phone ? (
         <MagnusText
          onPress={() => {
           Linking.openURL(`tel:${restaurant.display_phone}`);
          }}
          color="blue500"
          fontSize="md"
         >
          {restaurant.display_phone}
         </MagnusText>
        ) : null}
        <MagnusText color="gray600" fontSize="md">
         {restaurant?.price}
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
