import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Input, Icon } from 'react-native-magnus';

type SearchBarProps = {
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onSubmit: (text: string) => void;
};

const SearchBar = ({ onChange, onSubmit }: SearchBarProps) => {
  const onSearchSubmit = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onSubmit(e.nativeEvent.text);
  };
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
      placeholder="E.g. pizza, sushi"
      mt="lg"
      bg="gray100"
      onChange={(e) => onChange(e)}
      onEndEditing={onSearchSubmit}
    />
  );
};

export default SearchBar;
