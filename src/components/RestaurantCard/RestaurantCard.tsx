import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text as MagnusText } from 'react-native-magnus';
import { RestaurantCardProps } from './types';

const RestaurantCard = ({ item, width, onPress }: RestaurantCardProps) => {
 return (
  <Pressable onPress={onPress}>
   <Box w={width} mx="lg">
    <Box
     rounded="xl"
     h={150}
     bgImg={{
      uri: item.image_url,
     }}
    >
     <Box
      bg="orange500"
      rounded="md"
      row
      flexWrap="wrap"
      px="md"
      m="lg"
      alignSelf="flex-start"
     >
      <MagnusText color="white" fontSize="sm">
       {item.is_closed ? 'Closed' : 'Open'}
      </MagnusText>
     </Box>
    </Box>
    <Box row alignItems="center">
     <Box flex={1}>
      <MagnusText fontWeight="bold" fontSize="xl" mt="sm">
       {item.name}
      </MagnusText>
      <MagnusText color="gray500" fontSize="sm">
       {item.categories ? item.categories[0].title : null}
      </MagnusText>
      <MagnusText color="gray500" fontSize="sm">
       {item.review_count} reviews / {item.rating} stars
      </MagnusText>
     </Box>
     <Box row alignItems="center">
      <MagnusText color="green800" fontWeight="bold" fontSize="xl">
       {item.price}
      </MagnusText>
     </Box>
    </Box>
   </Box>
  </Pressable>
 );
};

export default RestaurantCard;
