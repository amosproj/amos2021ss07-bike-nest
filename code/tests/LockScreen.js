import React from 'react';
import renderer from 'react-test-renderer';
import LockScreen from '../screens/LockScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<LockScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});