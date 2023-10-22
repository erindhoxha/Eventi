import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Box, Text as MagnusText } from 'react-native-magnus';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.82;
const SPACING = 24;

const RestaurantList = ({ results }) => {
  return (
    <>
      <Box mx="lg">
        <MagnusText
          color="dark"
          fontWeight="bold"
          fontSize="2xl"
          mt="xl"
          mb="md"
        >
          In your area
        </MagnusText>
      </Box>
      <Box>
        <FlatList
          snapToAlignment="center"
          snapToInterval={ITEM_SIZE + SPACING}
          decelerationRate="fast"
          bounces={false}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={results}
          renderItem={({ item }) => (
            <RestaurantCard width={ITEM_SIZE} item={item} />
          )}
          keyExtractor={(item) => `friend-list-item-${item.id}`}
        />
      </Box>
    </>
  );
};

export default RestaurantList;
