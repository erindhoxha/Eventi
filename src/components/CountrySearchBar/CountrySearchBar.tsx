import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Text } from 'react-native-magnus';

type CountrySearchBar = {
 value: string;
 onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
 onSubmit: (text: string) => void;
};

const CountrySearchBar = ({ value, onChange, onSubmit }: CountrySearchBar) => {
 const onSearchSubmit = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  onSubmit(e.nativeEvent.text);
 };
 return (
  <>
   <Text color="gray800" fontWeight="500" fontSize="sm" mt="md">
    Search in your area
   </Text>
   <Input
    value={value}
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
