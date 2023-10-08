import React from 'react';
import { Box, Text as MagnusText } from 'react-native-magnus';

type RestaurantCardProps = {
  item: {
    name: string;
    image_url: string;
    price: string;
    rating: number;
    review_count: number;
    is_closed: boolean;
    categories: {
      title: string;
    }[];
  };
  width: number;
};

const RestaurantCard = ({ item, width }: RestaurantCardProps) => {
  return (
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
  );
};

export default RestaurantCard;
