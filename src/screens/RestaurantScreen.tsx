import React, { useEffect } from 'react';
import {
 Dimensions,
 Linking,
 SafeAreaView,
 ScrollView,
 StatusBar,
 View,
} from 'react-native';
import {
 Box,
 Button,
 Carousel,
 Host,
 Image,
 Text as MagnusText,
 Tag,
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

 const width = Dimensions.get('window').width;

 const { result, request, loading, error } = useResult(id);

 useEffect(() => {
  request(id);
 }, []);

 console.log('Result', JSON.stringify(result, null, 2));

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
         height: 200,
        }}
       >
        <Carousel showIndicators={false}>
         {result?.photos.map((photo) => (
          <Carousel.Item
           key={photo}
           children={
            <Image
             source={{ uri: photo }}
             h={200}
             w={width}
             resizeMode="cover"
            />
           }
          />
         ))}
        </Carousel>
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
