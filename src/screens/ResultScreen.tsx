import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {
  Box,
  Button,
  Carousel,
  Host,
  Icon,
  Image,
  Text as MagnusText,
  Tag,
  ThemeProvider,
} from 'react-native-magnus';
import type {
  RootStackProps,
  RoutePropWithParams,
} from '../../App';
import useResult from '../hooks/useResult';
import Spinner from '../components/Spinner/Spinner';
import useReview from '../hooks/useReview';
import { useAuthContext } from '../context/AuthContext';
import Review from '../components/Review/Review';
import {
  useBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../hooks/useBookmarkMutation';
import useUserBookmarks from '../hooks/useUserBookmarks';

const ResultScreen = ({
  navigation,
  route,
}: {
  navigation: RootStackProps['Restaurant'];
  route: RoutePropWithParams<'Restaurant'>;
}) => {
  const { id } = route.params;

  const width = Dimensions.get('window').width;

  const { session } = useAuthContext();

  const resultData = useResult(id);
  const data = useReview(id);
  const { mutate, error, status } = useBookmarkMutation();
  const { mutate: removeBookmark, status: bookmarkStatus } =
    useRemoveBookmarkMutation();

  const {
    data: bookmarks,
    status: bookmarksStatus,
    isFetching,
  } = useUserBookmarks(session?.user?.id);

  if (resultData.status === 'loading') {
    return (
      <Box justifyContent="center" py="2xl">
        <Spinner size={24} />
      </Box>
    );
  }

  const bookmarkExists = bookmarks?.find(
    (b) => b.restaurant_id === id,
  );

  const handleAddBookmark = () => {
    if (session) {
      mutate({
        restaurant_id: id,
        user_id: session.user.id,
        title: resultData.data?.name,
        image_url: resultData.data?.image_url,
        reviews: resultData.data?.review_count,
        rating: resultData.data?.rating,
      });
    }
  };

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
              backgroundColor: 'white',
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
              <View
                style={{
                  backgroundColor: 'black',
                  height: 250,
                }}>
                <Carousel showIndicators={false}>
                  {resultData?.data?.photos.map((photo) => (
                    <Carousel.Item key={photo}>
                      <Image
                        source={{ uri: photo }}
                        h={250}
                        w={width}
                        resizeMode="cover"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </View>
              <Box pt="lg" px="lg">
                <Box
                  row
                  justifyContent="space-between"
                  alignItems="flex-start">
                  <Box flex={1}>
                    {resultData.status === 'error' && (
                      <MagnusText
                        color="red500"
                        fontSize="md">
                        {resultData.error.message}
                      </MagnusText>
                    )}
                    <MagnusText
                      color="gray900"
                      fontWeight="bold"
                      fontSize="4xl"
                      mt="md"
                      mb="md">
                      {resultData.data?.name}
                    </MagnusText>
                  </Box>
                  <Tag
                    mt={4}
                    color="white"
                    borderWidth={1.5}
                    bg={
                      resultData.data != null &&
                      resultData.data?.is_closed
                        ? 'red700'
                        : 'orange500'
                    }
                    rounded="circle"
                    row
                    flexWrap="wrap"
                    px="md"
                    m="lg"
                    alignSelf="flex-start">
                    {resultData.data != null &&
                    resultData.data?.is_closed
                      ? 'Closed'
                      : 'Open now'}
                  </Tag>
                </Box>
                <Box
                  style={{
                    gap: 4,
                  }}>
                  <Box row>
                    <MagnusText fontWeight="bold" mr="sm">
                      {resultData.data?.rating} stars
                    </MagnusText>
                    <MagnusText color="gray500">
                      ({resultData.data?.review_count}{' '}
                      reviews)
                    </MagnusText>
                  </Box>
                  <MagnusText color="gray600" fontSize="md">
                    {resultData.data?.location.display_address.join(
                      ' ',
                    )}
                  </MagnusText>
                  <MagnusText color="gray600" fontSize="md">
                    Type of venue:{' '}
                    {resultData.data?.categories
                      .map((c) => c.title)
                      .join(', ')}
                  </MagnusText>
                  {resultData.data?.display_phone !=
                  null ? (
                    <MagnusText
                      color="gray600"
                      fontSize="md">
                      Phone:{' '}
                      {resultData.data?.display_phone}
                    </MagnusText>
                  ) : null}
                </Box>
                <Box mt="lg">
                  <Button
                    block
                    mt="lg"
                    bg="green700"
                    color="white"
                    onPress={async () => {
                      if (session && bookmarkExists) {
                        removeBookmark({
                          user_id: session.user.id,
                          restaurant_id: id,
                        });
                      } else if (
                        session &&
                        !bookmarkExists
                      ) {
                        handleAddBookmark();
                      } else {
                        navigation.navigate('Login');
                      }
                    }}>
                    {status === 'loading' ||
                    bookmarkStatus === 'loading' ||
                    isFetching ||
                    bookmarksStatus === 'loading' ? (
                      <Box mr="md">
                        <Spinner color="white" size={16} />
                      </Box>
                    ) : (
                      <Icon
                        name={
                          bookmarkExists
                            ? 'check'
                            : 'bookmark'
                        }
                        color="white"
                        mr="md"
                        fontSize={15}
                        fontFamily="FontAwesome5"
                      />
                    )}

                    <MagnusText fontSize={15} color="white">
                      {status === 'loading' ||
                      bookmarkStatus === 'loading' ||
                      bookmarksStatus === 'loading' ||
                      isFetching
                        ? 'Updating...'
                        : (bookmarkExists
                            ? 'Bookmarked'
                            : 'Bookmark') || 'Bookmark'}
                    </MagnusText>
                  </Button>
                  {status === 'error' && (
                    <MagnusText
                      mt={12}
                      color="red500"
                      fontSize="md">
                      {(error as Error).message}
                    </MagnusText>
                  )}
                </Box>
                <Box mt="lg" pb="lg">
                  {data.status === 'loading' && <Spinner />}
                  {data.status === 'error' && (
                    <MagnusText
                      color="red500"
                      fontSize="md">
                      {data.error.message}
                    </MagnusText>
                  )}
                  {data?.data?.reviews.map((review) => (
                    <Review
                      key={review.id}
                      review={review}
                    />
                  ))}
                </Box>
              </Box>
            </View>
          </ScrollView>
        </Host>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default ResultScreen;
