import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import {
 Box,
 Host,
 Text as MagnusText,
 ThemeProvider,
} from 'react-native-magnus';

const BookmarksScreen = () => {
 return (
  <ThemeProvider>
   <StatusBar barStyle="light-content" />
   <SafeAreaView style={{ flex: 1 }}>
    <Host>
     <ScrollView
      contentContainerStyle={{
       flex: 1,
      }}
      style={{
       backgroundColor: 'black',
      }}
     >
      <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
       <Box flex={1} pt="lg">
        <Box mx="lg">
         <MagnusText
          color="gray900"
          fontWeight="bold"
          fontSize="4xl"
          mt="md"
          mb="md"
         >
          Bookmarks
         </MagnusText>
         <MagnusText color="gray900" fontSize="xl" mt="md" mb="md">
          You have no bookmarks yet.
         </MagnusText>
        </Box>
       </Box>
      </View>
     </ScrollView>
    </Host>
   </SafeAreaView>
  </ThemeProvider>
 );
};

export default BookmarksScreen;
