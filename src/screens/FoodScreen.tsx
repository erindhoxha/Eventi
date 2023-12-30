import React, { useEffect, useState } from 'react';
import {
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
import RestaurantList from '../components/RestaurantList/RestaurantList';
import HorizontalLine from '../components/HorizontalLine/HorizontalLine';
import CountrySearchBar from '../components/CountrySearchBar/CountrySearchBar';
import { RefreshControl } from 'react-native-gesture-handler';
import useLocation from '../hooks/useLocation';
import { RestaurantCardProps } from '../components/RestaurantCard/types';
import useReverseGeocode from '../hooks/useReverseGeocoding';
import {
 SafeAreaProvider,
 initialWindowMetrics,
} from 'react-native-safe-area-context';

const FoodScreen = ({ navigation }) => {
 const [country, setCountry] = useState('');
 const [food, setFood] = useState('');

 const {
  location,
  error: locationError,
  loading: locationLoading,
 } = useLocation();

 const place = useReverseGeocode(
  location?.coords?.latitude,
  location?.coords?.longitude
 );

 const [query, setQuery] = useState({
  country: 'Sydney',
  food: 'Food near me',
 });

 useEffect(() => {
  setQuery((prevQuery) => ({
   ...prevQuery,
   country: place?.data?.state,
  }));

  console.log(place?.data?.state);
 }, [place?.data?.state]);

 const resultsQuery = useResults(query.food, query.country);

 const onChangeCountry = (
  e: NativeSyntheticEvent<TextInputChangeEventData>
 ) => {
  // setCountry(e.nativeEvent.text);
 };

 const onChangeFood = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  // setFood(e.nativeEvent.text);
 };

 const onSubmitCountry = async (term: string) => {};

 const onSubmitFood = async (term: string) => {};

 const budgetFriendlyResults = resultsQuery?.data?.businesses?.filter(
  (result) => {
   return result.price === '$';
  }
 );

 const midRangeResults = resultsQuery.data?.businesses?.filter((result) => {
  return result.price === '$$';
 });

 const classyResults = resultsQuery.data?.businesses?.filter((result) => {
  return result.price === '$$$';
 });

 const navigateToRestaurant = (item: RestaurantCardProps['item']) => {
  navigation.navigate('Restaurant', {
   restaurantName: item.name,
   id: item.id,
  });
 };

 return (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
   <ThemeProvider>
    <StatusBar barStyle="light-content" />
    <Host>
     <ScrollView
      refreshControl={
       <RefreshControl
        size={14}
        refreshing={resultsQuery.isFetching || locationLoading}
        onRefresh={() => {
         resultsQuery.refetch();
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
        <CountrySearchBar
         value={country}
         onChange={onChangeCountry}
         onSubmit={onSubmitCountry}
        />
        <SearchBar
         loading={resultsQuery.status === 'loading'}
         onChange={onChangeFood}
         onSubmit={onSubmitFood}
        />
        {locationError && (
         <MagnusText color="red500" fontSize="md" mt="sm">
          {locationError.message}
         </MagnusText>
        )}
        {resultsQuery.status === 'error' && (
         <MagnusText color="red500" fontSize="md" mt="sm">
          Something went wrong on our end. Please try again.
         </MagnusText>
        )}
       </Box>

       {resultsQuery.data && resultsQuery.data.length > 0 && (
        <RestaurantList
         title={`In your area`}
         results={resultsQuery.data}
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

       {midRangeResults && midRangeResults.length > 0 && (
        <>
         <RestaurantList
          title="Mid-range"
          results={midRangeResults}
          onPress={navigateToRestaurant}
         />
         <HorizontalLine fade />
        </>
       )}

       {classyResults && classyResults.length > 0 && (
        <RestaurantList
         title="Classy"
         results={classyResults}
         onPress={navigateToRestaurant}
        />
       )}
       <Box m="lg">
        {resultsQuery.data && resultsQuery.data.length ? (
         <MagnusText fontWeight="normal" fontSize="md" mt="md">
          We have found {resultsQuery.data.length} results
         </MagnusText>
        ) : null}
       </Box>
      </Box>
     </ScrollView>
    </Host>
   </ThemeProvider>
  </SafeAreaProvider>
 );
};

export default FoodScreen;
