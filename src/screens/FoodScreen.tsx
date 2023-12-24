import React, { useEffect, useState } from 'react';
import {
 SafeAreaView,
 StatusBar,
 NativeSyntheticEvent,
 TextInputChangeEventData,
 ActivityIndicator,
 View,
 ScrollView,
} from 'react-native';
import {
 Text as MagnusText,
 ThemeProvider,
 Host,
 Box,
} from 'react-native-magnus';
import SearchBar from '../components/SearchBar/SearchBar';
import useResults from '../hooks/useResults';
import OptionsPortal from '../components/OptionsPortal/OptionsPortal';
import RestaurantList from '../components/RestaurantList/RestaurantList';
import HorizontalLine from '../components/HorizontalLine/HorizontalLine';

const FoodScreen = () => {
 const [value, setValue] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  setValue(e.nativeEvent.text);
 };
 const { results, request, error, loading } = useResults();

 const onSubmit = async (term: string) => {
  setSearchTerm(term);
  request(term);
 };

 const budgetFriendlyResults = results.filter((result) => {
  return result.price === '$';
 });

 const classyResults = results.filter((result) => {
  return result.price === '$$';
 });

 useEffect(() => {
  request('pizza');
 }, []);

 return (
  <ThemeProvider>
   <StatusBar barStyle="light-content" />
   <Host>
    <ScrollView>
     <Box flex={1} pt="lg">
      {loading ? (
       <Box m="lg">
        <ActivityIndicator />
       </Box>
      ) : null}
      <Box mx="lg">
       <MagnusText
        color="dark"
        fontWeight="bold"
        fontSize="4xl"
        mt="md"
        mb="md"
       >
        Local goodies, all in one place
       </MagnusText>
       <View
        style={{
         borderBottomColor: 'black',
         borderBottomWidth: 1,
        }}
       />
      </Box>
      <Box mx="lg" mb="lg">
       <MagnusText color="gray800" fontWeight="500" fontSize="sm" mt="md">
        Search for food or restaurant name
       </MagnusText>
       <SearchBar onChange={onChange} onSubmit={onSubmit} />
       {error && (
        <MagnusText color="red500" fontSize="md" mt="sm">
         Something went wrong on our end. Please try again.
        </MagnusText>
       )}
      </Box>

      {results && results.length > 0 && (
       <RestaurantList title={`In your area`} results={results} />
      )}

      <HorizontalLine fade />

      {results && results.length > 0 && (
       <RestaurantList
        title="Budget friendly"
        results={budgetFriendlyResults}
       />
      )}

      <HorizontalLine fade />

      {results && results.length > 0 && (
       <RestaurantList title="Classy Sundays" results={classyResults} />
      )}
      <Box m="lg">
       {results && results.length ? (
        <MagnusText fontWeight="normal" fontSize="md" mt="md">
         We have found {results.length} results
        </MagnusText>
       ) : null}
      </Box>
     </Box>
    </ScrollView>
    <OptionsPortal />
   </Host>
  </ThemeProvider>
 );
};

export default FoodScreen;
