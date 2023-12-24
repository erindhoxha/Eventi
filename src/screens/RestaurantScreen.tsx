import React from 'react';
import {
 Linking,
 SafeAreaView,
 ScrollView,
 StatusBar,
 View,
} from 'react-native';
import {
 Box,
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
   <StatusBar barStyle="light-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <Host>
     <ScrollView
      contentContainerStyle={{
       flex: 1,
      }}
      style={{
       backgroundColor: 'black',
      }}
     >
      <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
       <Image source={{ uri: restaurant?.image_url }} h={200} />
       <Box pt="lg" px="lg">
        <MagnusText
         color="gray900"
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
          {restaurant?.is_closed ? 'Closed' : 'Open now'}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Categories: {restaurant?.categories.map((c) => c.title).join(', ')}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Rating: {restaurant?.rating} stars
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Reviews: {restaurant?.review_count}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Price: {restaurant?.price}
         </MagnusText>
        </Box>
       </Box>
      </View>
     </ScrollView>
    </Host>
   </SafeAreaView>
  </ThemeProvider>
 );
};

export default RestaurantScreen;
