import React from 'react';
import { Box, Text as MagnusText } from 'react-native-magnus';

const RestaurantCard = ({ item, width }) => {
  return (
    <Box w={width} mx="lg">
      <Box
        rounded="xl"
        h={150}
        bgImg={{
          uri: item.image,
        }}
      >
        <Box
          bg="pink500"
          rounded="md"
          row
          flexWrap="wrap"
          px="md"
          m="lg"
          alignSelf="flex-start"
        >
          <MagnusText color="white" fontSize="sm">
            2 Rooms
          </MagnusText>
        </Box>
      </Box>
      <Box row alignItems="center">
        <Box flex={1}>
          <MagnusText fontWeight="bold" fontSize="xl" mt="sm">
            Sunny Apartment
          </MagnusText>
          <MagnusText color="gray500" fontSize="sm">
            Gurgoan, India
          </MagnusText>
        </Box>
        <Box row alignItems="center">
          <MagnusText color="blue500" fontWeight="bold" fontSize="xl">
            $500
          </MagnusText>
          <MagnusText color="gray500" ml="md">
            / per day
          </MagnusText>
        </Box>
      </Box>
    </Box>
  );
};

export default RestaurantCard;
