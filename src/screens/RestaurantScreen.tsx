import React from 'react';
import {
 Linking,
 Pressable,
 SafeAreaView,
 ScrollView,
 StatusBar,
 View,
} from 'react-native';
import {
 Box,
 Button,
 Host,
 Icon,
 Image,
 Text as MagnusText,
 Tag,
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
        <Box row justifyContent="space-between" alignItems="flex-start">
         <Box flex={1}>
          <MagnusText
           color="gray900"
           fontWeight="bold"
           fontSize="4xl"
           mt="md"
           mb="md"
          >
           {restaurant?.name}
          </MagnusText>
         </Box>
         <Tag
          mt={4}
          bg={restaurant?.is_closed ? 'red700' : 'green700'}
          color="white"
         >
          {restaurant?.is_closed ? 'Closed' : 'Open now'}
         </Tag>
        </Box>
        <Box
         style={{
          gap: 4,
         }}
        >
         <Box row>
          <MagnusText fontWeight="bold" mr="sm">
           {restaurant?.rating}
          </MagnusText>
          <MagnusText color="gray500">
           ({restaurant?.review_count} reviews)
          </MagnusText>
         </Box>
         <MagnusText color="gray600" fontSize="md">
          {restaurant?.location.display_address.join(' ')}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Type of venue: {restaurant?.categories.map((c) => c.title).join(', ')}
         </MagnusText>
         {restaurant?.display_phone ? (
          <Button
           mt="md"
           color="white"
           fontSize="md"
           onPress={() => {
            Linking.openURL(`tel:${restaurant.display_phone}`);
           }}
          >
           Call the restaurant
          </Button>
         ) : null}
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
