import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../screens/LoadingScreen';
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
            <LoadingScreen />
        </NavigationContext.Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});