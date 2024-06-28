import React, { useState, useEffect } from 'react';
import { View, Alert, Platform, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Box, Button, Host, Input, StatusBar, Text, ThemeProvider } from 'react-native-magnus';
import Spinner from '../components/Spinner/Spinner';

const AccountScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (route.params.session) getProfile();
  }, [route.params.session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!route.params.session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', route.params.session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!route.params.session?.user) throw new Error('No user on the session!');

      const updates = {
        id: route.params.session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
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
            <View>
              <Box pt="lg" mx="lg">
                <Text color="gray900" fontWeight="bold" fontSize="4xl" mt="md" mb="md">
                  Account details
                </Text>
                <Text color="gray900" fontSize="md" fontWeight="600" mt="lg" mb="md">
                  Email address
                </Text>
                <Input
                  autoFocus
                  value={email || route.params.session?.user?.email}
                  hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
                  keyboardType="default"
                  inputMode="email"
                  placeholder="Email"
                  autoComplete="email"
                  fontSize={16}
                  autoCapitalize="none"
                  p={10}
                  focusBorderColor="blue700"
                  onChangeText={(v) => {
                    setEmail(v);
                  }}
                />
                <Text color="gray900" fontSize="md" fontWeight="600" mt="lg" mb="md">
                  Username
                </Text>
                <Input
                  value={username || ''}
                  hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
                  keyboardType="default"
                  inputMode="text"
                  placeholder="Username"
                  autoComplete="username"
                  fontSize={16}
                  autoCapitalize="none"
                  p={10}
                  focusBorderColor="blue700"
                  onChangeText={(text) => setUsername(text)}
                />
                <Text color="gray900" fontSize="md" fontWeight="600" mt="lg" mb="md">
                  Website
                </Text>
                <Input
                  hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
                  keyboardType="default"
                  inputMode="text"
                  placeholder="Website"
                  autoComplete="url"
                  fontSize={16}
                  autoCapitalize="none"
                  p={10}
                  focusBorderColor="blue700"
                  value={website || ''}
                  onChangeText={(text) => setWebsite(text)}
                />

                <Box>
                  <Button
                    mt="lg"
                    block
                    disabled={loading}
                    bg="green700"
                    onPress={() =>
                      updateProfile({
                        username,
                        website,
                        avatar_url: avatarUrl,
                      })
                    }>
                    {loading ? (
                      <Text color="white" fontSize={16}>
                        <Spinner color="white" size={16} /> Updating...
                      </Text>
                    ) : (
                      'Update'
                    )}
                  </Button>

                  <Button
                    bg="transparent"
                    borderColor="green700"
                    borderWidth={1.5}
                    color="green700"
                    mt="lg"
                    block
                    onPress={() => {
                      setSigningOut(true);
                      supabase.auth.signOut().finally(() => {
                        navigation.navigate('Home');
                        setSigningOut(false);
                      });
                    }}>
                    {signingOut ? (
                      <Text color="green700" fontSize={16}>
                        <Spinner color="green700" size={16} /> Signing out...
                      </Text>
                    ) : (
                      'Sign out'
                    )}
                  </Button>
                </Box>
              </Box>
            </View>
          </View>
        </ScrollView>
      </Host>
    </ThemeProvider>
  );
};

export default AccountScreen;
