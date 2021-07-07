import React from 'react';
import renderer from 'react-test-renderer';
import HistoryScreen from '../screens/HistoryScreen';
import { NavigationContext } from "@react-navigation/native"

// fake NavigationContext value data
const navContext = {
  isFocused: () => true,
  // addListener returns an unscubscribe function.
  addListener: jest.fn(() => jest.fn())
}

it('renders correctly', () => {
  const tree = renderer
    .create(<NavigationContext.Provider value={navContext}>
      <HistoryScreen />
    </NavigationContext.Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});