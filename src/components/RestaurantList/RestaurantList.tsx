import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Box, Text as MagnusText } from 'react-native-magnus';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import { Venue } from '../../types/types';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.82;
const SPACING = 24;

interface RestaurantListPropTypes {
 title: string;
 results: Venue[];
 onPress: (item: Venue) => void;
}

const RestaurantList = ({
 results,
 title,
 onPress,
}: RestaurantListPropTypes) => {
 const flatListRef = useRef<FlatList>(null);

 useEffect(() => {
  if (flatListRef.current) {
   flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }
 }, [results]);

 return (
  <Box>
   <Box mx="lg">
    <MagnusText color="gray900" fontWeight="bold" fontSize="xl" mb="md">
     {title}
    </MagnusText>
   </Box>
   <Box>
    <FlatList
     ref={flatListRef}
     snapToAlignment="center"
     snapToInterval={ITEM_SIZE + SPACING}
     decelerationRate="fast"
     bounces={false}
     horizontal
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}
     data={results}
     renderItem={({ item }) => (
      <RestaurantCard
       width={ITEM_SIZE}
       item={item}
       onPress={() => onPress(item)}
      />
     )}
     keyExtractor={(item) => `restaurant-list-item-${item.id}`}
    />
   </Box>
  </Box>
 );
};

export default RestaurantList;
