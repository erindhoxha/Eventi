import { View } from 'react-native';
import React from 'react';
import { Box } from 'react-native-magnus';

const HorizontalLine = ({ fade }: { fade?: boolean }) => {
  return (
    <Box mx="lg" mb="lg" mt="lg">
      <View
        style={{
          borderBottomColor: fade ? 'rgba(0,0,0,0.1)' : 'black',
          borderBottomWidth: 1,
        }}
      />
    </Box>
  );
};

export default HorizontalLine;
