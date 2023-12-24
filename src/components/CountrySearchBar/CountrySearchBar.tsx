import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Icon, Text } from 'react-native-magnus';

type CountrySearchBar = {
 onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
 onSubmit: (text: string) => void;
};

const CountrySearchBar = ({ onChange, onSubmit }: CountrySearchBar) => {
 const onSearchSubmit = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  onSubmit(e.nativeEvent.text);
 };
 return (
  <>
   <Text color="gray800" fontWeight="500" fontSize="sm" mt="md">
    Searching in:
   </Text>
   <Input
    value="Sydney, Australia"
    p="md"
    fontSize="lg"
    borderWidth={0}
    placeholder="E.g. Sydney, Australia"
    mt="sm"
    bg="gray100"
    onChange={(e) => onChange(e)}
    onEndEditing={onSearchSubmit}
   />
  </>
 );
};

export default CountrySearchBar;
