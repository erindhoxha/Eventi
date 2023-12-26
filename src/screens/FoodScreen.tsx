import React, { useEffect, useState } from 'react';
import {
 SafeAreaView,
 StatusBar,
 NativeSyntheticEvent,
 TextInputChangeEventData,
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
import CountrySearchBar from '../components/CountrySearchBar/CountrySearchBar';
import { RefreshControl } from 'react-native-gesture-handler';
import useLocation from '../hooks/useLocation';
import { RestaurantCardProps } from '../components/RestaurantCard/types';

const FoodScreen = ({ navigation }) => {
 const [value, setValue] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  setValue(e.nativeEvent.text);
 };
 const { results, request, error, loading, isRefreshing } = useResults();

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
  request('food near me');
 }, []);

 const navigateToRestaurant = (item: RestaurantCardProps['item']) => {
  navigation.navigate('Restaurant', {
   restaurantName: item.name,
   restaurant: item,
  });
 };

 const { location, error: locationError } = useLocation();

 console.log(location);

 return (
  <ThemeProvider>
   <StatusBar barStyle="light-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <Host>
     <ScrollView
      refreshControl={
       <RefreshControl
        size={14}
        refreshing={isRefreshing}
        onRefresh={() => {
         request(searchTerm);
        }}
       />
      }
     >
      <Box flex={1} pt="lg">
       <Box mx="lg">
        <MagnusText
         color="gray900"
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
        <CountrySearchBar onChange={onChange} onSubmit={onSubmit} />
        <SearchBar loading={loading} onChange={onChange} onSubmit={onSubmit} />
        {error && (
         <MagnusText color="red500" fontSize="md" mt="sm">
          Something went wrong on our end. Please try again.
         </MagnusText>
        )}
       </Box>

       {results && results.length > 0 && (
        <RestaurantList
         title={`In your area`}
         results={results}
         onPress={navigateToRestaurant}
        />
       )}

       <HorizontalLine fade />

       {budgetFriendlyResults && budgetFriendlyResults.length > 0 && (
        <>
         <RestaurantList
          title="Budget friendly"
          results={budgetFriendlyResults}
          onPress={navigateToRestaurant}
         />
         <HorizontalLine fade />
        </>
       )}

       {classyResults && classyResults.length > 0 && (
        <RestaurantList
         title="Classy Sundays"
         results={classyResults}
         onPress={navigateToRestaurant}
        />
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
    </Host>
   </SafeAreaView>
  </ThemeProvider>
 );
};

export default FoodScreen;
