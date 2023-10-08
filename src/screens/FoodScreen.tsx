import React, { useState } from 'react';
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
import yelp from '../api/yelp';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.82;
const SPACING = 24;

const FoodScreen = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text);
  };
  const onSubmit = async (text: string) => {
    setLoading(true);
    try {
      await yelp
        .get('/search', {
          params: {
            limit: 50,
            term: text,
            location: 'san jose',
          },
        })
        .then((res) => {
          setResults(res.data.businesses);
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
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
            {loading && (
              <Box m="lg">
                <ActivityIndicator />
              </Box>
            )}

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
          <Portal>
            <Fab bg="blue600" h={50} w={50}>
              <Button p="none" bg="transparent" justifyContent="flex-end">
                <Box rounded="sm" bg="white" p="sm">
                  <MagnusText fontSize="MagnusText100">Cheer</MagnusText>
                </Box>
                <Icon
                  name="user"
                  color="blue600"
                  h={50}
                  w={50}
                  rounded="circle"
                  ml="md"
                  bg="white"
                />
              </Button>
              <Button
                p="none"
                bg="transparent"
                justifyContent="flex-end"
                disabled
              >
                <Box rounded="sm" bg="white" p="sm">
                  <MagnusText fontSize="MagnusText100">Boost</MagnusText>
                </Box>
                <Icon
                  name="user"
                  color="blue600"
                  h={50}
                  w={50}
                  rounded="circle"
                  ml="md"
                  bg="white"
                />
              </Button>
            </Fab>
          </Portal>
        </Host>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default FoodScreen;
