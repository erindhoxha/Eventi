import React from "react";
import { Box, Icon, Text as MagnusText } from "react-native-magnus";

const Review = ({ review }) => {
  return (
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
  );
};

export default Review;
