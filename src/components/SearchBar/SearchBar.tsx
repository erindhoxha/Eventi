import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Icon, Text } from 'react-native-magnus';
import Spinner from '../Spinner/Spinner';

type SearchBarProps = {
 loading?: boolean;
 value?: string;
 onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
 onSubmit: (text: string) => void;
};

const SearchBar = ({ loading, value, onChange, onSubmit }: SearchBarProps) => {
 const onSearchSubmit = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  onSubmit(e.nativeEvent.text);
 };
 return (
  <>
   <Text color="gray800" fontWeight="500" fontSize="sm" mt="md">
    Search for events, food or more
   </Text>
   <Input
    hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
    suffix={
     loading ? (
      <Spinner />
     ) : (
      <Icon name="search" color="gray700" fontFamily="FontAwesome" />
     )
    }
    p="md"
    fontSize="lg"
    value={value}
    borderWidth={0}
    placeholder="E.g. pizza, museum, discount store"
    mt="sm"
    bg="gray100"
    onChange={(e) => onChange(e)}
    onEndEditing={onSearchSubmit}
   />
  </>
 );
};

export default SearchBar;
