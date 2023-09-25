import React from 'react';
import { Input, Icon } from 'react-native-magnus';

const SearchBar = () => {
 return (
  <Input
   suffix={
    <Icon
     name="search"
     color="gray700"
     fontSize="title"
     fontFamily="FontAwesome"
    />
   }
   p="md"
   fontSize="lg"
   borderWidth={0}
   placeholder="Search your doge homies"
   mt="lg"
   bg="gray100"
  />
 );
};

export default SearchBar;
