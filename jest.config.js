module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-navigation|@expo|expo-font|expo-modules-core|expo-asset|expo-constants|expo-file-system)/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
};
