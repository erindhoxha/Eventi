import React from 'react';
import { SafeAreaView, StatusBar, FlatList, Pressable } from 'react-native';
import {
 Text as MagnusText,
 ThemeProvider,
 Button,
 Input,
 Icon,
 Host,
 Fab,
 Portal,
 Box,
} from 'react-native-magnus';
import SearchBar from '../components/SearchBar/SearchBar';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';

const friends = [
 {
  id: 1,
  image:
   'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
 },
 {
  id: 2,
  image:
   'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1927&q=80',
 },
 {
  id: 3,
  image:
   'https://images.unsplash.com/photo-1516640997890-5e4c83df8419?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
 },
 {
  id: 4,
  image:
   'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80',
 },
 {
  id: 5,
  image:
   'https://images.unsplash.com/photo-1453365607868-7deed8cc7d26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
 },
 {
  id: 6,
  image:
   'https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
 },
];

const FoodScreen = () => {
 return (
  <ThemeProvider>
   <StatusBar barStyle="dark-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <Host>
     <Box mx="xl" flex={1} pt="lg">
      <MagnusText color="dark" fontWeight="bold" fontSize="4xl" mt="md">
       Search for food
      </MagnusText>
      <SearchBar />
      <MagnusText color="dark" fontWeight="bold" fontSize="2xl" mt="xl" mb="md">
       In your area
      </MagnusText>
      <Box flexGrow={1}>
       <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={friends}
        renderItem={({ item }) => <RestaurantCard item={item} />}
        keyExtractor={(item) => `friend-list-item-${item.id}`}
       />
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
       <Button p="none" bg="transparent" justifyContent="flex-end" disabled>
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
