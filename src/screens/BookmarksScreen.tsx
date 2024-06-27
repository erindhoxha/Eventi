import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import {
  Box,
  Button,
  Host,
  Text as MagnusText,
  ThemeProvider,
} from 'react-native-magnus';
import useUserBookmarks from '../hooks/useUserBookmarks';
import { useAuthContext } from '../context/AuthContext';
import Spinner from '../components/Spinner/Spinner';
import { FlatList } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

const BookmarksScreen = ({ navigation }) => {
  const { session } = useAuthContext();

  const data = useUserBookmarks(session?.user?.id || '');

  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}>
        <Host>
          <View
            style={{
              backgroundColor: 'white',
              flexGrow: 1,
            }}>
            {Platform.OS === 'ios' && (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 300,
                  position: 'absolute',
                  top: -300,
                  left: 0,
                  right: 0,
                }}
              />
            )}
            <View
              style={{
                backgroundColor: 'white',
                flexGrow: 1,
              }}>
              <Box flex={1} pt="lg" mx="lg">
                <MagnusText
                  color="gray900"
                  fontWeight="bold"
                  fontSize="4xl"
                  mt="md"
                  mb="md">
                  Bookmarks
                </MagnusText>
                {data.data && (
                  <Box flex={1}>
                    <Box>
                      <FlatList
                        data={data?.data}
                        contentContainerStyle={{
                          paddingBottom:
                            data?.data &&
                            data?.data.length > 0
                              ? 80
                              : 0,
                        }}
                        renderItem={({ item }) => (
                          <Box
                            key={item.id}
                            bg="white"
                            mt="md"
                            mb="md"
                            rounded="md"
                            row
                            style={{
                              gap: 4,
                            }}>
                            <Box
                              rounded="xl"
                              w={125}
                              bgImg={{
                                uri:
                                  item.image_url ||
                                  'https://picsum.photos/id/42/450',
                              }}></Box>
                            <Box flexDir="column" pl="md">
                              <MagnusText
                                color="gray900"
                                fontWeight="bold"
                                fontSize="xl"
                                mb="md">
                                {item.title} asd asd asd as
                                dasd asda sd
                              </MagnusText>
                              <Box
                                row
                                style={{
                                  gap: 4,
                                }}>
                                <MagnusText
                                  color="gray900"
                                  fontSize="md">
                                  {item.reviews} reviews
                                </MagnusText>
                                <MagnusText
                                  color="gray900"
                                  fontSize="md">
                                  /
                                </MagnusText>
                                <MagnusText
                                  color="gray900"
                                  fontSize="md">
                                  {item.rating} stars
                                </MagnusText>
                              </Box>
                              <Box
                                flexWrap="wrap"
                                flexDir="row"
                                style={{
                                  gap: 12,
                                }}>
                                <Button
                                  mt="lg"
                                  color="white"
                                  bg="green700"
                                  onPress={() => {
                                    navigation.navigate(
                                      'Restaurant',
                                      {
                                        restaurantName:
                                          item.title,
                                        id: item.restaurant_id,
                                      },
                                    );
                                  }}>
                                  View Details
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </Box>
                  </Box>
                )}
                {!data.data?.length &&
                  data.status !== 'loading' && (
                    <Box>
                      <MagnusText
                        color="gray900"
                        fontSize="xl"
                        mt="md"
                        mb="md">
                        You have no bookmarks yet.
                      </MagnusText>
                      <Button
                        block
                        mt="lg"
                        color="green700"
                        bg="transparent"
                        borderColor="green700"
                        borderWidth={1.5}
                        onPress={() => {
                          navigation.navigate('Home');
                        }}>
                        Find Restaurants
                      </Button>
                    </Box>
                  )}
                {data.status === 'loading' && (
                  <Box py="lg">
                    <Spinner size={20} />
                  </Box>
                )}
              </Box>
            </View>
          </View>
        </Host>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default BookmarksScreen;
