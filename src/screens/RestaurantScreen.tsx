import React, { useEffect } from 'react';
import {
 Dimensions,
 Platform,
 SafeAreaView,
 ScrollView,
 StatusBar,
 View,
} from 'react-native';
import {
 Box,
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
import { RefreshControl } from 'react-native-gesture-handler';

const RestaurantScreen = ({
 navigation,
}: {
 navigation: RootStackProps['Restaurant'];
}) => {
 const { id } = navigation.state.params;

 const width = Dimensions.get('window').width;

 const resultData = useResult(id);
 const data = useReview(id);

 if (resultData.status === 'loading') {
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
      // refreshControl={
      //  <RefreshControl
      //   size={14}
      //   refreshing={loading || loadingReviews}
      //   style={{
      //    backgroundColor: 'white',
      //   }}
      //   tintColor={'white'}
      //   colors={['white']}
      //   onRefresh={() => {
      //    request(id);
      //    reviewRequest(id);
      //   }}
      //  />
      // }
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
         {resultData?.data?.photos.map((photo) => (
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
          {resultData.status === 'error' && (
           <MagnusText color="red500" fontSize="md">
            {resultData.error.message}
           </MagnusText>
          )}
          <MagnusText
           color="gray900"
           fontWeight="bold"
           fontSize="4xl"
           mt="md"
           mb="md"
          >
           {resultData.data?.name}
          </MagnusText>
         </Box>
         <Tag
          mt={4}
          bg={resultData.data?.is_closed ? 'red700' : 'green700'}
          color="white"
         >
          {resultData.data?.is_closed ? 'Closed' : 'Open now'}
         </Tag>
        </Box>
        <Box
         style={{
          gap: 4,
         }}
        >
         <Box row>
          <MagnusText fontWeight="bold" mr="sm">
           {resultData.data?.rating} stars
          </MagnusText>
          <MagnusText color="gray500">
           ({resultData.data?.review_count} reviews)
          </MagnusText>
         </Box>
         <MagnusText color="gray600" fontSize="md">
          {resultData.data?.location.display_address.join(' ')}
         </MagnusText>
         <MagnusText color="gray600" fontSize="md">
          Type of venue:{' '}
          {resultData.data?.categories.map((c) => c.title).join(', ')}
         </MagnusText>
         {resultData.data?.display_phone ? (
          <MagnusText color="gray600" fontSize="md">
           Phone: {resultData.data?.display_phone}
          </MagnusText>
         ) : null}
        </Box>
        <Box mt="lg" pb="lg">
         {data.status === 'loading' && <Spinner />}
         {data.status === 'error' && (
          <MagnusText color="red500" fontSize="md">
           {data.error.message}
          </MagnusText>
         )}
         {data &&
          data.data?.reviews.map((review) => (
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
