import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import {
  Box,
  Host,
  Text as MagnusText,
  ThemeProvider,
} from "react-native-magnus";
import useUserBookmarks from "../hooks/useUserBookmarks";
import { useAuthContext } from "../context/AuthContext";

const BookmarksScreen = () => {
  const { session } = useAuthContext();

  const { bookmarks } = useUserBookmarks(session?.user?.id);

  console.log(bookmarks);
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Host>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            style={{
              backgroundColor: "white",
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
