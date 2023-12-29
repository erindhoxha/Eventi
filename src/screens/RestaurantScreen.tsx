import React, { useEffect } from 'react';
import {
 Dimensions,
 Linking,
 Platform,
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
 Icon,
 Image,
 Text as MagnusText,
 Tag,
 ThemeProvider,
} from 'react-native-magnus';
import { RootStackProps } from '../../App';
import useResult from '../hooks/useResult';
import Spinner from '../components/Spinner/Spinner';
import useReview from '../hooks/useReview';

const RestaurantScreen = ({
 navigation,
}: {
 navigation: RootStackProps['Restaurant'];
}) => {
 const { id } = navigation.state.params;

 const width = Dimensions.get('window').width;

 const { result, request, loading, error } = useResult(id);

 const {
  result: reviewResults,
  request: reviewRequest,
  loadingReviews,
  errorReviews,
 } = useReview(id);

 useEffect(() => {
  request(id);
  reviewRequest(id);
 }, []);

 // console.log('Result', JSON.stringify(result, null, 2));

 console.log('Reviews', JSON.stringify(reviewResults, null, 2));

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
       flexGrow: 1,
      }}
      style={{
       backgroundColor: 'white',
      }}
     >
      {Platform.OS === 'ios' && (
       <View
        style={{
         backgroundColor: 'black',
         height: 300,
         position: 'absolute',
         top: -300,
         left: 0,
         right: 0,
        }}
       />
      )}
      <View
       style={{
        backgroundColor: 'white',
        flexGrow: 1,
       }}
      >
       <View
        style={{
         backgroundColor: 'black',
         height: 250,
        }}
       >
        <Carousel showIndicators={false}>
         {result?.photos.map((photo) => (
          <Carousel.Item
           key={photo}
           children={
            <Image
             source={{ uri: photo }}
             h={250}
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
          <MagnusText color="gray600" fontSize="md">
           Phone: {result?.display_phone}
          </MagnusText>
         ) : null}
        </Box>
        <Box mt="lg" pb="lg">
         {reviewResults &&
          reviewResults?.reviews.map((review) => (
           <Box key={review.id} mt="lg" p="lg" bg="gray100" rounded="md">
            <Box mb="lg" row justifyContent="space-between" alignItems="center">
             <MagnusText fontSize="md" fontWeight="bold">
              {review.user.name}
             </MagnusText>
             <Box row>
              {Array.from({ length: review.rating }).map((_, index) => (
               <Icon key={index} name="star" color="yellow500" fontSize="sm" />
              ))}
             </Box>
            </Box>
            <MagnusText fontSize="md" color="gray600">
             {review.text}
            </MagnusText>
           </Box>
          ))}
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
