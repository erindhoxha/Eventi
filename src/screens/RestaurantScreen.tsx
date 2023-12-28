import React, { useEffect } from 'react';
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
 Image,
 Text as MagnusText,
 Tag,
 Text,
 ThemeProvider,
} from 'react-native-magnus';
import { RootStackProps } from '../../App';
import useResult from '../hooks/useResult';
import Spinner from '../components/Spinner/Spinner';

const RestaurantScreen = ({
 navigation,
}: {
 navigation: RootStackProps['Restaurant'];
}) => {
 const { id } = navigation.state.params;

 const { result, request, loading, error } = useResult(id);

 useEffect(() => {
  request(id);
 }, []);

 if (loading) {
  return (
   <Box justifyContent="center" py="2xl">
    <Spinner size={24} />
   </Box>
  );
 }

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
      <View
       style={{
        backgroundColor: 'white',
        flexGrow: 1,
       }}
      >
       <View
        style={{
         backgroundColor: 'black',
        }}
       >
        {result?.image_url !== '' ? (
         <Image source={{ uri: result?.image_url }} h={200} />
        ) : (
         <Image source={require('../../assets/splash.png')} h={200} />
        )}
       </View>

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
           {result?.name}
          </MagnusText>
         </Box>
         <Tag
          mt={4}
          bg={result?.is_closed ? 'red700' : 'green700'}
          color="white"
         >
          {result?.is_closed ? 'Closed' : 'Open now'}
         </Tag>
        </Box>
        <Box
         style={{
          gap: 4,
         }}
        >
         <Box row>
          <MagnusText fontWeight="bold" mr="sm">
           {result?.rating} stars
          </MagnusText>
          <MagnusText color="gray500">
           ({result?.review_count} reviews)
          </MagnusText>
         </Box>
         <MagnusText color="gray600" fontSize="md">
          {result?.location.display_address.join(' ')}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Type of venue: {result?.categories.map((c) => c.title).join(', ')}
         </MagnusText>
         {result?.display_phone ? (
          <Button
           mt="md"
           color="white"
           fontSize="md"
           onPress={() => {
            Linking.openURL(`tel:${result.display_phone}`);
           }}
          >
           Call the venue
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
