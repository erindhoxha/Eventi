import React from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import {
  Box,
  Button,
  Host,
  Text as MagnusText,
  ThemeProvider,
} from "react-native-magnus";
import useUserBookmarks from "../hooks/useUserBookmarks";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner/Spinner";
import { FlatList } from "react-native-gesture-handler";

const BookmarksScreen = ({ navigation }) => {
  const { session } = useAuthContext();

  const data = useUserBookmarks(session?.user?.id);

  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Host>
          <View
            style={{
              backgroundColor: "white",
              flexGrow: 1,
            }}
          >
            {Platform.OS === "ios" && (
              <View
                style={{
                  backgroundColor: "black",
                  height: 300,
                  position: "absolute",
                  top: -300,
                  left: 0,
                  right: 0,
                }}
              />
            )}
            <View
              style={{
                backgroundColor: "white",
                flexGrow: 1,
              }}
            >
              {data.isLoading ? (
                <Box py="lg">
                  <Spinner size={20} />
                </Box>
              ) : (
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
                    <FlatList
                      data={data?.data}
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
                          }}
                        >
                          <Box
                            rounded="xl"
                            w={125}
                            bgImg={{
                              uri:
                                item.image_url ||
                                "https://picsum.photos/id/42/450",
                            }}
                          ></Box>
                          <Box flexDir="column" pl="md">
                            <MagnusText
                              color="gray900"
                              fontWeight="bold"
                              fontSize="xl"
                              mb="md"
                            >
                              {item.title} asd asd asd as dasd asda sd
                            </MagnusText>
                            <Box
                              row
                              style={{
                                gap: 4,
                              }}
                            >
                              <MagnusText color="gray900" fontSize="md">
                                {item.reviews} reviews
                              </MagnusText>
                              <MagnusText color="gray900" fontSize="md">
                                /
                              </MagnusText>
                              <MagnusText color="gray900" fontSize="md">
                                {item.rating} stars
                              </MagnusText>
                            </Box>
                            <Button
                              mt="lg"
                              color="white"
                              onPress={() => {
                                navigation.navigate("Restaurant", {
                                  restaurantName: item.title,
                                  id: item.restaurant_id,
                                });
                              }}
                            >
                              View Details
                            </Button>
                          </Box>
                        </Box>
                      )}
                      keyExtractor={(item) => item.id}
                    />

                    {!data.data?.length && (
                      <MagnusText color="gray900" fontSize="xl" mt="md" mb="md">
                        You have no bookmarks yet.
                      </MagnusText>
                    )}
                  </Box>
                </Box>
              )}
            </View>
          </View>
        </Host>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default BookmarksScreen;
