import React from 'react';
import renderer from 'react-test-renderer';
import LockSpotScreen from '../screens/LockSpotScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<LockSpotScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});