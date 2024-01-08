import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import {
  Box,
  Button,
  Host,
  Input,
  Text as MagnusText,
  ThemeProvider,
} from "react-native-magnus";
import type { RootStackProps } from "../../App";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-gesture-handler";
import Spinner from "../components/Spinner/Spinner";

const LoginScreen = ({
  navigation,
}: {
  navigation: RootStackProps["Login"];
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!error) {
      navigation.navigate("Home");
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

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
              <View>
                <Box pt="lg" mx="lg">
                  <MagnusText
                    color="gray900"
                    fontWeight="bold"
                    fontSize="4xl"
                    mt="md"
                    mb="md"
                  >
                    Sign in or register
                  </MagnusText>
                  <MagnusText color="gray900" fontSize="sm" mb="md">
                    After you sign up we will send you an email to confirm your
                    email address.
                  </MagnusText>

                  <MagnusText
                    color="gray900"
                    fontSize="md"
                    fontWeight="600"
                    mt="lg"
                    mb="md"
                  >
                    Email address
                  </MagnusText>
                  <Input
                    ref={emailRef}
                    value={email}
                    p={10}
                    fontSize={16}
                    keyboardType="email-address"
                    inputMode="email"
                    placeholder="Email address"
                    autoComplete="email"
                    autoFocus
                    autoCapitalize="none"
                    focusBorderColor="blue700"
                    hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
                    onChangeText={(text) => setEmail(text)}
                    onSubmitEditing={() => {
                      passwordRef.current?.focus();
                    }}
                  />
                  <Input
                    ref={passwordRef}
                    value={password}
                    hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
                    keyboardType="default"
                    inputMode="text"
                    placeholder="Password"
                    autoComplete="password"
                    secureTextEntry
                    fontSize={16}
                    autoCapitalize="none"
                    mt="lg"
                    p={10}
                    focusBorderColor="blue700"
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => {
                      setSigningIn(true);
                      signInWithEmail().finally(() => {
                        setSigningIn(false);
                      });
                    }}
                  />
                  <Button
                    block
                    mt="lg"
                    bg="green700"
                    color="white"
                    disabled={loading}
                    onPress={() => {
                      setSigningIn(true);
                      signInWithEmail().finally(() => {
                        setSigningIn(false);
                      });
                    }}
                  >
                    {signingIn ? (
                      <MagnusText color="white" fontSize={16}>
                        <Spinner color="white" size={16} /> Signing in...
                      </MagnusText>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                  <Button
                    block
                    mt="lg"
                    color="green700"
                    bg="transparent"
                    borderColor="green700"
                    disabled={loading}
                    borderWidth={1.5}
                    onPress={() => {
                      setSigningUp(true);
                      signUpWithEmail().finally(() => {
                        setSigningUp(false);
                      });
                    }}
                  >
                    {signingUp ? (
                      <MagnusText color="green700" fontSize={16}>
                        <Spinner color="green700" size={16} /> Registering...
                      </MagnusText>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </Box>
              </View>
            </View>
          </ScrollView>
        </Host>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default LoginScreen;
