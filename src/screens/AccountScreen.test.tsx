import { render } from '@testing-library/react-native';
import React from 'react';
import AccountScreen from './AccountScreen';

jest.mock('react-native-url-polyfill/auto', () => {
  return {
    URL: () => {},
  };
});

jest.mock(
  '@react-native-async-storage/async-storage',
  () => {
    return {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  },
);

jest.mock('@supabase/supabase-js', () => {
  const originalModule = jest.requireActual(
    '@supabase/supabase-js',
  );

  return {
    ...originalModule,
    createClient: jest.fn(() => ({
      auth: {
        signIn: jest.fn(),
        signOut: jest.fn(),
        // Add other methods you use from the supabase auth object as needed
      },
      // Mock other Supabase client methods as needed
    })),
  };
});

describe('AccountScreen', () => {
  it('renders correctly', () => {
    const tree = render(
      <AccountScreen route={null} navigation={null} />,
    ).toJSON();
    expect(tree).toMatchInlineSnapshot();
  });
});
