import React, { useEffect, useState } from 'react';
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
 Host,
 Icon,
 Input,
 Text as MagnusText,
 ThemeProvider,
} from 'react-native-magnus';
import { RoutePropWithParams } from '../../App';

const LoginScreen = ({ route }: { route: RoutePropWithParams<'Login'> }) => {
 const [submitted, setSubmitted] = useState(false);
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
      }}
     >
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
          Login or register
         </MagnusText>
         <MagnusText color="gray900" fontSize="sm" mb="md">
          After you enter your email we will send you a magic link
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
          hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
          keyboardType="email-address"
          inputMode="email"
          placeholder="Email address"
          autoComplete="email"
          autoFocus
          fontSize={16}
          autoCapitalize="none"
          p={10}
          focusBorderColor="blue700"
          onSubmitEditing={() => {
           setSubmitted(true);
          }}
         />
         <Button
          block
          mt="lg"
          bg="green700"
          color="white"
          onPress={() => {
           setSubmitted(true);
          }}
         >
          {submitted ? (
           <>
            <MagnusText fontSize={15} color="white">
             Sent <Icon name="check" color="white" ml="md" />
            </MagnusText>
           </>
          ) : (
           'Send magic link'
          )}
         </Button>
         {submitted && (
          <MagnusText color="gray900" fontSize="sm" mt="lg" mb="md">
           We have sent you a magic link to your email address. Click on the
           link to login.
          </MagnusText>
         )}
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
