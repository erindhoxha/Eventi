import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
} from 'react-native';
import {
  Text as MagnusText,
  ThemeProvider,
  Button,
  Icon,
  Host,
  Fab,
  Portal,
  Box,
} from 'react-native-magnus';
import SearchBar from '../components/SearchBar/SearchBar';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import useResults from '../hooks/useResults';
import OptionsPortal from '../components/OptionsPortal/OptionsPortal';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.82;
const SPACING = 24;

const FoodScreen = () => {
  const [value, setValue] = useState('');
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text);
  };
  const { results, request, error, loading } = useResults();

  const onSubmit = async (term: string) => {
    request(term);
  };

  useEffect(() => {
    request('pizza');
  }, []);

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Host>
          <Box flex={1} pt="lg">
            <Box mx="lg">
              <MagnusText color="dark" fontWeight="bold" fontSize="4xl" mt="md">
                Search for food
              </MagnusText>
              <SearchBar onChange={onChange} onSubmit={onSubmit} />
              {error && (
                <MagnusText color="red500" fontSize="md" mt="sm">
                  Something went wrong on our end. Please try again.
                </MagnusText>
              )}
            </Box>
            {loading ? (
              <Box m="lg">
                <ActivityIndicator />
              </Box>
            ) : null}

            {results && results.length > 0 && (
              <>
                <Box mx="lg">
                  <MagnusText
                    color="dark"
                    fontWeight="bold"
                    fontSize="2xl"
                    mt="xl"
                    mb="md"
                  >
                    In your area
                  </MagnusText>
                </Box>
                <Box>
                  <FlatList
                    snapToAlignment="center"
                    snapToInterval={ITEM_SIZE + SPACING}
                    decelerationRate="fast"
                    bounces={false}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={results}
                    renderItem={({ item }) => (
                      <RestaurantCard width={ITEM_SIZE} item={item} />
                    )}
                    keyExtractor={(item) => `friend-list-item-${item.id}`}
                  />
                </Box>
              </>
            )}
            <Box m="lg">
              {results && results.length ? (
                <MagnusText fontWeight="normal" fontSize="md" mt="md">
                  We have found {results.length} results
                </MagnusText>
              ) : null}
            </Box>
          </Box>
          <OptionsPortal />
        </Host>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default FoodScreen;
