import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Icon, Text } from 'react-native-magnus';
import Spinner from '../Spinner/Spinner';

type SearchBarProps = {
 loading?: boolean;
 onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
 onSubmit: (text: string) => void;
};

const SearchBar = ({ loading, onChange, onSubmit }: SearchBarProps) => {
 const onSearchSubmit = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  onSubmit(e.nativeEvent.text);
 };
 return (
  <>
   <Text color="gray800" fontWeight="500" fontSize="sm" mt="md">
    What kind of food are you craving?
   </Text>
   <Input
    suffix={
     loading ? (
      <Spinner />
     ) : (
      <Icon
       name="search"
       color="gray700"
       fontSize="title"
       fontFamily="FontAwesome"
      />
     )
    }
    p="md"
    fontSize="lg"
    borderWidth={0}
    placeholder="E.g. pizza, sushi"
    mt="sm"
    bg="gray100"
    onChange={(e) => onChange(e)}
    onEndEditing={onSearchSubmit}
   />
  </>
 );
};

export default SearchBar;
